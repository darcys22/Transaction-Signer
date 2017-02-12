var crypto = window.crypto || window.msCrypto;


if(crypto.subtle){
  alert("Crypt Supported");
    promise_key = crypto.subtle.generateKey({name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: {name: "SHA-256"}}, false, ["sign", "verify"]);

    promise_key.then(function(key){
        private_key_object = key.privateKey;
        public_key_object = key.publicKey;
    });

    promise_key.catch = function(e){

        console.log(e.message);
    }
    
}

function uploadKey(event) {
	loadBinaryFile(event,function(data){

  crypto.subtle.importKey("pkcs8", data, {name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: {name: "SHA-256"}}, true, ["sign"]).then(function(e){
          console.log(e);
      }, function(e){
          console.log(e);
      }); 
})}

function loadBinaryFile(path, success) {
	var files = path.target.files;
	var reader = new FileReader();
	var name = files[0].name;
	reader.onload = function(e) {
			var data = e.target.result;
			success(data);
	};
	reader.readAsArrayBuffer(files[0]);
}
