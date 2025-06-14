import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tab } from './types.js'; // Goal interface is not imported as it's commented out in types.js
import TabsNav from './components/TabsNav.js';
import CountdownCard from './components/CountdownCard.js';
import GoalForm from './components/GoalForm.js';
import CompletedGoalItem from './components/CompletedGoalItem.js';
import { TargetIcon } from './components/icons/TargetIcon.js';
import { PlusIcon } from './components/icons/PlusIcon.js';
import { ListChecksIcon } from './components/icons/ListChecksIcon.js';
import ThemeToggleButton from './components/ThemeToggleButton.js'; 

// type Theme = 'light' | 'dark'; // Type alias removed

const App = () => { // React.FC removed
  const [goals, setGoals] = useState([]); // Type <Goal[]> removed
  const [activeTab, setActiveTab] = useState(Tab.Countdown); // Type <Tab> removed
  const [theme, setTheme] = useState(() => { // Type <Theme> removed
    const storedTheme = localStorage.getItem('theme'); // Type cast as Theme | null removed
    if (storedTheme) {
      return storedTheme;
    }
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) {
      try {
        const parsedGoals = JSON.parse(storedGoals); // Type : Goal[] removed
        setGoals(parsedGoals);
      } catch (error) {
        console.error("Error al parsear metas desde localStorage:", error);
        setGoals([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const addGoal = useCallback((newGoalData) => { // Type Omit<Goal, ...> removed
    const goalWithId = { // Type : Goal removed
      ...newGoalData,
      id: new Date().toISOString() + Math.random().toString(36).substring(2, 9),
      isCompleted: false,
    };
    setGoals(prevGoals => [...prevGoals, goalWithId]);
    setActiveTab(Tab.Countdown);
  }, []);

  const toggleGoalCompletion = useCallback((goalId, complete) => { // Types string, boolean removed
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId
          ? { ...goal, isCompleted: complete, completedDate: complete ? new Date().toISOString() : undefined }
          : goal
      )
    );
  }, []);

  const deleteGoal = useCallback((goalId) => { // Type string removed
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
  }, []);

  const activeGoals = useMemo(() => {
    return goals.filter(goal => {
      const endDate = new Date(goal.endDate);
      return !goal.isCompleted && endDate.getTime() > Date.now();
    }).sort((a,b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
  }, [goals]);

  const completedOrExpiredGoals = useMemo(() => {
    return goals.filter(goal => {
      const endDate = new Date(goal.endDate);
      return goal.isCompleted || endDate.getTime() <= Date.now();
    }).sort((a,b) => {
        const dateA = a.completedDate ? new Date(a.completedDate) : new Date(a.endDate);
        const dateB = b.completedDate ? new Date(b.completedDate) : new Date(b.endDate);
        return dateB.getTime() - dateA.getTime();
    });
  }, [goals]);


  const renderContent = () => {
    switch (activeTab) {
      case Tab.Countdown:
        return (
          <div className="space-y-8">
            {activeGoals.length > 0 ? (
              activeGoals.map(goal => (
                <CountdownCard key={goal.id} goal={goal} onToggleComplete={toggleGoalCompletion} />
              ))
            ) : (
              <div className="text-center py-12">
                <TargetIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
                <h2 className="text-2xl font-semibold text-slate-600 dark:text-slate-300">No Hay Metas Activas</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">¡Crea una nueva meta para iniciar tu cuenta regresiva!</p>
                <button
                  onClick={() => setActiveTab(Tab.NewGoal)}
                  className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center mx-auto dark:hover:bg-emerald-700"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Añadir Nueva Meta
                </button>
              </div>
            )}
          </div>
        );
      case Tab.NewGoal:
        return <GoalForm onAddGoal={addGoal} />;
      case Tab.Completed:
        return (
          <div className="space-y-4">
            {completedOrExpiredGoals.length > 0 ? (
              completedOrExpiredGoals.map(goal => (
                <CompletedGoalItem key={goal.id} goal={goal} onToggleComplete={toggleGoalCompletion} onDelete={deleteGoal} />
              ))
            ) : (
              <div className="text-center py-12">
                <ListChecksIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
                <h2 className="text-2xl font-semibold text-slate-600 dark:text-slate-300">Aún No Hay Metas Completadas o Vencidas</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">¡Alcanza tus metas y míralas aquí!</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 flex flex-col items-center p-4 selection:bg-emerald-500 selection:text-white">
      <header className="w-full max-w-4xl py-6 relative">
        <h1 className="text-4xl font-bold text-center text-emerald-600 dark:text-emerald-500">Lista de Objetivos</h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mt-1 px-2">Define, enfócate y que su guía te acompañe en las decisiones.</p>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main className="w-full max-w-4xl bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 md:p-8">
        <TabsNav activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
      <footer className="w-full max-w-4xl text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
        <p>&copy; 2025, Lista de objetivos, Dsurfer unlimited</p>
      </footer>
    </div>
  );
};

export default App;