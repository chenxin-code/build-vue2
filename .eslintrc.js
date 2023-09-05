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
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		// 关闭名称校验
		'vue/multi-word-component-names': 'off',
		// 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
		'array-bracket-spacing': ['warn', 'never'],
		// 单行100个字符
		//'max-len': ['warn', { code : 100 }],
		// 使用 === 替代 ==
		'eqeqeq': ['warn', 'allow-null'],
		// 控制逗号前后的空格
		'comma-spacing': ['warn', { 'before': false, 'after': true }],
		'no-unused-vars': 'warn',
		// 禁止不必要的布尔转换
		'no-extra-boolean-cast': 'warn',
		// 禁止不必要的分号
		'no-extra-semi': 'warn',
		// 禁止在条件中使用常量表达式
		'no-constant-condition': 'warn',
	}
};
