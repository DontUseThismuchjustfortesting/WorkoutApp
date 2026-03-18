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
      className="space-y-8"
    >
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-black/5 dark:border-white/5">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {plan.title}
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-lg">
            {plan.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {plan.schedule.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onDayClick(item.day, item.activity, item.details)}
            className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer hover:shadow-md"
          >
            <div className="flex-shrink-0 w-full md:w-32">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-lg uppercase tracking-wider">
                <Calendar className="w-5 h-5" />
                {item.day}
              </div>
            </div>
            
            <div className="flex-grow space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {item.activity}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                </h3>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                  Click for details
                </span>
              </div>
              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                {item.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-emerald-900 dark:bg-emerald-950 text-white p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-800 rounded-xl">
            <Info className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold">Key Tips for Success</h3>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3 bg-emerald-800/40 dark:bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 dark:border-emerald-800/50">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-emerald-50 font-medium">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
