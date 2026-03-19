import React, { useState } from 'react';
import { Dumbbell, Target, Activity, Clock, Calendar, Info, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { WorkoutPreferences } from '../types';
import { cn } from '../lib/utils';

interface WorkoutFormProps {
  onSubmit: (prefs: WorkoutPreferences) => void;
  isLoading: boolean;
}

const levels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export function WorkoutForm({ onSubmit, isLoading }: WorkoutFormProps) {
  const [formData, setFormData] = useState<WorkoutPreferences>({
    sport: '',
    goals: '',
    fitnessLevel: 'beginner',
    equipment: '',
    frequency: 3,
    duration: 45,
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-8 bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-display">
              <Activity className="w-4 h-4" />
              Primary Discipline
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Brazilian Jiu-Jitsu, Marathon, Powerlifting"
              className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-medium"
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-display">
              <Target className="w-4 h-4" />
              Core Objectives
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Explosive power, Hypertrophy, Endurance"
              className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-medium"
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-display">
              <Dumbbell className="w-4 h-4" />
              Hardware Access
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Elite performance center, Home gym, Minimalist"
              className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-medium"
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-display">
              Proficiency Level
            </label>
            <div className="flex gap-3">
              {levels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, fitnessLevel: level.value as any })}
                  className={cn(
                    "flex-1 px-4 py-3 rounded-2xl text-xs font-bold transition-all border uppercase tracking-tighter",
                    formData.fitnessLevel === level.value
                      ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900 shadow-xl"
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-display">
              <Calendar className="w-4 h-4" />
              Weekly Commitment
            </label>
            <input
              type="range"
              min="1"
              max="7"
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
            />
            <div className="text-right text-sm font-black text-zinc-900 dark:text-white font-display">
              {formData.frequency} DAYS / WEEK
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-display">
              <Clock className="w-4 h-4" />
              Session Window
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            />
            <div className="text-right text-sm font-black text-zinc-900 dark:text-white font-display">
              {formData.duration} MINUTES
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-display">
            <Info className="w-4 h-4" />
            Strategic Constraints
          </label>
          <textarea
            placeholder="e.g. Previous ACL reconstruction, focus on unilateral stability, etc."
            className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all min-h-[120px] placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-medium"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-zinc-400/20 dark:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] font-display"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            ARCHITECTING PLAN...
          </>
        ) : (
          <>
            <Dumbbell className="w-5 h-5" />
            GENERATE ARCHITECTURE
          </>
        )}
      </button>
    </motion.form>
  );
}
