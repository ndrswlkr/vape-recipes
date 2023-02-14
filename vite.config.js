import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:3000/'
      },
    }
  }, 

};

export default config;
