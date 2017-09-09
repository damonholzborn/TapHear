// ************************************ Setup ************************************

var baseFontSize = 22;
var fontIncreaseForIncrement = 3;
var wordNumber = 0;
var previousWordSpanID;
var wordsHeard = new Array();	
var cloudColors = ["#346593", "#64559B", "#9E4873", "#915332", "#62641A", "#26706F"];	

function loadBang() {
	if (window.innerWidth > 735)
		document.getElementById("taphearinterface").style.top = "-94px";
	else 
		document.getElementById("taphearinterface").style.top = "-26px";
		
	document.getElementById("helpbutton").addEventListener("click", function(event){
		console.log("poopy");
		event.preventDefault();
		});
	
}

window.addEventListener("orientationchange", loadBang, false);

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


// ************************************ App ************************************

function addNewWord() {
	var wordToAdd;

	document.getElementById("wordInput").focus();

	wordToAdd = document.getElementById("wordInput").value.trim();
	wordSizeString = baseFontSize + "px";

	if (!wordsHeard[wordToAdd])
	{			
		if (previousWordSpanID)
		{
			document.getElementById(previousWordSpanID).className = "staticCloud";
		}
		var wordToAddSpanID = "cloudWord" + wordNumber;
		var wordToAddAnchorID = wordToAddSpanID + "Anchor"
		wordsHeard[wordToAdd] = wordToAddAnchorID;
			
		var oldText = document.getElementById("wordcloud").innerHTML;
		document.getElementById("wordcloud").innerHTML = "<span id='" + wordToAddSpanID + "' class='bouncyCloud'><a href='javascript:makeBigger(\"" + wordToAddAnchorID +  "\")' style='font-size:" + wordSizeString + "; white-space:nowrap;' id='" + wordToAddAnchorID + "'>&nbsp;" + wordToAdd + "&nbsp;</a></span> " + oldText;								
		document.getElementById(wordToAddAnchorID).style.color = getCloudColor(baseFontSize);
		//document.getElementById(wordToAddSpanID).addEventListener("animationend", sup, false);
// 		setTimeout(function(){
// 			document.getElementById(wordToAddSpanID).className = "poopy";
// 		}, 4000);
		
		document.getElementById("wordInput").value = "";
		previousWordSpanID = wordToAddSpanID;
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
	
	//document.getElementById("wordInput").focus();

	wordAnchor = document.getElementById(word);
	wordParent = document.getElementById(word).parentNode;
	previousWordSpan = document.getElementById(previousWordSpanID);

	if (previousWordSpanID || previousWordSpanID != wordParent.id)
	{
		previousWordSpan.className = "staticCloud";
	}
	
	console.log(css(previousWordSpan, 'font-weight'), "|--|", css(wordAnchor, 'font-weight'));
	wordParent.className = "bouncyCloud";
	
	wordFontSize = parseInt(wordAnchor.style.fontSize) + fontIncreaseForIncrement;
	wordAnchor.style.fontSize = wordFontSize + "px";
	wordAnchor.style.color = getCloudColor(wordFontSize);

	previousWordSpanID = wordParent.id;
	
	return false;
}

function css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
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
	 return false;	
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

