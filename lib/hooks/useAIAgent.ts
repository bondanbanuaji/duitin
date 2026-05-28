import { useState } from 'react';
import { AgentMessage } from '@/types/agent';

export function useAIAgent() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string) => {
    const userMsg: AgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history })
      });

      const data = await res.json();

      const aiMsg: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || "I've processed your request.",
        timestamp: new Date().toISOString(),
        tool_calls: data.toolCalls
      };

      setMessages(prev => [...prev, aiMsg]);
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, sendMessage };
}
