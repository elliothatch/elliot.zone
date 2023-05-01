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
				{from: 'scripts', to: '/scripts'},
				{from: 'fonts', to: '/fonts'}
			],
			hypermedia: {
				sitePaths: ['site'],
				processors: {
					pre: [{
						name: 'self'
					}],
				},
				dynamicResources: [{
					name: 'index',
					options: {
						property: '@type'
					}
				}]
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
					'https://schema.org/Test': 'layouts/test.hbs',
				},
				context: '/site.json',
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
