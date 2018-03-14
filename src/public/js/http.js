function httpGet(url,cb){
  var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
  xhr.responseType = 'json';
	xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
       cb(xhr.response)
    }
    if(xhr.readyState == 4 && xhr.status == 203){
       cb(xhr.response)
    }
	}
	xhr.send();
}
function httpPost(formData, url, cb){
	var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			cb(xhr.response)
		}
	}
	xhr.send(formData);
}
function httpPostFile(formData, url, cb){
	var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			cb(xhr.response)
		}
	}
	xhr.setRequestHeader("Content-Type", 'false');
	xhr.send(formData);
}
