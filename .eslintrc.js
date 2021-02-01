module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: [
		"react-app",
		"airbnb",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["react"],
	rules: {
		"linebreak-style": [0, "error", "windows"],
		"import/no-cycle": 0,
		"react/jsx-filename-extension": 0,
		"no-underscore-dangle": 0,
		"no-multiple-empty-lines": 0,
		"react/button-has-type": 0,
		"react/jsx-one-expression-per-line": 0,
	}
};
