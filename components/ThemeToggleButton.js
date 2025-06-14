import React from 'react';
import { SunIcon } from './icons/SunIcon.js';
import { MoonIcon } from './icons/MoonIcon.js';

// type Theme removed
// interface ThemeToggleButtonProps removed

const ThemeToggleButton = ({ theme, toggleTheme }) => { // React.FC and props type removed
  return (
    <button
      onClick={toggleTheme}
      className="absolute top-6 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6 text-slate-700" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggleButton;