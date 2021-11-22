module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ["module-resolver", {
            "root": ["./src"],
            "extensions": [".js", ".jsx", ".json"],
            "alias": {
                "~": "./src",
                "@imgPath": "./assets/images",
                "activities": "./src/activities",
                "styles": "./src/styles",
                "actions": "./src/actions",
                "components": "./src/components",
                "navigators": "./src/navigators",
                "reducers": "./src/reducers",
                "services": "./src/services",
                "utils": "./src/utils"
            }
        }],
        "@babel/plugin-transform-flow-strip-types",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-transform-runtime"
    ]
};
