const Path = require('path');

module.exports = {
	name: 'elliot.zone',
	version: '1.0.0',
	pluginApi: '1',
	dependencies: ['core', 'sass', 'markdown', 'favicons'],
	moduleFactory: (options) => {
		return {
			files: [
				'dist',
				'images',
				{from: 'scripts', to: '/scripts'},
				{from: 'fonts', to: '/fonts'}
			],
			hypermedia: {
				sitePaths: ['site'],
				processors: {
					pre: [{
						name: 'self'
					}],
					post: [{
						// name: 'matchProfile',
						// options: {
						// 	profile: '/schema/post',
						// 	processors: [{
						// 		name: 'markdown',
						// 		options: {
						// 			fromUri: './post.md',
						// 			to: 'bodyHtml',
						// 		}
						// 	}]
						// }
						// }
						name: 'index',
						options: {
							property: '_links.profile.href',
							embed: ['title', 'date-created']
						}
					}, {
							name: 'resourceGraph'
					}]
				},
				stateProcessors: {
					pre: [{
						name: 'self'
					}]
				}
			},
			renderer: {
				templatePaths: ['templates'],
				partialPaths: ['partials'],
				profileLayouts: {
					'/schema/homepage': 'layouts/homepage.hbs',
					'/schema/under-construction': 'layouts/under-construction.hbs',
					'https://schema.org/BlogPosting': 'layouts/post.hbs',
					'https://schema.org/ItemList': 'layouts/itemlist.hbs',
					'https://schema.org/Product': 'layouts/product.hbs',
					'https://schema.org/ProductGroup': 'layouts/product.hbs',
					'https://schema.org/AboutPage': 'layouts/about.hbs',
				},
				context: {
					title: 'elliot.zone',
					navLinks: {
						// "store": {
						// 	"href": "/store",
						// 	"title": "Store"
						// },
						// "projects": {
						// 	"href": "/projects",
						// 	"title": "Projects"
						// },
						"about": {
							"href": "/about",
							"title": "About"
						},
						"test1": {
							"href": "/test1",
							"title": "test1"
						},
						"test2": {
							"href": "/test2",
							"title": "test2"
						},
						"test3": {
							"href": "/test3",
							"title": "test3"
						},
					},
					footerLinks: [{
						"title": "github",
						"href": "https://github.com/elliothatch/"
					}, {
						"title": "npm",
						"href": "https://www.npmjs.com/~elliothatch"
					}, {
						"title": "twitter",
						"href": "https://twitter.com/neurotischism"
					}, {
						"title": "fedi",
						"href": "https://weirder.earth/@neurotischism"
					}, {
						"title": "patreon",
						"href": "https://www.patreon.com/neurotischism"
					}]
				}
			},
			build: {
				buildSteps: {
					sType: 'task',
					definition: 'sass',
					options: {
						// include node_modules so we can @use any installed package (e.g. sanitize.css)
						includePaths: [Path.join(__dirname, 'node_modules')]
					},
					watch: true,
					files: [{
						inputs: {target: ['sass/styles.scss']},
						outputs: {
							css: ['dist/css/styles.css'],
							sourceMap: ['dist/css/styles.css.map'],
						}
					}],
					watchFiles: ['sass']
				}
			}
		};
	}
};
