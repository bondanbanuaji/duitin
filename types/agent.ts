export type AgentRole = 'user' | 'assistant' | 'system' | 'tool';

export interface AgentMessage {
  id: string;
  role: AgentRole;
  content: string;
  timestamp: string;
  tool_calls?: AgentToolCall[];
}

export interface AgentToolCall {
  id: string;
  name: string;
  parameters: any;
  result?: any;
}

export interface AgentSession {
  id: string;
  user_id: string;
  messages: AgentMessage[];
  created_at: string;
}
