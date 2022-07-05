// lint-staged.config.mjs
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    // Type check TypeScript files
    '*.(ts|tsx)': () => 'yarn tsc --noEmit',

    // Lint then format TypeScript and JavaScript files
    '**/*.(ts|tsx|js|jsx)': filenames => [
        `yarn lint:fix ${filenames.join(' ')}`,
        `yarn prettier:fix ${filenames.join(' ')}`,
    ],

    // Format MarkDown and JSON
    '**/*.(md|json)': filenames => `yarn prettier:fix ${filenames.join(' ')}`,
};
