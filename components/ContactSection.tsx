"use client";

import { motion } from "framer-motion";
import { Mail, Send, MapPin, MessageSquare } from "lucide-react";
import WorkshopButton from "./WorkshopButton";
import { personalInfo } from "@/data/personal";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 bg-workshop-bg relative overflow-hidden">
      {/* Background Circuit Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-workshop-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Connection Diagnostics */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-workshop-accent font-mono text-xs tracking-widest uppercase">
              // INITIATE_COMMUNICATION
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
              READY TO BUILD <br /> 
              <span className="text-workshop-highlight">THE NEXT SYSTEM?</span>
            </h2>
            <p className="text-workshop-slate font-mono text-sm max-w-md leading-relaxed pt-4">
              Currently open to technical collaborations, full-stack opportunities, and electronics-driven projects. Let&apos;s talk.
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-workshop-slate/20">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-workshop-slate/5 border border-workshop-slate/20 flex items-center justify-center text-workshop-accent group-hover:border-workshop-accent/50 transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest">Protocol: Email</p>
                <p className="text-sm font-mono text-white">{personalInfo.socials.email}</p>
              </div>
            </div>

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
          className="bg-workshop-slate/5 border border-workshop-slate/20 p-8 rounded-2xl backdrop-blur-md"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest ml-1">Identifier</label>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-workshop-bg border border-workshop-slate/30 rounded-lg p-3 text-sm font-mono focus:border-workshop-accent focus:ring-1 focus:ring-workshop-accent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest ml-1">Return_Address</label>
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full bg-workshop-bg border border-workshop-slate/30 rounded-lg p-3 text-sm font-mono focus:border-workshop-accent focus:ring-1 focus:ring-workshop-accent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-workshop-slate uppercase tracking-widest ml-1">Message_Packet</label>
              <textarea 
                rows={5}
                placeholder="Transmission details..."
                className="w-full bg-workshop-bg border border-workshop-slate/30 rounded-lg p-3 text-sm font-mono focus:border-workshop-accent focus:ring-1 focus:ring-workshop-accent outline-none transition-all resize-none"
              />
            </div>

            <WorkshopButton variant="primary" className="w-full justify-center gap-3 h-12">
              <span>SEND_TRANSMISSION</span>
              <Send size={16} />
            </WorkshopButton>
          </form>
        </motion.div>

      </div>
    </section>
  );
}