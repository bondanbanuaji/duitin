import { model } from "./client";
import { transactionTools } from "./tools/transaction-tools";
import { reportTools } from "./tools/report-tools";
import { navigationTools } from "./tools/navigation-tools";
import { budgetTools } from "./tools/budget-tools";
import { addTransaction, getTransactions } from "@/app/actions/transaction.actions";

export const allTools = [
  ...transactionTools,
  ...reportTools,
  ...navigationTools,
  ...budgetTools,
];

export async function processAiMessage(message: string, userId: string, history: any[] = []) {
  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 1000,
    },
    tools: [{
      functionDeclarations: allTools as any
    }],
  });

  const result = await chat.sendMessage(message);
  const response = result.response;
  const functionCalls = response.functionCalls();

  if (functionCalls && functionCalls.length > 0) {
    const toolResults: any[] = [];

    for (const call of functionCalls) {
      let toolResult: any;

      if (call.name === 'add_transaction') {
        const args = call.args as any;
        toolResult = await addTransaction({
          userId,
          type: args.type,
          amount: args.amount,
          categoryId: args.category_id || args.categoryId, // Handle potential mapping
          description: args.description,
          date: args.date || new Date().toISOString().split('T')[0]
        });
      } else if (call.name === 'get_transactions') {
        toolResult = await getTransactions(userId);
      }

      toolResults.push({
        functionResponse: {
          name: call.name,
          response: { result: toolResult || { success: true } }
        }
      });
    }

    // Send the results back to the model for final summary
    const finalResult = await chat.sendMessage(toolResults as any);
    return {
      text: finalResult.response.text(),
      toolCalls: functionCalls
    };
  }
  
  return {
    text: response.text(),
    toolCalls: []
  };
}
