import React from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { WorkoutPlan } from '../types';

interface WorkoutDisplayProps {
  plan: WorkoutPlan;
  onDayClick: (day: string, activity: string, details: string) => void;
}

export function WorkoutDisplay({ plan, onDayClick }: WorkoutDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      <div className="bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight font-display uppercase">
            {plan.title}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-base md:text-lg font-medium">
            {plan.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {plan.schedule.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onDayClick(item.day, item.activity, item.details)}
            className="group bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center cursor-pointer hover:shadow-xl hover:scale-[1.01]"
          >
            <div className="flex-shrink-0 w-full md:w-40">
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-[0.2em] font-display">
                <Calendar className="w-4 h-4" />
                {item.day}
              </div>
            </div>
            
            <div className="flex-grow space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white font-display uppercase tracking-tight">
                  {item.activity}
                </h3>
                <div className="flex items-center gap-2 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500 transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View Protocol
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                {item.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-6 md:p-10 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-500 rounded-2xl">
            <Info className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-black font-display uppercase tracking-tight">Strategic Directives</h3>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-4 bg-white/5 dark:bg-zinc-900/5 p-5 rounded-2xl border border-white/10 dark:border-zinc-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <span className="text-zinc-300 dark:text-zinc-700 font-bold text-sm leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
