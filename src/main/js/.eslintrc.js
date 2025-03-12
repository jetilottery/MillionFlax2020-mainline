module.exports = {
		"parserOptions": {
				"ecmaVersion": 2017,
		},
		env: {
				browser: true,
				amd: true,
				es6: true
		},
		extends: "eslint:recommended",
		rules: {
				"no-console": [0],
				"semi": ["error", "always"],
				"no-use-before-define": ["error", { "functions": false, "classes": false }],
		}
};
