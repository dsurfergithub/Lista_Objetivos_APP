import React, { useState, useEffect, useCallback } from 'react';
// import { Goal, TimeLeft } from '../types.js'; // Interfaces not used at runtime
import CountdownDisplay from './CountdownDisplay.js';
import { CheckIcon } from './icons/CheckIcon.js';
import { calculateProgressPercentage } from '../utils/progressUtils.js';

// interface CountdownCardProps removed

const calculateTimeLeft = (endDate) => { // Type string removed, : TimeLeft removed
  const difference = new Date(endDate).getTime() - new Date().getTime();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, totalMilliseconds: 0 }; // Type : TimeLeft removed

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalMilliseconds: difference,
    };
  }
  return timeLeft;
};

const CountdownCard = ({ goal, onToggleComplete }) => { // React.FC and props type removed
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(goal.endDate)); // Type <TimeLeft> removed
  const [progress, setProgress] = useState(0); // Type <number> removed
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }; // Type Intl.DateTimeFormatOptions removed

  useEffect(() => {
    setProgress(calculateProgressPercentage(goal.startDate, goal.endDate, goal.isCompleted));

    if (timeLeft.totalMilliseconds <= 0) {
      setProgress(100);
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(goal.endDate);
      setTimeLeft(newTimeLeft);
      setProgress(calculateProgressPercentage(goal.startDate, goal.endDate, goal.isCompleted));

      if (newTimeLeft.totalMilliseconds <= 0) {
        clearInterval(timer);
        setProgress(100); 
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [goal.startDate, goal.endDate, goal.isCompleted, timeLeft.totalMilliseconds]);

  const handleMarkComplete = useCallback(() => {
    onToggleComplete(goal.id, true);
  }, [goal.id, onToggleComplete]);

  const isTimeUp = timeLeft.totalMilliseconds <= 0;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-500">{goal.name}</h2>
          {goal.description && <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{goal.description}</p>}
        </div>
        {!isTimeUp && (
          <button
            onClick={handleMarkComplete}
            title="Marcar como completada"
            aria-label="Marcar como completada"
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600 transition-colors duration-150"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {isTimeUp ? (
        <div className="text-center py-8">
          <h3 className="text-3xl font-bold text-rose-500 dark:text-rose-400">¡Tiempo Agotado!</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">La fecha límite de esta meta ha pasado.</p>
           <button
            onClick={handleMarkComplete}
            aria-label="Marcar como completada porque el tiempo ha terminado"
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center mx-auto dark:hover:bg-emerald-700"
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Marcar como Completada
          </button>
        </div>
      ) : (
        <CountdownDisplay timeLeft={timeLeft} />
      )}

      <div className="mt-6 mb-4">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <div 
            className="bg-emerald-500 dark:bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${Math.round(progress)}%` }}
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label={`Progreso de la meta: ${Math.round(progress)}%`}
          ></div>
        </div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 text-center font-medium">
          {Math.round(progress)}% completado
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400 dark:text-slate-500">
        <p>Fecha de Inicio: {new Date(goal.startDate).toLocaleDateString('es-ES', dateOptions)}</p>
        <p>Fecha de Fin: {new Date(goal.endDate).toLocaleDateString('es-ES', dateOptions)}</p>
      </div>
    </div>
  );
};

export default CountdownCard;