module.exports = {
    "extends": "airbnb-base",
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
        "no-param-reassign": 0,
        "no-extra-semi": 1,
        "no-undef": 1,
        "strict": [0, "global"],
        "no-tabs": 0,
        "func-names": 0,
        "no-console": 1,
        "indent": ["error", "tab"],
        "no-unused-vars": 0,
        "wrap-iife": 0,
        "space-before-function-paren": 0,
        "max-len": ["error", {
            "code": 100,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }],
        "quotes": ["error", "double", { "avoidEscape": true }]
    },
};