import { getMemoryUsage } from '../nodeUtils/processFunctions.js';

export const displayMemoryUsed = () => {
  const heapUsed = getMemoryUsage() / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(heapUsed * 100) / 100} MB`);
};