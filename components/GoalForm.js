import React, { useState, useCallback } from 'react';
// import { Goal } from '../types.js'; // Interface not used at runtime
import CalendarInput from './CalendarInput.js';
import { PlusIcon } from './icons/PlusIcon.js';

// interface GoalFormProps removed

const GoalForm = ({ onAddGoal }) => { // React.FC and props type removed
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // Type <Date | null> removed
  const [endDate, setEndDate] = useState(() => { // Type <Date | null> removed
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  });
  const [error, setError] = useState(null); // Type <string | null> removed

  const handleSubmit = useCallback((e) => { // Type React.FormEvent removed
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('El nombre de la meta es obligatorio.');
      return;
    }
    if (!startDate) {
      setError('La fecha de inicio es obligatoria.');
      return;
    }
    if (!endDate) {
      setError('La fecha de fin es obligatoria.');
      return;
    }
    if (startDate.getTime() >= endDate.getTime()) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio.');
      return;
    }

    onAddGoal({
      name,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    setName('');
    setDescription('');
    setStartDate(new Date());
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setEndDate(nextWeek);

  }, [name, description, startDate, endDate, onAddGoal]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2">
      <div>
        <label htmlFor="goalName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Nombre de la Meta <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="goalName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Aprender un nuevo idioma"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 transition duration-150"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="goalDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Descripción (Opcional)
        </label>
        <textarea
          id="goalDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Detalles adicionales sobre tu meta"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 transition duration-150"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Fecha de Inicio <span className="text-red-500">*</span>
          </label>
          <CalendarInput inputId="startDate" selectedDate={startDate} onDateSelect={setStartDate} />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Fecha de Fin <span className="text-red-500">*</span>
          </label>
          <CalendarInput inputId="endDate" selectedDate={endDate} onDateSelect={setEndDate} minDate={startDate || undefined} />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 dark:bg-opacity-30 p-3 rounded-md">{error}</p>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-offset-slate-800 dark:hover:bg-emerald-700"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Añadir Meta
      </button>
    </form>
  );
};

export default GoalForm;