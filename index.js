const Path = require('path');

module.exports = {
	name: 'elliot.zone',
	version: '1.0.0',
	pluginApi: '1',
	dependencies: ['core', 'sass'],
	moduleFactory: (options) => {
		return {
			files: ['dist', 'images'],
			hypermedia: {
				sitePaths: ['site'],
				processors: {
					pre: [{
						name: 'self'
					}],
				}
			},
			renderer: {
				templatePaths: ['templates'],
				partialPaths: ['partials'],
				profileLayouts: {
					'/schema/homepage': 'layouts/homepage.hbs',
				},
				context: {
					title: 'elliot.zone',
					navLinks: {
						"store": {
							"href": "/store",
							"title": "Store"
						},
						"projects": {
							"href": "/projects",
							"title": "Projects"
						},
						"about": {
							"href": "/about",
							"title": "About"
						},
					}
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
					}]
				}
			}
		};
	}
};
