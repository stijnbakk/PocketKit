// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';


// https://astro.build/config
export default defineConfig({
	integrations: [
		mermaid(),
		starlight({
			title: 'PocketKit',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/stijnbakk/PocketKit' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Local Development', slug: 'guides/local-development' },
						{ label: 'Deployment', slug: 'guides/deployment' },
					],
				},
				{
					label: 'Core Concepts',
					items: [
						{ label: 'Authentication', slug: 'concepts/auth' },
					],
				},
			],
		}),
	],
});
