import React from 'react';
import { Goal } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { TrashIcon } from './icons/TrashIcon';
// Ya no se usa RefreshCwIcon
// import { RefreshCwIcon } from './icons/RefreshCwIcon';

interface CompletedGoalItemProps {
  goal: Goal;
  onToggleComplete: (goalId: string, complete: boolean) => void;
  onDelete: (goalId: string) => void;
}

const CompletedGoalItem: React.FC<CompletedGoalItemProps> = ({ goal, onToggleComplete, onDelete }) => {
  const isManuallyCompleted = goal.isCompleted;
  const isTimeUp = new Date(goal.endDate).getTime() <= Date.now();
  
  const progress = (isManuallyCompleted || isTimeUp) ? 100 : 0; 

  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  let statusText = '';
  let statusColorClass = '';

  if (isManuallyCompleted) {
    statusText = `Completada el: ${new Date(goal.completedDate!).toLocaleDateString('es-ES', dateOptions)}`;
    statusColorClass = 'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700';
  } else if (isTimeUp) {
    statusText = `Vencida el: ${new Date(goal.endDate).toLocaleDateString('es-ES', dateOptions)}`;
    statusColorClass = 'bg-rose-50 border-rose-200 dark:bg-rose-900 dark:border-rose-700';
  }


  return (
    <div className={`p-4 rounded-lg shadow border ${statusColorClass}`}>
      <div className="flex items-start sm:items-center justify-between mb-3">
        <div className="flex items-start sm:items-center">
          <div className={`
            flex-shrink-0 p-2 rounded-full mr-3 sm:mr-4 mt-1 sm:mt-0
            ${isManuallyCompleted 
              ? 'bg-green-500 text-white dark:bg-green-600' 
              : 'bg-rose-500 text-white dark:bg-rose-600'}
          `}>
            <CheckIcon className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <h3 className={`font-semibold ${isManuallyCompleted ? 'text-green-700 dark:text-green-300' : 'text-rose-700 dark:text-rose-300'}`}>{goal.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {statusText}
            </p>
            {goal.description && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 break-words">{goal.description}</p>}
          </div>
        </div>
        <div className="flex space-x-2 flex-shrink-0 ml-2 sm:ml-4">
          {(!isManuallyCompleted && isTimeUp) && ( 
             <button
                onClick={() => onToggleComplete(goal.id, true)}
                title="Marcar como Completada Manualmente"
                aria-label="Marcar como Completada Manualmente esta meta vencida"
                className="p-2 rounded-full text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-800 transition-colors"
            >
                <CheckIcon className="w-4 h-4" />
            </button>
          )}
          {/* El botón para reabrir meta ha sido eliminado según el requerimiento */}
          <button
              onClick={() => onDelete(goal.id)}
              title="Eliminar Meta"
              aria-label="Eliminar esta meta"
              className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800 transition-colors"
          >
              <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <div 
            className={`${isManuallyCompleted ? 'bg-green-500 dark:bg-green-600' : 'bg-rose-500 dark:bg-rose-600'} h-2.5 rounded-full`}
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label={`Progreso de la meta: ${progress}%`}
          ></div>
        </div>
        <p className={`text-xs ${isManuallyCompleted ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'} mt-1 text-center font-medium`}>
          {progress}% {isManuallyCompleted ? 'Completado' : 'Del Plazo'}
        </p>
      </div>
    </div>
  );
};

export default CompletedGoalItem;