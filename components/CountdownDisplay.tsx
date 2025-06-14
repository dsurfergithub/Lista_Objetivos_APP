import React from 'react';
import { TimeLeft } from '../types';

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => {
  const displayValue = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-slate-800 text-white dark:bg-slate-700 dark:text-slate-100 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
        <span className="absolute top-0 left-0 w-full h-1/2 bg-black bg-opacity-10 dark:bg-opacity-20"></span>
        <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider relative z-10">
          {displayValue}
        </span>
         <div className="absolute top-1/2 left-0 w-full h-px bg-slate-700 dark:bg-slate-600"></div>
      </div>
      <span className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
};


const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ timeLeft }) => {
  return (
    <div className="flex justify-center items-start space-x-2 md:space-x-4">
      <TimeUnit value={timeLeft.days} label="Días" />
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 pt-5 md:pt-6 lg:pt-7">:</span>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 pt-5 md:pt-6 lg:pt-7">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 pt-5 md:pt-6 lg:pt-7">:</span>
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

export default CountdownDisplay;