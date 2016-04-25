((MasterTV) => {

MasterTV.Requests = {};
var module = MasterTV.Requests;

module.makeWikiRequest = 
	function(path, callbackSuccess, callbackError) {
		return new Promise((resolve, reject) => {
			var headers = [
	// 			{
	// 				name: "User-Agent", 
	// 				data: "QPonTestMasterTV"
	// 			}
			];
			var xhr = new XMLHttpRequest();
			xhr.onload = xhr.onerror = function(event) {
				if (xhr.status == 200) {
					callbackSuccess(xhr);
					resolve(xhr);
				} else {
					callbackError(xhr);
					reject("error " + xhr.status);
				}
			};
			xhr.open("GET", "https://en.wikipedia.org/api/rest_v1/page/mobile-text/" + path, true);
			if (headers) {
				for (header of headers) {
					xhr.setRequestHeader(header.name, header.data);
				}
			}
			xhr.send();
		});
	};

module.extractHTMLfromWikiRequest = 
	function(xhr) {
		var section = JSON.parse(xhr.responseText).sections[0];
		return section.items[0].text + (section.items[1] ? section.items[1].text : "");
	};

})(window.MasterTV || (window.MasterTV = {}));