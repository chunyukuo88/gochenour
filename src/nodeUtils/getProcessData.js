import 'dotenv/config';

export const getProcessData = () => process.versions.node;

export const getMemoryUsage = () => process.memoryUsage;