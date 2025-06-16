import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatProps {
  title: string;
  value: number;
  icon: ReactNode;
  prefix?: string;
  suffix?: string;
}

const Stats = ({ title, value, icon, prefix, suffix }: StatProps) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-lg text-center hover:bg-card/90 transition-colors duration-300"
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }}
  >
    {icon}
    <div className="text-4xl font-bold mb-2">
      {prefix || ''}{value.toLocaleString()}{suffix || ''}
    </div>
    <div className="text-lg text-gray-400">{title}</div>
  </motion.div>
);

export default Stats;