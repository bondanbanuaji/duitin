"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minus, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentToolCall } from "./AgentToolCall";

interface Message {
  role: 'user' | 'ai';
  text: string;
  toolCalls?: any[];
}

export function AgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Halo! Saya Duitin AI. Ada yang bisa saya bantu tentang keuangan kamu hari ini?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Map to Gemini history format if needed
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'ai', text: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: data.text || "Saya telah melakukan beberapa tindakan untuk Anda.",
          toolCalls: data.toolCalls
        }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Koneksi ke AI gagal.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#7C3AED] text-white shadow-xl shadow-[#7C3AED]/30 hover:scale-105 transition-transform z-50 flex items-center justify-center p-0"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-[#0D1117] border border-[#7C3AED]/30 rounded-2xl flex flex-col overflow-hidden z-50 shadow-2xl animate-fade-in backdrop-blur-xl">
      <div className="h-14 bg-[#161B22]/80 border-b border-[#222] flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-[#7C3AED]">
          <Bot className="h-5 w-5" />
          <span className="font-semibold font-display">Duitin AI</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8B949E] hover:text-[#E6EDF3]" onClick={() => setIsOpen(false)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8B949E] hover:text-[#E6EDF3]" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              msg.role === 'user' 
                ? 'bg-[#00E5C3] text-[#080B10] rounded-tr-sm font-medium' 
                : 'bg-[#161B22] text-[#E6EDF3] rounded-tl-sm border border-[#7C3AED]/10'
            }`}>
              {msg.text}
            </div>
            {msg.toolCalls && msg.toolCalls.map((tc, j) => (
              <div key={j} className="w-[85%]">
                <AgentToolCall name={tc.name} parameters={tc.args} result={true} />
              </div>
            ))}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#161B22] text-[#E6EDF3] rounded-xl rounded-tl-sm px-3 py-2 text-sm flex gap-1 items-center">
              <span className="h-1.5 w-1.5 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#161B22]/50 border-t border-[#222] flex items-center gap-2">
        <Input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tanya soal keuanganmu..." 
          className="bg-[#0D1117] border-[#222] flex-1 focus-visible:ring-[#7C3AED] text-[#E6EDF3]"
        />
        <Button size="icon" onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
