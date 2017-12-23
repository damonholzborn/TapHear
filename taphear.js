// ************************************ Setup ************************************

var wordInput;
var hamburger;
var menu;
var playArea;

var menuIsActive = false;

var baseFontSize = 22;
var fontIncreaseForIncrement = 3;
var wordNumber = 0;
var previousWordSpanID;
var wordsHeard = new Array();	
// var cloudColors = ["#346593", "#64559B", "#9E4873", "#915332", "#62641A", "#26706F"];	
// var cloudColors = ["#7e7e7c", "#8e8e8c", "#9e9e9c", "#aeaeac", "#bebebc", "#cececc"];	
var cloudColors = ["#7e7e7c", "#8e8e8c", "#9e9e9c", "#aeaeac", "#bebebc", "#cececc", "#dededc", "#eeeeec", "#fefefc" ];	
var colorOffset = 2;



window.onload = function() {
	loadBang();
}

function loadBang() {
	// document.getElementById("helpbutton").addEventListener("click", function(event){
	// 	console.log("poopy");
	// 	event.preventDefault();
	// 	});
    // 
	
	wordInput = document.getElementById("word_input");
	hamburger = document.getElementById("hamburger");
	menu = document.getElementById("menu");
	playArea = document.getElementById("play_area");
	
	hamburger.addEventListener('click', menuToggle, false);
	wordInput.addEventListener('focus', wordFocus, false);
	
	// hearAllSix();
}

window.addEventListener("orientationchange", loadBang, false);

// playInput.addEventListener("keydown", checkInputLock);
// playInput.addEventListener("keyup", checkLetters);
// submitButton.addEventListener("click", submitLittleWords);
// logo.addEventListener("click", function() { backToMenu(); })

function menuToggle() {
	if (!menuIsActive) {
		playArea.classList.add('hide');
		menu.classList.add('show');
		hamburger.classList.add('is-active');
		menuIsActive = true;
	}
	else {
		playArea.classList.remove('hide');
		menu.classList.remove('show');
		hamburger.classList.remove('is-active');
		menuIsActive = false;
	}
}

function wordFocus() {
	if (menuIsActive) {
		menuToggle();
	}	
}

// ************************************ App ************************************

function addNewWord() {
	var wordToAdd;

	wordInput.focus();

	wordToAdd = wordInput.value.trim();
	wordSizeString = baseFontSize + "px";
	if (!wordToAdd) {
		return
	}
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
		
		
		wordInput.placeholder = '';
		wordInput.value = '';
		previousWordSpanID = wordToAddSpanID;
		wordNumber++;
	}
	else
	{
		makeBigger(wordsHeard[wordToAdd]);
		wordInput.value = "";
	}
}	

function sup() {
	console.log("sup?");
}

function makeBigger(word) {
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
		newColor = cloudColors[0 + colorOffset];
	else if (size <  baseFontSize + 18)
		newColor = cloudColors[1 + colorOffset];
	else if (size <  baseFontSize + 27)
		newColor = cloudColors[2 + colorOffset];
	else if (size <  baseFontSize + 36)
		newColor = cloudColors[3 + colorOffset];
	else if (size <  baseFontSize + 45)
		newColor = cloudColors[4 + colorOffset];
	else
		newColor = cloudColors[5 + colorOffset];
		
	return newColor;
}

// ************************************ Testing ************************************

// 		var testWords = ["i'm", "a", "little", "teapot", "short", "and", "stout", "this", "is", "my", "handle", "and", "this", "is", "my", "spout", "hey", "diddle", "diddle", "the", "cat", "and", "the", "fiddle", "the", "cow", "jumped", "over", "the", "moon", "little", "miss", "muffet", "sat", "on", "her", "tuffet"];
// var testWords = ["i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "i'm", "a", "little", "teapot", "short", "and", "stout", "this", "is", "my", "handle", "and", "this", "is", "my", "spout", "hey", "diddle", "diddle", "the", "cat", "and", "the", "fiddle", "the", "cow", "jumped", "over", "the", "moon", "little", "miss", "muffet", "sat", "on", "her", "tuffet"];
var testWords = ["i'm", "a", "little", "teapot", "short", "and", "stout" ];
var oneSix = ['one', 'two', 'three', 'four', 'five', 'six' ];

function hearABunch() {
	for (var i = 0; i < 20; i++) 
	{
		wordInput.value = testWords[Math.floor((Math.random() * testWords.length))];
		document.getElementById("taphear_form").submit();
	}	
	 return false;	
}

function hearABunch() {
	for (var i = 0; i < 20; i++) 
	{
		wordInput.value = testWords[Math.floor((Math.random() * testWords.length))];
		document.getElementById("taphear_form").submit();
	}	
	 return false;	
}

function hearAllSix() {
	for (var i = 0; i < oneSix.length; i++) 
	{
			wordInput.value = oneSix[i];
			document.getElementById("taphear_form").submit();		
	}	
	for (var i = 0; i < testWords.length; i++) 
	{
		for (var j = i; j < i * 4; j++) 
		{
			wordInput.value = testWords[i];
			document.getElementById("taphear_form").submit();		
		}

	}	
	

	 return false;	
}


function auto() {	
	for (var i = 0; i < 200; i++) 
	{
		setTimeout(function(){
			wordInput.value = testWords[Math.floor((Math.random() * testWords.length))];
			document.getElementById("taphear_form").submit();
		}, 500 * i);
	}				
}

function bounceMe() {

}

