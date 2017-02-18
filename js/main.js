//DOES NOT WORK!

function uploadKey(event) {
  var element = document.getElementById("upload");
	loadBinaryFile(event,function(data){

    window.key = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
		window.key.initVerifyByCertificatePEM(data);

    element.classList.remove('disabled');

})}

function uploadFile(event) {
  var output = document.getElementById("output");
	loadBinaryFile(event,function(data){

    window.key.updateString(data);

    var signature = window.key.sign();
    var oHeader = {alg: 'none', typ: 'JWT'};
    var oPayload = {};

    oPayload.Signature = btoa(signature);
    oPayload.Date = new Date().toJSON().slice(0,10);

    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sJWT = KJUR.jws.JWS.sign("none", sHeader, sPayload);

    output.innerHTML = sJWT;

})}

function loadBinaryFile(path, success) {
	var files = path.target.files;
	var reader = new FileReader();
	var name = files[0].name;
	reader.onload = function(e) {
			var data = e.target.result;
			success(data);
	};
	reader.readAsText(files[0]);
}
