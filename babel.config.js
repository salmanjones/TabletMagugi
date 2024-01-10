module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.js', '.jsx', '.json'],
                alias: {
                    '~': './src',
                    '@imgPath': './assets/images',
                },
            },
        ],
        ['@babel/plugin-transform-flow-strip-types', { loose: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
    ],
};
