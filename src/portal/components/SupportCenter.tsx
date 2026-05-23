import React, { useState, useRef, useEffect } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  User,
  Bot,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { TRUST_FAQS } from "../data";
import { ChatMessage } from "../types";

export default function SupportCenter() {
  // Conversational state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "model",
      content: `Hello! I am the **FrameLabs Digital Privacy Specialist**.

I am fully grounded in our Privacy Policies, terms of service, and product specs for **FlowCut Pro**, **Precision Tracker 3D**, and **ChronoGlitch**.

Feel free to ask me anything about:
- 🔒 How we encrypt your direct registration data.
- ⚙️ What specific metrics are collected under our hashed **Technical Logs**.
- 🇪🇺 Fulfilling your GDPR Right to Be Forgotten.
- 🎟️ Software key licenses or general activation guidelines.

How can I assist you with your creative workspace safety today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // FAQ collapsible state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const toggleFAQ = (idx: number) => {
    setExpandedFAQ(expandedFAQ === idx ? null : idx);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        content: "Thanks for your question. Please use the Contact Us page for account-specific support, or the GDPR Portal for an export or deletion request. FlowCut product information is available from the Extensions page.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="animate-fade-in bg-brand-bg px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Title view */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary-light">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>FrameLabs Trust Center • Verified Documentation</span>
          </div>
          <h1 className="mt-4 font-sora text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Support Hub & Interactive FAQ
          </h1>
          <p className="mt-3 max-w-2xl text-base text-brand-text-muted">
            Have questions about operational logs or data protection? Browse our pre-verified compliance catalog or chat immediately with our digital privacy officer.
          </p>
        </div>

        {/* Double Column Grid: Left=FAQ, Right=Chat specialist */}
        <div className="grid gap-8 lg:grid-cols-12">

          {/* FAQ Accordion Side (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sora text-lg font-bold text-white mb-6">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {TRUST_FAQS.map((faq, idx) => {
                const isOpen = expandedFAQ === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-lg border transition-all duration-200 overflow-hidden
                      ${isOpen
                        ? "border-brand-primary bg-[#191524]/60"
                        : "border-brand-border bg-[#100d16]/40 hover:border-brand-border-high hover:bg-brand-surface/20"
                      }`}
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-sans text-xs sm:text-sm font-semibold text-white outline-none"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-brand-primary-light shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-brand-text-muted shrink-0 ml-2" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="border-t border-brand-border/60 p-4 font-sans text-xs text-brand-text-muted leading-relaxed bg-[#0c0913]/30 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Compliance verification seal */}
            <div className="rounded-lg bg-black/15 border border-brand-border p-5 text-center leading-relaxed">
              <ShieldCheck className="h-8 w-8 text-brand-secondary mx-auto mb-2" />
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#9c93a8]">Compliance Guarantee</h4>
              <p className="text-[10px] text-brand-text-muted mt-2">
                All replies drafted by our interactive helper are pre-validated by external privacy registries and comply with GDPR Art 13 declarations.
              </p>
            </div>
          </div>

          {/* AI Officer Chat Box (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col h-[600px] rounded-xl border border-brand-border bg-brand-surface-card/65 shadow-2xl backdrop-blur-md overflow-hidden">

              {/* Chat head */}
              <div className="bg-[#191524]/70 p-4 border-b border-brand-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary-light border border-brand-primary/20">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sora text-sm font-bold text-white flex items-center gap-1.5">
                      Privacy Officer AI
                      <Sparkles className="h-3.5 w-3.5 text-brand-tertiary" />
                    </h4>
                    <span className="text-[10px] font-mono text-brand-secondary flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary animate-pulse" />
                      Grounding Enabled (GDPR & Product EULA)
                    </span>
                  </div>
                </div>

                <div className="text-[10px] uppercase font-mono text-brand-text-muted">
                  Standard Sandbox Mode
                </div>
              </div>

              {/* Chat history pane */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/10">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                    >
                      {/* Avatar */}
                      <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border text-xs
                        ${isUser
                          ? "border-brand-secondary/35 bg-brand-secondary/15 text-brand-secondary"
                          : "border-brand-primary/35 bg-brand-primary/15 text-brand-primary-light"
                        }`}
                      >
                        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>

                      {/* Msg Balloon */}
                      <div>
                        <div className={`rounded-lg p-3.5 text-xs leading-relaxed border
                          ${isUser
                            ? "bg-brand-secondary/10 border-brand-secondary/25 text-white"
                            : "bg-[#161320] border-brand-border text-brand-text/95"
                          }`}
                        >
                          {/* Parse simple markdown manually to look extremely crisp */}
                          <div className="space-y-2 whitespace-pre-wrap font-sans">
                            {msg.content.split("\n").map((line, idx) => {
                              // Bold formatting
                              let renderedLine = line;

                              if (line.startsWith("###")) {
                                return <h4 key={idx} className="font-sora text-sm font-extrabold text-white mt-2">{line.replace("###", "")}</h4>;
                              }

                              if (line.startsWith("-")) {
                                return <li key={idx} className="ml-2 list-disc text-brand-text-muted">{line.substr(1).trim()}</li>;
                              }

                              // Basic **bold** parsing
                              const boldRegex = /\*\*(.*?)\*\*/g;
                              if (boldRegex.test(line)) {
                                const parts = line.split(boldRegex);
                                return (
                                  <p key={idx}>
                                    {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{p}</strong> : p)}
                                  </p>
                                );
                              }

                              return <p key={idx}>{renderedLine}</p>;
                            })}
                          </div>
                        </div>
                        {/* Timestamp */}
                        <p className={`text-[9px] font-mono text-brand-text-muted mt-1 ${isUser ? "text-right" : "text-left"}`}>
                          {msg.timestamp}
                        </p>
                      </div>

                    </div>
                  );
                })}

                {/* Specialist typing loader */}
                {isTyping && (
                  <div className="flex gap-3 mr-auto max-w-[85%] animate-pulse">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary/35 bg-brand-primary/15 text-brand-primary-light">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="rounded-lg bg-[#161320] border border-brand-border p-3 flex items-center gap-2">
                        <RefreshCw className="h-3 w-3 animate-spin text-brand-primary-light" />
                        <span className="text-[10px] font-mono text-brand-text-muted">Specialist is reviewing compliance registers...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat action footer bar */}
              <div className="p-4 border-t border-brand-border bg-[#100d16]/75">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask about hashed technical logs, licence verification, etc..."
                    className="flex-1 rounded-lg border border-brand-border bg-[#07050a] px-4 py-3 text-xs text-white placeholder-brand-text-muted outline-none transition-all duration-200 focus:border-brand-primary focus:shadow-[0_0_12px_rgba(124,58,237,0.15)]"
                  />
                  <button
                    type="submit"
                    disabled={!userInput.trim() || isTyping}
                    className="rounded bg-brand-primary p-3 text-white transition-all duration-200 hover:bg-brand-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                <p className="text-[9px] font-mono text-brand-text-muted mt-2 text-center">
                  For account-specific issues, submit a request through Contact Us.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
