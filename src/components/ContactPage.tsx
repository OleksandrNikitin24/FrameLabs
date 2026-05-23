import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Loader2,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";

type InquirySubject = "Technical Support" | "Billing & Account" | "Partnership Inquiry" | "Other";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: InquirySubject;
  message: string;
  timestamp: string;
  ticketNumber: string;
  response: string;
}

const docs = [
  {
    title: "FlowCut Installation",
    description: "Install, activate, and configure FlowCut for your editing workstation.",
  },
  {
    title: "License Activation",
    description: "Resolve license key, firewall, and workstation activation issues.",
  },
  {
    title: "Final Cut Pro XML Export",
    description: "Export cleaned sequence XML directly back to Final Cut Pro.",
  },
];

function createResponse(subject: InquirySubject, message: string) {
  const text = `${subject} ${message}`.toLowerCase();

  if (text.includes("license") || text.includes("key") || text.includes("activat")) {
    return "Your request has been routed to licensing support. Please include the license email and machine ID if you reply to the confirmation.";
  }

  if (text.includes("xml") || text.includes("final cut") || text.includes("export")) {
    return "Your request has been routed to the FlowCut XML export queue. A specialist will review the sequence export details.";
  }

  if (text.includes("billing") || text.includes("invoice") || text.includes("refund")) {
    return "Your request has been routed to billing. The team will review account and purchase details before responding.";
  }

  return "Your request has been routed to FrameLabs priority support. A specialist will review the workflow details and respond within 24 hours.";
}

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<InquirySubject>("Technical Support");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "checking" | "completed">("idle");
  const [step, setStep] = useState(0);
  const [ticket, setTicket] = useState<Inquiry | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("framelabs_inquiries") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("framelabs_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    if (submitState !== "checking") return;

    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= 3) {
          window.clearInterval(timer);

          const id = Math.random().toString(36).slice(2, 8).toUpperCase();
          const nextTicket: Inquiry = {
            id,
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
            ticketNumber: `FL-2026-${id}`,
            response: createResponse(subject, message),
          };

          setTicket(nextTicket);
          setInquiries((queue) => [nextTicket, ...queue]);
          setSubmitState("completed");
          return current;
        }

        return current + 1;
      });
    }, 700);

    return () => window.clearInterval(timer);
  }, [email, message, name, subject, submitState]);

  const goHome = () => {
    window.location.hash = "/flowcut";
    window.scrollTo({ top: 0 });
  };
  const goPortalPage = (page: string) => {
    window.location.hash = `/${page}`;
    window.scrollTo({ top: 0 });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStep(0);
    setSubmitState("checking");
  };

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("Technical Support");
    setMessage("");
    setTicket(null);
    setSubmitState("idle");
  };

  return (
    <div className="relative min-h-screen bg-brand-bg font-body text-white selection:bg-brand-purple/30 selection:text-white">
      <div className="absolute top-20 left-[8%] w-[420px] h-[420px] bg-brand-purple/10 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute top-[540px] right-[5%] w-[360px] h-[360px] bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/45 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-2 cursor-pointer text-left">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <span className="font-sans font-bold text-white text-base tracking-tighter">FL</span>
            </div>
            <span className="font-sans font-extrabold text-white text-lg tracking-tight">FrameLabs</span>
          </button>

          <button
            onClick={goHome}
            className="cursor-pointer inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to FlowCut
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-32 pb-20">
        <section className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-[10px] font-bold text-brand-purple-light uppercase tracking-widest font-mono mb-4">
            FrameLabs Support Hub
          </p>
          <h1 className="font-sans font-black text-4xl sm:text-6xl text-white leading-tight tracking-tight mb-5">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-lg text-text-muted leading-relaxed">
            Helping editors master their workflow through professional-grade precision. Whether you
            need technical support or want to discuss a partnership, our team is ready to assist.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card rounded-xl p-7">
              <h2 className="font-sans text-lg font-bold mb-5 text-brand-purple-light flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Resources
              </h2>
              <div className="space-y-3">
                {docs.map((doc) => (
                  <button
                    key={doc.title}
                    onClick={() => alert(`${doc.title}: ${doc.description}`)}
                    className="w-full text-left group flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-purple/30 transition-all cursor-pointer"
                  >
                    <span>
                      <span className="block font-sans text-sm font-semibold text-white">{doc.title}</span>
                      <span className="block text-xs text-text-muted mt-1">{doc.description}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-purple-light transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-7">
              <h2 className="font-sans text-lg font-bold mb-4 text-brand-blue flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Response Time
              </h2>
              <p className="text-sm leading-relaxed text-text-muted">
                Our technical team is available Monday through Friday. We usually respond within{" "}
                <span className="text-white font-bold">24 hours</span>.
              </p>
            </div>

            <div className="glass-card rounded-xl p-7 overflow-hidden relative min-h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-blue/20"></div>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-bg to-transparent"></div>
              <div className="relative h-full flex flex-col justify-end min-h-32">
                <p className="text-[10px] font-bold tracking-widest text-brand-purple-light uppercase mb-2">
                  Social Feed
                </p>
                <button
                  onClick={() => alert("Opening FrameLabs social support stream...")}
                  className="font-sans text-xl font-bold text-white hover:text-brand-purple-light transition-colors inline-flex items-center gap-2 text-left cursor-pointer"
                >
                  @FrameLabsTools
                  <MessageSquare className="w-4 h-4 text-text-muted" />
                </button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8">
            {submitState === "idle" && (
              <form onSubmit={submit} className="glass-card rounded-xl p-6 sm:p-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-text-muted">Full Name</span>
                    <input
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="John Doe"
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-text-muted">Work Email</span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="john@studio.com"
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-text-muted">Subject</span>
                  <select
                    value={subject}
                    onChange={(event) => setSubject(event.target.value as InquirySubject)}
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all cursor-pointer"
                  >
                    <option>Technical Support</option>
                    <option>Billing & Account</option>
                    <option>Partnership Inquiry</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-text-muted">Message</span>
                  <textarea
                    required
                    rows={7}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell us how we can help your workflow..."
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="self-end w-full md:w-auto cursor-pointer px-8 py-4 bg-brand-purple text-white font-sans text-sm font-bold rounded-lg hover:bg-brand-purple-hover hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-purple/20 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {submitState === "checking" && (
              <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center min-h-[460px] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-brand-purple to-brand-blue animate-pulse w-full"></div>
                <Loader2 className="w-12 h-12 text-brand-purple-light animate-spin mb-8" />
                <h2 className="font-sans text-xl font-bold text-white mb-2">Transmitting Secure Packet</h2>
                <p className="text-sm text-text-muted max-w-sm mb-8">
                  Your workflow inquiry is being processed by the FrameLabs Support Hub.
                </p>

                <div className="w-full max-w-md text-left bg-black/50 border border-white/10 p-5 rounded-lg font-mono text-xs space-y-3">
                  {["Encrypting socket headers", "Handshaking database cluster", "Running diagnostic tokenizer"].map((label, index) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <span className="text-text-muted">▸ {label}</span>
                      <span className={step > index ? "text-emerald-400 font-bold" : "text-brand-purple-light animate-pulse"}>
                        {step > index ? "READY" : "ACTIVE"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {submitState === "completed" && ticket && (
              <div className="glass-card rounded-xl p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-bold tracking-widest uppercase">Inquiry Registered</span>
                    </div>
                    <h2 className="font-sans text-2xl font-bold text-white">Thank you, {ticket.name}.</h2>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-right">
                    <span className="block text-[10px] font-bold tracking-wide uppercase text-text-muted">
                      Receipt Ticket
                    </span>
                    <span className="font-mono text-sm font-bold text-brand-purple-light">{ticket.ticketNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-wider text-brand-purple-light uppercase">
                      Inquiry Dossier
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                      <span className="text-text-muted">Work Email:</span>
                      <span className="col-span-2 text-white truncate">{ticket.email}</span>
                      <span className="text-text-muted">Subject:</span>
                      <span className="col-span-2 text-white">{ticket.subject}</span>
                      <span className="text-text-muted">Priority:</span>
                      <span className="col-span-2 text-emerald-400">High Priority (&lt; 24h)</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg text-xs leading-relaxed border border-white/10 text-text-muted max-h-40 overflow-y-auto">
                      <p className="font-semibold text-[10px] uppercase text-text-muted tracking-wide mb-1">
                        Logged Message
                      </p>
                      {ticket.message}
                    </div>
                  </div>

                  <div className="space-y-4 bg-brand-purple/10 border border-brand-purple/20 p-5 rounded-lg flex flex-col">
                    <div className="flex items-center gap-2 text-brand-purple-light font-bold text-xs uppercase tracking-wide">
                      <Sparkles className="w-4 h-4" />
                      Diagnostic Assessment
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{ticket.response}</p>
                    <button
                      onClick={() => alert("Opening support documentation...")}
                      className="mt-auto inline-flex items-center gap-2 text-xs text-brand-purple-light font-bold hover:underline cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      Open support documentation
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                  <span className="text-text-muted">
                    A confirmation copy has been dispatched to <span className="text-white underline">{ticket.email}</span>.
                  </span>
                  <button
                    onClick={reset}
                    className="bg-white/5 hover:bg-white/10 text-white tracking-wider uppercase font-semibold text-[10px] px-4 py-2 rounded transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    New Ticket
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {inquiries.length > 0 && (
          <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-sans font-bold text-lg text-white">Registered Inquiries</h2>
              <button
                onClick={() => {
                  setInquiries([]);
                  localStorage.removeItem("framelabs_inquiries");
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors uppercase font-bold tracking-wider cursor-pointer"
              >
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inquiries.map((item) => (
                <article key={item.id} className="glass-card rounded-lg p-5">
                  <div className="flex justify-between items-center text-xs mb-3 gap-3">
                    <span className="font-mono text-brand-purple-light font-bold">{item.ticketNumber}</span>
                    <span className="bg-brand-purple/10 px-2 py-1 rounded text-[10px] font-bold text-brand-purple-light uppercase">
                      {item.subject}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-1">Ref: {item.name}</h3>
                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{item.message}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 w-full py-12 bg-[#15121b] border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 sm:px-8 max-w-7xl mx-auto">
          <div className="md:col-span-1">
            <span className="font-sans text-lg font-extrabold text-white block mb-4">FrameLabs</span>
            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              © 2026 FrameLabs. Outfitting creative post-processing rooms around the globe with precision plugins.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-brand-purple-light uppercase tracking-widest mb-1">
              Company
            </span>
            <button onClick={goHome} className="text-left text-xs text-text-muted hover:text-white transition cursor-pointer">
              About
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left text-xs text-text-muted hover:text-white transition cursor-pointer">
              Contact
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-brand-purple-light uppercase tracking-widest mb-1">
              Resources
            </span>
            <button onClick={() => goPortalPage("support")} className="text-left text-xs text-text-muted hover:text-white transition cursor-pointer">
              Support
            </button>
            <button onClick={() => goPortalPage("support")} className="text-left text-xs text-text-muted hover:text-white transition cursor-pointer">
              Documentation
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-brand-purple-light uppercase tracking-widest mb-1">
              Legal
            </span>
            <button onClick={() => goPortalPage("privacy")} className="text-left text-xs text-text-muted hover:text-white transition cursor-pointer">
              Privacy
            </button>
            <button onClick={() => goPortalPage("terms")} className="text-left text-xs text-text-muted hover:text-white transition cursor-pointer">
              Terms
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
