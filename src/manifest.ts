import type { Manifest } from 'webextension-polyfill'
import pkg from '../package.json'

const manifest: Manifest.WebExtensionManifest = {
	manifest_version: 3,
	name: pkg.displayName,
	version: pkg.version,
	description: pkg.description,
	// author: {
	// 	email: 'oro3673@gmail.com',
	// },
	author: 'Abiria',
	// options_ui: {
	// 	page: 'src/pages/options/index.html',
	// },
	// background: {
	// 	service_worker: 'src/pages/background/index.js',
	// 	type: 'module',
	// },
	// action: {
	// 	default_popup: 'src/pages/popup/index.html',
	// 	default_icon: 'icon-34.png',
	// },
	// chrome_url_overrides: {
	// 	newtab: 'src/pages/newtab/index.html',
	// },
	icons: {
		'16': './icons/logo-16x16.png',
		'32': './icons/logo-32x32.png',
		'48': './icons/logo-48x48.png',
		'128': './icons/logo-128x128.png',
	},
	content_scripts: [
		{
			matches: [
				'http://*/*',
				'https://*/*',
				'<all_urls>',
			],
			js: ['src/pages/content/index.js'],
			css: ['contentStyle.css'],
		},
	],
	// devtools_page: 'src/pages/devtools/index.html',
	web_accessible_resources: [
		{
			resources: [
				'./icons/logo-16x16.png',
				'./icons/logo-32x32.png',
				'./icons/logo-48x48.png',
				'./icons/logo-128x128.png',
				'contentStyle.css',
			],
			matches: [],
		},
	],
}

export default manifest
