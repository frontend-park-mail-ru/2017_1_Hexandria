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
        "no-extra-semi": 0, // or 1?
        "strict": [0, "global"],
        "no-tabs": 1,
        "func-names": ["error", "never"],
        "no-console": 0,

        "properties": 0,
        "no-underscore-dangle": 0,
        "no-use-before-define": 0,
        "no-plusplus": 0,
        "no-mixed-operators": 0,
        "one-var": 0,
        "no-useless-escape": 0,
        "class-methods-use-this": 0,
        "no-restricted-syntax": 0,
        "prefer-arrow-callback": 0,

        "indent": ["error", 4, {"SwitchCase": 1}],
        "no-unused-vars": 0,
        "space-before-function-paren": 0,
        "max-len": ["error", {
            "code": 200,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }],
        "quotes": ["error", "single", { "avoidEscape": true }]
    },

};
