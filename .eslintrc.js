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
        "no-param-reassign": "off",
        "no-extra-semi": "off", // or 1?
        "strict": ["warn", "global"],
        "no-tabs": "error",
        "func-names": ["error", "never"],
        "no-console": "off",

        "properties": "off",
        "no-underscore-dangle": "off",
        "no-use-before-define": "off",
        "no-plusplus": "off",
        "no-mixed-operators": "off",
        "one-var": "warn",
        "no-useless-escape": "off",
        "class-methods-use-this": "off",
        "no-restricted-syntax": "off",
        "prefer-arrow-callback": "off",
        "comma-dangle": "warn",
        "no-unused-vars": "off",
        "space-before-function-paren": "off",
        "guard-for-in": "warn",

        "indent": ["error", 4, {"SwitchCase": 1}],
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
