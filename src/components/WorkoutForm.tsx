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
      className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-black/5 dark:border-white/5"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
              <Activity className="w-4 h-4" />
              Sport / Main Activity
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Basketball, Running, Weightlifting"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
              <Target className="w-4 h-4" />
              Primary Goals
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Build muscle, Improve stamina"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
              <Dumbbell className="w-4 h-4" />
              Available Equipment
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Full gym, Dumbbells only, Bodyweight"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
              Fitness Level
            </label>
            <div className="flex gap-2">
              {levels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, fitnessLevel: level.value as any })}
                  className={cn(
                    "flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all border",
                    formData.fitnessLevel === level.value
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                      : "bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:border-gray-300 dark:hover:border-zinc-700"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
              <Calendar className="w-4 h-4" />
              Frequency (Days/Week)
            </label>
            <input
              type="range"
              min="1"
              max="7"
              className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
            />
            <div className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {formData.frequency} days
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
              <Clock className="w-4 h-4" />
              Session Duration (Minutes)
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            />
            <div className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {formData.duration} minutes
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
            <Info className="w-4 h-4" />
            Additional Information (Optional)
          </label>
          <textarea
            placeholder="e.g. Previous injuries, specific focus areas, etc."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all min-h-[100px]"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Plan...
          </>
        ) : (
          'Generate My Workout Plan'
        )}
      </button>
    </motion.form>
  );
}
