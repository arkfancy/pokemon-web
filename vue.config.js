// vue.config.js
module.exports = {
	// 选项...
	publicPath: "/pokemon",
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://www.arkfancy.com', //源地址 
				changeOrigin: true, //改变源 
			}
		}
	}
}
