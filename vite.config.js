import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getBasePath() {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

  if (process.env.GITHUB_ACTIONS && repoName && !repoName.endsWith('.github.io')) {
    return `/${repoName}/`;
  }

  return '/';
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
});
