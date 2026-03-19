import React, { useState, useEffect } from 'react';
import { Dumbbell, RefreshCw, ArrowLeft, Sun, Moon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutDisplay } from './components/WorkoutDisplay';
import { generateWorkoutPlan, getWorkoutDetails } from './services/gemini';
import { WorkoutPreferences, WorkoutPlan } from './types';
import Markdown from 'react-markdown';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [prefs, setPrefs] = useState<WorkoutPreferences | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{ activity: string; details: string; day: string } | null>(null);
  const [dayDetails, setDayDetails] = useState<string | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    console.log('Dark mode changed:', isDarkMode);
  }, [isDarkMode]);

  const handleGenerate = async (newPrefs: WorkoutPreferences) => {
    setIsLoading(true);
    setError(null);
    setPrefs(newPrefs);
    try {
      const generatedPlan = await generateWorkoutPlan(newPrefs);
      setPlan(generatedPlan);
    } catch (err) {
      console.error(err);
      setError('Failed to generate workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDayClick = async (day: string, activity: string, details: string) => {
    if (!prefs) return;
    setSelectedDay({ day, activity, details });
    setIsLoadingDetails(true);
    setDayDetails(null);
    try {
      const moreDetails = await getWorkoutDetails(activity, details, prefs);
      setDayDetails(moreDetails);
    } catch (err) {
      console.error(err);
      setDayDetails('Failed to load more details.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setPrefs(null);
    setError(null);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-300">
        {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/30 dark:bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 dark:bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="absolute top-4 right-6 md:top-10">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 shadow-sm hover:scale-110 transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>

        <header className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl shadow-2xl mb-6"
          >
            <Dumbbell className="w-8 h-8" />
          </motion.div>
          <div className="space-y-2">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white font-display"
            >
              FORGE<span className="text-emerald-500">.</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-medium uppercase tracking-[0.2em] text-xs"
            >
              Workout Architect
            </motion.p>
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {!plan ? (
              <WorkoutForm key="form" onSubmit={handleGenerate} isLoading={isLoading} />
            ) : (
              <div key="display" className="space-y-8">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Form
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/5 rounded-xl text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 font-semibold transition-all shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Plan
                  </button>
                </div>
                <WorkoutDisplay plan={plan} onDayClick={handleDayClick} />
              </div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-8 text-center text-zinc-400 dark:text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
          <p>Powered by Gemini</p>
        </footer>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedDay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDay(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-emerald-600 text-white">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest opacity-80">{selectedDay.day}</h3>
                  <h2 className="text-2xl font-black">{selectedDay.activity}</h2>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                {isLoadingDetails ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                    <p className="text-gray-500 dark:text-zinc-400 font-medium italic">Gemini is preparing your detailed breakdown...</p>
                  </div>
                ) : (
                  <div className="prose dark:prose-invert prose-emerald max-w-none">
                    <Markdown>{dayDetails}</Markdown>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-white/5">
                <button
                  onClick={() => setSelectedDay(null)}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
