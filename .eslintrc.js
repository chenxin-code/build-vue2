module.exports = {
	'env': {
		'browser': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'module'
			}
		}
	],
	'parserOptions': {
		//'ecmaVersion': 'latest',
		'sourceType': 'module',
		allowImportExportEverywhere: true // 不限制eslint对import使用位置
	},
	'plugins': [
		'vue'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		// 关闭名称校验
		'vue/multi-word-component-names': 'off'
	}
};
