import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CalendarProps {
  currentCalendarDate: Date; 
  onDateSelect: (date: Date) => void;
  selectedDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ 
  currentCalendarDate, 
  onDateSelect, 
  selectedDate, 
  minDate, 
  maxDate 
}) => {
  const [viewDate, setViewDate] = useState(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1));

  const daysInMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }, [viewDate]);

  const firstDayOfMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day -1; 
  }, [viewDate]);

  const monthName = useMemo(() => viewDate.toLocaleDateString('es-ES', { month: 'long' }), [viewDate]);
  const year = useMemo(() => viewDate.getFullYear(), [viewDate]);

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const dayCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayCells.push(<div key={`empty-start-${i}`} className="w-10 h-10" aria-hidden="true"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();
    const today = new Date();
    const isToday = currentDate.toDateString() === today.toDateString();
    
    let isDisabled = false;
    if (minDate && currentDate < new Date(minDate.setHours(0,0,0,0))) isDisabled = true;
    if (maxDate && currentDate > new Date(maxDate.setHours(23,59,59,999))) isDisabled = true;
    
    let cellClasses = "w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-150 ";
    if (isDisabled) {
      cellClasses += "text-slate-300 dark:text-slate-600 cursor-not-allowed";
    } else if (isSelected) {
      cellClasses += "bg-emerald-500 text-white font-semibold dark:bg-emerald-600";
    } else if (isToday) {
      cellClasses += "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-700";
    } else {
      cellClasses += "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";
    }

    dayCells.push(
      <button
        key={day}
        className={cellClasses}
        onClick={() => !isDisabled && onDateSelect(currentDate)}
        disabled={isDisabled}
        aria-pressed={isSelected}
        aria-label={`${day} ${monthName} ${year}${isSelected ? ', fecha seleccionada' : ''}${isToday ? ', hoy' : ''}`}
      >
        {day}
      </button>
    );
  }

  const weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

  return (
    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm w-full max-w-xs mx-auto">
      <div className="flex justify-between items-center mb-3">
        <button 
          onClick={prevMonth} 
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
          aria-label="Mes anterior"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <div className="font-semibold text-slate-700 dark:text-slate-200 text-center capitalize" aria-live="polite">
          {monthName} {year}
        </div>
        <button 
          onClick={nextMonth} 
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
          aria-label="Mes siguiente"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 dark:text-slate-400 mb-2" aria-hidden="true">
        {weekDays.map(wd => <div key={wd}>{wd}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dayCells}
      </div>
    </div>
  );
};

export default Calendar;