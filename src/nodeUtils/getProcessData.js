import 'dotenv/config';

export const getProcessData = () => process.versions.node;

export const getHeapUsed = () => process.memoryUsage;