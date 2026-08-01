import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../lib/i18n';
import { SupportMessage } from '../../types';
import { Card3D } from '../../components/ui/Card3D';
import { Button3D } from '../../components/ui/Button3D';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CustomerSupport() {
  const { user } = useAuth();
  const t = useTranslation(user?.language);
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'sys-1',
      customerId: user?.id || '',
      text: 'Hello! How can we help you with your order today?',
      sender: 'admin',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const newMessage: SupportMessage = {
      id: Date.now().toString(),
      customerId: user.id,
      text: input,
      sender: 'customer',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate auto response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          customerId: user.id,
          text: 'Thanks for your message. An agent will review it shortly. In the meantime, you can track your orders in the Orders tab.',
          sender: 'system',
          timestamp: new Date().toISOString()
        }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl font-black mb-2">{t('supportTitle')}</h2>
        <p className="text-brand-text-muted">{t('supportDesc')}</p>
      </div>

      <Card3D className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-brand-border">
          <AnimatePresence>
            {messages.map((msg) => {
              const isCustomer = msg.sender === 'customer';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex items-end gap-2 ${isCustomer ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCustomer ? 'bg-brand-pink' : 'bg-brand-border'}`}>
                    {isCustomer ? <UserIcon size={16} className="text-brand-text" /> : <Bot size={16} className="text-brand-text" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${isCustomer ? 'bg-brand-pink text-brand-text rounded-br-none' : 'bg-brand-bg text-slate-200 rounded-bl-none border border-brand-border'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('typeMessage')}
            className="flex-1 bg-brand-bg border border-brand-border focus:border-brand-pink focus:ring-1 focus:ring-brand-pink rounded-xl px-4 py-3 text-brand-text placeholder-brand-text-muted/60 outline-none"
          />
          <Button3D type="submit" className="px-4 sm:px-6">
            <Send size={18} className="sm:mr-2" />
            <span className="hidden sm:inline">{t('send')}</span>
          </Button3D>
        </form>
      </Card3D>
    </div>
  );
}
