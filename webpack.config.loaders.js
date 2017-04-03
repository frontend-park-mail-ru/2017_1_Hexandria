module.exports = function() {
	return [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['latest']
			}
		},
		{
			test: /\.(jpe?g|png|gif|svg|)$/i,
			loader: 'file?name=img/[hash].[ext]'
		},
		{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file?name=fonts/[hash].[ext]'
		},
		{
			test: /\.html/,
			loader: 'html-loader'
		},
		{
			test: /\.pug$/,
			loader: "pug-loader"
		}
	];
};
