import stylisticJs from "@stylistic/eslint-plugin-js";
export default [
	{
		files: ["**/*.js"],
		plugins: {
			"@stylistic/js": stylisticJs,
		},
		rules: {
			"@stylistic/js/indent": ["error", "tab"],
			"@stylistic/js/linebreak-style": ["error", "unix"],
			"@stylistic/js/quotes": ["error", "double"],
			"@stylistic/js/semi": ["error", "always"],
			eqeqeq: "error",
			"no-trailing-spaces": "error",
			"object-curly-spacing": ["error", "always"],
			"arrow-spacing": ["error", { before: true, after: true }],
			"no-console": 0,
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		ignores: ["dist/**", "node_modules/**"],
	},
];
