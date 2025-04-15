
module: {
    rules: [
        {
            test: /\.html$/i,
            loader: 'html-loader',
            options:{
                sources: false,
            },
        }
    ]
}