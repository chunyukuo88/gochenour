import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/common/displayMethods.js',
        'src/nodeUtils/processFunctions.js',
        '**/*.spec.js',
        '/__test__/*.js',
        'index.js'
      ],
    },
    watch: false,
  },
});
