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
        "no-undef": 1, // or 0?
        "strict": [0, "global"],
        "no-tabs": 0,
        "func-names": 0,
        "no-console": 1, // or 0?

        "properties": 0,
        "no-shadow": 0,
        "no-underscore-dangle": 0,
        "no-use-before-define": 0,
        "no-plusplus": 0,
        "no-mixed-operators": 0,
        "one-var": 0,
        "camelcase": 0,
        "no-useless-escape": 0,
        "default-case": 0,
        "class-methods-use-this": 0,

        "indent": ["error", "tab"],
        "no-unused-vars": 0,
        "wrap-iife": 0,
        "space-before-function-paren": 0,
        "max-len": ["error", {
            "code": 200,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }],
        "quotes": ["error", "double", { "avoidEscape": true }]
    },

};
