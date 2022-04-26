module.exports = {
	root: true,
	plugins: ['@typescript-eslint'],
	extends: ['next/core-web-vitals', 'prettier', 'plugin:@typescript-eslint/recommended'],
	settings: {
		next: {
			rootDir: ['apps/*/', 'packages/*/'],
		},
	},
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn'
    }
}
