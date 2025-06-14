export const calculateProgressPercentage = (
  startDateString: string,
  endDateString: string,
  isCompleted: boolean
): number => {
  if (isCompleted) return 100;

  const start = new Date(startDateString).getTime();
  const end = new Date(endDateString).getTime();
  const now = new Date().getTime();

  if (now >= end) return 100; // El tiempo ha terminado, progreso 100%
  if (now < start) return 0;   // La meta aún no ha comenzado, progreso 0%
  
  const totalDuration = end - start;
  
  // Si la duración es cero o negativa (fechas inválidas), considerar 100% o 0%
  // Esto debería prevenirse con validación en el formulario.
  if (totalDuration <= 0) return 100; 
  
  const elapsedDuration = now - start;
  const progress = (elapsedDuration / totalDuration) * 100;
  
  // Asegurar que el progreso esté entre 0 y 100
  return Math.min(Math.max(0, progress), 100);
};
