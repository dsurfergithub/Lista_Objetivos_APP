import React, { useState, useRef, useEffect, useCallback } from 'react';
import Calendar from './Calendar.js';
import { CalendarIcon } from './icons/CalendarIcon.js';

// interface CalendarInputProps removed

const CalendarInput = ({ // React.FC and props type removed
  inputId,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  placeholder = "Selecciona una fecha"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null); // Type <HTMLDivElement> removed
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }; // Type Intl.DateTimeFormatOptions removed


  const handleDateSelect = useCallback((date) => { // Type Date removed
    onDateSelect(date);
    setIsOpen(false);
  }, [onDateSelect]);

  useEffect(() => {
    const handleClickOutside = (event) => { // Type MouseEvent removed
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) { // Type cast as Node removed
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString('es-ES', dateOptions) : ""}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder={placeholder}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="w-full px-4 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 transition duration-150 cursor-pointer"
        />
         <CalendarIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none"
         />
      </div>
      {isOpen && (
        <div 
            className="absolute z-10 mt-1 w-full md:w-80 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg p-2"
            role="dialog"
            aria-modal="true"
            aria-label="Calendario"
        >
          <Calendar
            currentCalendarDate={selectedDate || new Date()}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};


export default CalendarInput;