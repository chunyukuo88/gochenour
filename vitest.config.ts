import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/common/displayMethods.js',
        'src/nodeUtils/getCurrentNodeVersion.js',
        '**/*.spec.js',
        '**/*/__test__',
        'index.js'
      ],
    },
  },
});
