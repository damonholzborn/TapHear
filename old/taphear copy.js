// ************************************ Setup ************************************

var baseFontSize = 22;
var fontIncreaseForIncrement = 3;
var wordNumber = 0;
var previousWordNumber = 0;
var wordsHeard = new Array();	
var cloudColors = ["#346593", "#64559B", "#9E4873", "#915332", "#62641A", "#26706F"];	

function loadBang() {
	if (window.innerWidth > 735)
		document.getElementById("taphearinterface").style.top = "-94px";
	else 
		document.getElementById("taphearinterface").style.top = "-26px";
}

window.addEventListener("orientationchange", loadBang, false);


// ************************************ App ************************************

function addNewWord() {
	var wordToAdd;

	wordToAdd = document.getElementById("wordInput").value.trim();
	wordSizeString = baseFontSize + "px";

	if (!wordsHeard[wordToAdd])
	{			
		var wordToAddSpanID = "cloudWord" + wordNumber;
		var previousWordToAddSpanID = "cloudWord" + (wordNumber - 1);
		console.log("previous", previousWordToAddSpanID);
		var wordToAddAnchorID = wordToAddSpanID + "Anchor"
		wordsHeard[wordToAdd] = wordToAddAnchorID;
			
		document.getElementById("wordcloud").innerHTML += "<span id='" + wordToAddSpanID + "' class='bouncyCloud'><a href='javascript:makeBigger(\"" + wordToAddAnchorID +  "\")' style='font-size:" + wordSizeString + "; white-space:nowrap;' id='" + wordToAddAnchorID + "'> " + wordToAdd + " </a></span> ";								
		document.getElementById(wordToAddAnchorID).style.color = getCloudColor(baseFontSize);
		if (previousWordNumber)
		{
			document.getElementById(previousWordToAddSpanID).className = "staticCloud";
		}
		//document.getElementById(wordToAddSpanID).addEventListener("animationend", sup, false);
// 		setTimeout(function(){
// 			document.getElementById(wordToAddSpanID).className = "poopy";
// 		}, 4000);
		
		document.getElementById("wordInput").value = "";
		previousWordNumber = wordNumber;
		wordNumber++;
	}
	else
	{
		makeBigger(wordsHeard[wordToAdd]);
		document.getElementById("wordInput").value = "";
	}
}	

function sup() {
	console.log("sup?");
}

function makeBigger(word) {
// 	if (previousWordNumber)
// 	{
// 		document.getElementById(previousWordToAddSpanID).className = "staticCloud";
// 	}
// 	
	wordParent = document.getElementById(word).parent;
	wordAnchor = document.getElementById(word);
	
	wordParent.className = "bouncyCloud";
	
	wordFontSize = parseInt(wordAnchor.style.fontSize) + fontIncreaseForIncrement;
	document.getElementById(word).style.fontSize = wordFontSize + "px";
	document.getElementById(word).style.color = getCloudColor(wordFontSize);
}

// ************************************ Utility ************************************

function getCloudColor(size) {
	var newColor;
	if (size < baseFontSize + 9)
		newColor = cloudColors[0]
	else if (size <  baseFontSize + 18)
		newColor = cloudColors[1]
	else if (size <  baseFontSize + 27)
		newColor = cloudColors[2]
	else if (size <  baseFontSize + 36)
		newColor = cloudColors[3]
	else if (size <  baseFontSize + 45)
		newColor = cloudColors[4]
	else
		newColor = cloudColors[5]
		
	return newColor;
}

// ************************************ Testing ************************************

// 		var testWords = ["i'm", "a", "little", "teapot", "short", "and", "stout", "this", "is", "my", "handle", "and", "this", "is", "my", "spout", "hey", "diddle", "diddle", "the", "cat", "and", "the", "fiddle", "the", "cow", "jumped", "over", "the", "moon", "little", "miss", "muffet", "sat", "on", "her", "tuffet"];
var testWords = ["i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "this", "is", "my", "handle", "and", "this", "is", "my", "spout", "hey", "diddle", "diddle", "the", "cat", "and", "the", "fiddle", "the", "cow", "jumped", "over", "the", "moon", "little", "miss", "muffet", "sat", "on", "her", "tuffet"];

function hearABunch() {
	for (var i = 0; i < 10; i++) 
	{
		document.getElementById("wordInput").value = testWords[Math.floor((Math.random() * testWords.length))];
		document.getElementById("taphearform").submit();
	}		
}

function auto() {	
	for (var i = 0; i < 200; i++) 
	{
		setTimeout(function(){
			document.getElementById("wordInput").value = testWords[Math.floor((Math.random() * testWords.length))];
			document.getElementById("taphearform").submit();
		}, 500 * i);
	}				
}

function bounceMe() {

}

