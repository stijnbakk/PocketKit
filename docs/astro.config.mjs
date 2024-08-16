import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'PocketKit',
			social: {
				github: 'https://github.com/stijnbakk/PocketKit',
			},
			sidebar: [
				{
					label: 'Getting started',
					link: '/getting-started',
				},
				{
					label: 'Authentication',
					link: '/authentication',
				},
				{
					label: 'Payments',
					link: '/payments',
				},
				{
					label: 'Deployment',
					link: '/deployment',
				}
				
			],
		}),
	],
});
