"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, TriangleAlert, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

// Updated: Less cringe, more tech-chaos humor
const PHRASES = [
  "Look at you, interacting with things. 🖱️",
  "Task failed successfully. (Wait, no, it worked)",
  "Your click has been noted by the overlords.",
  "Executing sudo get_coffee...",
  "Error: Success? That's a first.",
  "You clicked it. I felt that. ⚡",
  "Processing... mostly just vibes though.",
  "Another one for the logs. 📝",
  "Warning: User is becoming too powerful.",
  "If you keep clicking, I'm telling your mom.",
];

export const getRandomPhrase = () =>
  PHRASES[Math.floor(Math.random() * PHRASES.length)];

// Using Lucide components instead of strings
const Icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error: <AlertCircle size={18} />,
  info: <Info size={18} />,
  warning: <TriangleAlert size={18} />,
};

const colors: Record<NotificationType, { bg: string; border: string; glow: string; text: string }> = {
  success: { bg: '#06160c', border: '#22c55e', glow: '#22c55e', text: '#86efac' },
  error:   { bg: '#1a0707', border: '#ef4444', glow: '#ef4444', text: '#fca5a5' },
  info:    { bg: '#080e1e', border: '#3b82f6', glow: '#3b82f6', text: '#93c5fd' },
  warning: { bg: '#1a1205', border: '#f59e0b', glow: '#f59e0b', text: '#fcd34d' },
};

const NotificationItem = ({
  notification,
  onDismiss,
}: {
  notification: Notification;
  onDismiss: (id: number) => void;
}) => {
  const { bg, border, glow, text } = colors[notification.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      onClick={() => onDismiss(notification.id)}
      className="group relative flex items-center gap-4 px-4 py-4 rounded-lg cursor-pointer select-none min-w-[300px] overflow-hidden"
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}33`, // Subtle border
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px ${border}11`,
      }}
    >
      {/* Enhanced left accent - integrated into the design */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ 
          backgroundColor: border,
          boxShadow: `0 0 15px ${glow}aa` 
        }} 
      />

      {/* Icon with themed color */}
      <span className="relative z-10" style={{ color: border }}>
        {Icons[notification.type]}
      </span>

      <div className="flex flex-col gap-0.5 flex-1 relative z-10">
        <p className="text-[13px] font-medium leading-tight" style={{ color: text }}>
          {notification.message}
        </p>
      </div>

      {/* Progress bar - Thinner and cleaner */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] opacity-50"
        style={{ backgroundColor: border }}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 3, ease: 'linear' }}
      />
    </motion.div>
  );
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {notifications.map(n => (
            <div key={n.id} className="pointer-events-auto">
              <NotificationItem notification={n} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider');
  return ctx;
};