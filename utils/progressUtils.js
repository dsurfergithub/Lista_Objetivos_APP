export const calculateProgressPercentage = (
  startDateString, // : string removed
  endDateString,   // : string removed
  isCompleted      // : boolean removed
) => { // : number removed
  if (isCompleted) return 100;

  const start = new Date(startDateString).getTime();
  const end = new Date(endDateString).getTime();
  const now = new Date().getTime();

  if (now >= end) return 100; 
  if (now < start) return 0;   
  
  const totalDuration = end - start;
  
  if (totalDuration <= 0) return 100; 
  
  const elapsedDuration = now - start;
  const progress = (elapsedDuration / totalDuration) * 100;
  
  return Math.min(Math.max(0, progress), 100);
};