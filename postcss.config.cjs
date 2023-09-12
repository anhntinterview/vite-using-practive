module.exports = {
    "plugins": {
        "postcss-plugin": {},
        "postcss-import": {},
        "postcss-preset-env": {
            "features": {
                "nesting-rules": false
            }
        },
        "postcss-custom-properties": {},
        "autoprefixer": {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
}