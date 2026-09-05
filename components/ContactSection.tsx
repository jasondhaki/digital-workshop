"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import WorkshopButton from "./WorkshopButton";
import { personalInfo } from "@/data/personal";

/**
 * ContactSection: The final sector of the Digital Workshop.
 * Handles secure data transmission to the Resend API and provides
 * interactive feedback for the user.
 */
export default function ContactSection() {
  // 1. FORM STATE: Capturing the incoming data packets
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 2. STATUS STATE: Monitoring the transmission lifecycle
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Flush buffers on success
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Transmission Protocol Failure:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-workshop-bg relative overflow-hidden">
      {/* Decorative Glow Layer */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-workshop-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Connection Diagnostics */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-workshop-accent font-mono text-xs tracking-widest uppercase">
              {"// INITIATE_COMMUNICATION"}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
              READY TO BUILD <br /> 
              <span className="text-workshop-highlight">THE NEXT SYSTEM?</span>
            </h2>
            <p className="text-workshop-slate font-mono text-sm max-w-md leading-relaxed pt-4">
              Currently open to technical collaborations, full-stack opportunities, and electronics-driven projects. Let&apos;s calibrate a solution.
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-workshop-slate/20">
            {/* Protocol: Email */}
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-workshop-slate/5 border border-workshop-slate/20 flex items-center justify-center text-workshop-accent group-hover:border-workshop-accent/50 transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest">Protocol: Email</p>
                <p className="text-sm font-mono text-white">{personalInfo.socials.email}</p>
              </div>
            </div>

            {/* Location: Node */}
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-workshop-slate/5 border border-workshop-slate/20 flex items-center justify-center text-workshop-accent group-hover:border-workshop-accent/50 transition-colors">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest">Location: Node</p>
                <p className="text-sm font-mono text-white">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Command Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-workshop-slate/5 border border-workshop-slate/20 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden"
        >
          {/* SUCCESS OVERLAY: High-tech confirmation */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-workshop-bg/95 z-20 flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-workshop-accent/20"
              >
                <CheckCircle2 className="text-workshop-accent w-16 h-16 mb-4 animate-pulse" />
                <h3 className="text-xl font-bold mb-2">TRANSMISSION_RECEIVED</h3>
                <p className="text-workshop-slate font-mono text-[10px] uppercase tracking-tighter max-w-[250px]">
                  Your data packet has been successfully routed to the master terminal.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-workshop-accent text-[10px] font-mono underline underline-offset-4 hover:text-white transition-colors"
                >
                  INITIATE_NEW_TRANSMISSION
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest ml-1">Identifier</label>
                <input 
                  required
                  type="text" 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-workshop-bg border border-workshop-slate/30 rounded-lg p-3 text-sm font-mono text-white focus:border-workshop-accent focus:ring-1 focus:ring-workshop-accent outline-none transition-all placeholder:text-workshop-slate/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest ml-1">Return_Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="email@protocol.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-workshop-bg border border-workshop-slate/30 rounded-lg p-3 text-sm font-mono text-white focus:border-workshop-accent focus:ring-1 focus:ring-workshop-accent outline-none transition-all placeholder:text-workshop-slate/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest ml-1">Message_Packet</label>
              <textarea 
                required
                rows={5}
                placeholder="Details of project or collaboration inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-workshop-bg border border-workshop-slate/30 rounded-lg p-3 text-sm font-mono text-white focus:border-workshop-accent focus:ring-1 focus:ring-workshop-accent outline-none transition-all resize-none placeholder:text-workshop-slate/30"
              />
            </div>

            {/* Error Feedback */}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-[10px] font-mono bg-red-400/5 p-3 rounded-lg border border-red-400/20">
                <AlertCircle size={14} />
                <span>PROTOCOL_FAILURE: UNABLE TO ROUTE PACKET. RETRY_LATER.</span>
              </div>
            )}

            <WorkshopButton 
              type="submit"
              variant="primary" 
              className="w-full justify-center gap-3 h-12"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <span>UPLOADING...</span>
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  <span>SEND_TRANSMISSION</span>
                  <Send size={16} />
                </>
              )}
            </WorkshopButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
}