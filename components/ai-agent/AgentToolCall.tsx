"use client";

import { CheckCircle2, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { useState } from "react";

interface AgentToolCallProps {
  name: string;
  parameters: any;
  result?: any;
}

export function AgentToolCall({ name, parameters, result }: AgentToolCallProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatName = (name: string) => {
    return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-bg-surface/50 border border-brand-ai/20 rounded-lg overflow-hidden my-2">
      <div 
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-brand-ai/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Settings className="h-3.5 w-3.5 text-brand-ai animate-spin-slow" />
          <span className="text-xs font-medium text-brand-ai">Executing: {formatName(name)}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-3 w-3 text-text-secondary" /> : <ChevronDown className="h-3 w-3 text-text-secondary" />}
      </div>
      
      {isExpanded && (
        <div className="px-3 py-2 border-t border-brand-ai/10 bg-bg-base/50 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Parameters</span>
            <pre className="text-[10px] font-mono text-text-secondary bg-bg-elevated p-2 rounded overflow-x-auto">
              {JSON.stringify(parameters, null, 2)}
            </pre>
          </div>
          {result && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Result</span>
              <div className="flex items-center gap-1.5 text-xs text-brand-success font-medium">
                <CheckCircle2 className="h-3 w-3" />
                Action completed successfully
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
