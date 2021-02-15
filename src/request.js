const fetch = require('node-fetch');

module.exports = function(url, options = {}, callback = () => console.log(arguments)) {
	if (typeof options == 'function') {
		callback = options;
		options = {};
	}
	fetch(url, options)
		.then(async data => {
			data.request = {uri: {href: data.url } }
			return {
				text: await data.clone().text(),
				data
			}
		})
		.then(({ data, text }) => {
			callback(null, data, text)
		})
		.catch(err => {
			callback(err);
		})
}