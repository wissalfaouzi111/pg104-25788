import globals from "globals";

export default [
    {
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            }
        },
        rules: {
            "no-inner-declarations": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-inferrable-types" : "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "array-callback-return": "error",
            "consistent-return": "error",
            "eqeqeq": "error",
            "no-eval": "error",
            "no-fallthrough": "error",
            "no-mixed-spaces-and-tabs": "error",
            "no-undef": "error",
            "no-unreachable": "error",
            "no-var": "error",
            "prefer-const": "error",
            "semi": "error",
        }
    }
];
