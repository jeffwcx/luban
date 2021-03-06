"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_shared_utils_1 = require("@luban-cli/cli-shared-utils");
function eslintConfigAirbnb(api, options) {
    const eslintParser = options.preset.language === "ts" ? "@typescript-eslint/parser" : "babel-eslint";
    const lintFileSuffix = options.preset.language === "ts" ? "{ts,tsx}" : "{js,jsx}";
    const parserOptions = new cli_shared_utils_1.SimpleMapPolyfill([
        ["ecmaVersion", 2018],
        ["sourceType", "module"],
        [
            "ecmaFeatures",
            {
                jsx: true,
            },
        ],
    ]);
    const eslintRules = new cli_shared_utils_1.SimpleMapPolyfill([
        ["quotes", ["error", "double"]],
        ["semi", ["error", "always"]],
        ["react/display-name", ["warn"]],
        ["react/prop-types", ["error"]],
        ["space-before-function-paren", ["error", "never"]],
        ["comma-dangle", ["error", "always-multiline"]],
        ["max-len", ["error", { code: 100, ignoreUrls: true, ignoreComments: true }]],
        ["arrow-body-style", "off"],
        ["object-curly-newline", "off"],
        ["indent", "off"],
        ["camelcase", "off"],
        ["operator-linebreak", "off"],
        ["import/prefer-default-export", "off"],
        ["import/no-unresolved", "off"],
        ["import/no-cycle", "off"],
        ["jsx-a11y/no-noninteractive-element-interactions", "off"],
        ["jsx-a11y/click-events-have-key-events", "off"],
    ]);
    const eslintEnv = new cli_shared_utils_1.SimpleMapPolyfill([
        ["browser", true],
        ["es2017", true],
    ]);
    const eslintSettings = new cli_shared_utils_1.SimpleMapPolyfill([
        [
            "react",
            [
                {
                    createClass: "createReactClass",
                    pragma: "React",
                    version: "detect",
                    flowVersion: "0.53",
                },
            ],
        ],
        ["propWrapperFunctions", ["forbidExtraProps", { property: "freeze", object: "Object" }]],
        ["linkComponents", ["Hyperlink", { name: "Link", linkAttribute: "to" }]],
    ]);
    const eslintExtends = ["airbnb"];
    api.extendPackage({
        devDependencies: {
            eslint: "^6.8.0",
            "eslint-loader": "^4.0.2",
            "eslint-config-prettier": "^6.11.0",
            "eslint-plugin-react": "^7.19.0",
            "eslint-plugin-react-hooks": "^3.0.0",
            "eslint-plugin-import": "^2.20.0",
            "eslint-config-airbnb": "^18.1.0",
            "eslint-plugin-jsx-a11y": "^6.2.3",
        },
    });
    if (options.preset.language === "js") {
        api.extendPackage({
            scripts: {
                eslint: "eslint --config .eslintrc --ext .jsx,.js src/",
                "eslint:fix": "eslint --fix --config .eslintrc --ext .jsx,.js src/",
                "format:js": "prettier --write src/**/*.{js,jsx}",
                "format:check:js": "prettier --check src/**/*.{js,jsx}",
            },
            devDependencies: {
                "babel-eslint": "^10.1.0",
            },
            dependencies: {
                "prop-types": "^15.7.2",
            },
        });
        eslintSettings.set("import/extensions", [".js", ".jsx"]);
        eslintExtends.push("prettier", "prettier/react");
    }
    if (options.preset.language === "ts") {
        api.extendPackage({
            scripts: {
                eslint: "eslint --config .eslintrc --ext .tsx,.ts src/",
                "eslint:fix": "eslint --fix --config .eslintrc --ext .tsx,.ts src/",
                check: "tsc --noEmit",
                "format:ts": "prettier --write src/**/*.{ts,tsx}",
                "format:check:ts": "prettier --check src/**/*.{ts,tsx}",
            },
            devDependencies: {
                "@typescript-eslint/parser": "^2.30.0",
                "@typescript-eslint/eslint-plugin": "^2.30.0",
            },
        });
        eslintExtends.push("plugin:@typescript-eslint/recommended-requiring-type-checking", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:import/typescript", "prettier", "prettier/react", "prettier/@typescript-eslint");
        parserOptions.set("project", ["./tsconfig.json"]);
        eslintSettings.set("import/extensions", [".ts", ".tsx"]);
        eslintRules.set("react/prop-types", "off");
        eslintRules.set("@typescript-eslint/explicit-function-return-type", "off");
        eslintRules.set("@typescript-eslint/no-explicit-any", "warn");
        eslintRules.set("@typescript-eslint/camelcase", "off");
        eslintRules.set("react/state-in-constructor", "warn");
        eslintRules.set("react/jsx-filename-extension", ["error", { extensions: [".ts", ".tsx"] }]);
        eslintRules.set("import/extensions", "off");
    }
    if (options.preset.unitTest) {
        eslintEnv.set("jest", true);
        eslintRules.set("import/no-extraneous-dependencies", [
            "error",
            { devDependencies: [`**/*.test.${lintFileSuffix}`, `**/*.spec.${lintFileSuffix}`] },
        ]);
    }
    api.render("./template/other", {
        eslintExtends: JSON.stringify(eslintExtends),
        parserOptions: JSON.stringify(parserOptions.toPlainObject()),
        eslintParser: JSON.stringify(eslintParser),
        eslintRules: JSON.stringify(eslintRules.toPlainObject()),
        settings: JSON.stringify(eslintSettings.toPlainObject()),
        eslintEnv: JSON.stringify(eslintEnv.toPlainObject()),
    });
}
exports.eslintConfigAirbnb = eslintConfigAirbnb;
//# sourceMappingURL=airbnb.js.map