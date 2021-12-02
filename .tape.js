module.exports = {
	'basic': {
		message: 'supports basic usage'
	},
	'basic:preserve': {
		message: 'supports { preserve: true } usage',
		options: {
			preserve: true
		}
	},
	'import': {
		message: 'supports { importFrom: { customMedia: { ... } } } usage',
		options: {
			importFrom: {
				customMedia: {
					'--mq-a': '(max-width: 30em), (max-height: 30em)',
					'--not-mq-a': 'not all and (--mq-a)'
				}
			}
		}
	},
	'import:json': {
		message: 'supports { importFrom: "test/import-media.json" } usage',
		options: {
			importFrom: 'test/import-media.json'
		},
		expect: 'import.expect.css',
		result: 'import.result.css'
	},
	'import:css': {
		message: 'supports { importFrom: "test/import-media.css" } usage',
		options: {
			importFrom: 'test/import-media.css'
		},
		expect: 'import.expect.css',
		result: 'import.result.css'
	},
	'import:css-from': {
		message: 'supports { importFrom: { from: "test/import-media.css" } } usage',
		options: {
			importFrom: { from: 'test/import-media.css' }
		},
		expect: 'import.expect.css',
		result: 'import.result.css'
	},
	'import:css-from-type': {
		message: 'supports { importFrom: [ { from: "test/import-media.css", type: "css" } ] } usage',
		options: {
			importFrom: [ { from: 'test/import-media.css', type: 'css' } ]
		},
		expect: 'import.expect.css',
		result: 'import.result.css'
	},
	'import:empty': {
		message: 'supports { importFrom: {} } usage',
		options: {
			importFrom: {}
		}
	}
};
