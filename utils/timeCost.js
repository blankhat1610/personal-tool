import { performance } from 'perf_hooks';

const timeCost = (fn, ...args) => {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  const executionTime = (end - start).toFixed(3);
  return { result, executionTime };
};

export default timeCost;
