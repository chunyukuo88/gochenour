import 'dotenv/config';

export const getNodeVersion = () => process.versions.node;

export const getMemoryUsage = () => process.memoryUsage().heapUsed;