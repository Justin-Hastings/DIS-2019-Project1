
/* Using pure xmlHttp with no ajax, no jquery*/
var xhr=createXmlHttpObject();

// Arrays to store messages 
var successes = [];
var errors = [];


// allow for Microsoft variation
function createXmlHttpObject(){
	if(window.XMLHttpRequest){
		xmlHttp=new XMLHttpRequest();
	}else{
		xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
	}
	return xmlHttp;
}

function insertResponse() {
	
	if(xhr.readyState==4 && xhr.status==200){
		// translate from text to JSON
		var jsObj = JSON.parse(xhr.responseText);
		
		jsObj.forEach(function(item, index) {
			if(typeof item['success'] !== 'undefined' && item['success'] !== null) 
				successes.push(item['success']);
			if(typeof item['failure'] !== 'undefined' && item['failure'] !== null) 
				errors.push(item['failure']);
		});
		displayMessages();
	}
}


//	---Insert Business Functions ---------------

function insertBusiness() {
	
	validateBusinessInput();
	if (errors.length < 1){
		//scrap the data from the html document
		var user = document.getElementsByName('userName')[0].value;
		var email = document.getElementsByName('email')[0].value;
		var password = document.getElementsByName('passWord')[0].value;
		var passwordConf = document.getElementsByName('passwordConf')[0].value;
		var businessName = document.getElementsByName('businessName')[0].value;
		var postCode = document.getElementsByName('postCode')[0].value;
		var businessType = document.getElementsByName('businessType')[0].value;
		
		var url = "http://127.0.0.1/fa4/api/insertBusiness.php";

		// build JSON message to send
		var jsonString = JSON.stringify({"username":user, "password":password, "email":email, "businessName":businessName, "postCode":postCode, "businessType":businessType, "passwordConf":passwordConf} );
		
		if(xhr.readyState==0 || xhr.readyState==4){
			//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
			xhr.open('POST', url ,true);  // true is asynchronous
			// set MIME type and character set to match that in insertuser.php
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
			// set callback function that will respond to the listener being triggered
			xhr.onreadystatechange=insertResponse;
			// send message
			xhr.send(jsonString);
		}
	}
}


function displayMessages() {
	if (successes.length > 0) {
		successStr = "<div class='alert alert-success'>";
		for( i = 0; i < successes.length; i++) {
			successStr += "<li>" + successes[i] + "</li>";
		}
		successStr += "</div>";
		document.getElementById("alert-success").innerHTML = successStr;
	} else {
		document.getElementById("alert-success").innerHTML = "";
	}
	
	if(errors.length > 0 ) {
		failureStr = "<div class='alert alert-danger'>";
		for( i = 0; i < errors.length; i++) {
			failureStr += "<li>" + errors[i] + "</li>";
		}
		failureStr += "</div>";
		document.getElementById("alert-danger").innerHTML = failureStr;
	} else {
		document.getElementById("alert-danger").innerHTML = "";
	}
}

function clearMessages() {
	document.getElementById("alert-success").innerHTML = "";
	document.getElementById("alert-danger").innerHTML = "";
}



function validateBusinessInput() {
	// scrap the data from the html document
	var user = document.getElementsByName('userName')[0].value;
	var email = document.getElementsByName('email')[0].value;
	var password = document.getElementsByName('passWord')[0].value;
	var passwordconf = document.getElementsByName('passwordConf')[0].value;
	
	/* Note: if( value ) { }
		will evaluate to true if value is not:
			null
			undefined
			NaN
			empty string ("")
			0
			false
	*/
	switch(event.target.name) {
		case 'userName':
			if (!user) {
				errors.push("Username cannot be nothing");
			}
			break;
		case 'email':
			if (!email) {
				errors.push("Email cannot be nothing");
			}
			break;
		case 'passWord':
			if (!password) {
				errors.push("Password cannot be nothing");
			}
			break;
		case 'passwordConf':
			if (!passwordconf) {
				errors.push("Confirmed password cannot be nothing");
			} else if (password !== passwordconf) {
				errors.push("Password and Confirmed password do not match");
			}
			break;
		default:
			if (!user) {
				errors.push("Username cannot be nothing");
			}
			else if (!email) {
				errors.push("Email cannot be nothing");
			}
			else if (!password) {
				errors.push("Password cannot be nothing");
			}
			else if (!passwordconf) {
				errors.push("Confirmed password cannot be nothing");
			} else if (password !== passwordconf) {
				errors.push("Password and Confirmed password do not match");
			}
			break;
	}
	
	displayMessages();
}	
