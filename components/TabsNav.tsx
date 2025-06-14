import React from 'react';
import { Tab } from '../types';
import { TargetIcon } from './icons/TargetIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ListChecksIcon } from './icons/ListChecksIcon';

interface TabsNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TabsNav: React.FC<TabsNavProps> = ({ activeTab, onTabChange }) => {
  const tabsConfig = [
    { name: Tab.Countdown, icon: TargetIcon },
    { name: Tab.NewGoal, icon: PlusIcon },
    { name: Tab.Completed, icon: ListChecksIcon },
  ];

  return (
    <nav className="flex justify-center space-x-2 md:space-x-4 border-b border-slate-200 dark:border-slate-700 pb-4">
      {tabsConfig.map(tabItem => {
        const IconComponent = tabItem.icon;
        const isActive = activeTab === tabItem.name;
        return (
          <button
            key={tabItem.name}
            onClick={() => onTabChange(tabItem.name)}
            aria-label={tabItem.name}
            className={`
              flex items-center justify-center px-4 py-3 rounded-lg font-medium text-sm md:text-base
              transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600
              ${isActive
                ? 'bg-emerald-500 text-white shadow-md dark:bg-emerald-600 dark:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-slate-100'
              }
            `}
          >
            <IconComponent className={`w-5 h-5 mr-2 ${isActive ? 'text-white' : 'text-emerald-500 dark:text-emerald-400'}`} />
            {tabItem.name}
          </button>
        );
      })}
    </nav>
  );
};

export default TabsNav;