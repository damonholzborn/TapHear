// ************************************ Setup ************************************

var wordInput;
var hamburger;
var menu;
var playArea;
var inputForm;
var clearArea;
var clearButton;
var wordCloudDiv;

var menuIsActive = false;

var baseFontSize = 22;
var fontIncreaseForIncrement = 3;

var wordNumber = 0;
var previousWordSpanID;
var savedWordsHeard = JSON.parse(localStorage.getItem('wordsHeard'));
var savedWordsHeardSizes = JSON.parse(localStorage.getItem('wordsHeardSizes'));
var wordsHeard =  savedWordsHeard ? savedWordsHeard : [];
var wordsHeardSizes = savedWordsHeardSizes ? savedWordsHeardSizes : [];
var wordCloud = [];
var cloudColors = ["#7e7e7c", "#8e8e8c", "#9e9e9c", "#aeaeac", "#bebebc", "#cececc", "#dededc", "#eeeeec", "#fefefc" ];	
var colorOffset = 2;

var hasClosedMenu = parseInt(localStorage.getItem('hasClosedMenu'));


var touchOrClick = 'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown';

window.onload = function() {
	wordInput = document.getElementById("word_input");
	hamburger = document.getElementById("hamburger");
	menu = document.getElementById("menu");
	playArea = document.getElementById("play_area");
	inputForm = document.getElementById("input_form");
	clearArea = document.getElementById("clear_area");
	clearButton = document.getElementById("clear_button");
	wordCloudDiv = document.getElementById("wordcloud");
	
	hamburger.addEventListener(touchOrClick, menuToggle, false);
	inputForm.addEventListener('submit', function(event) {
		addNewWord(wordInput.value.trim(), baseFontSize, true);
		wordInput.value = '';
		wordInput.placeholder = '';
		wordInput.focus();
		event.preventDefault();
	});
	
	clearButton.addEventListener('click', function(event) {
		clearWordCloud();
		wordInput.focus();
		wordInput.placeholder = 'type hear';
	});
	
	if (!hasClosedMenu) {
		setTimeout(function() {
			menuToggle();
		}, 750);
		
	}
	
	if (wordsHeard.length && wordsHeardSizes.length) {
		for (var i = 0; i < wordsHeard.length; i++) {
			addNewWord(wordsHeard[i], wordsHeardSizes[i], true);
		}
	}
	
	// hearAllSix();
}

// ************************************ App ************************************

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
		localStorage.setItem('hasClosedMenu', 1);
	}
}

function addNewWord(word, fontsize, shouldsave) {
	var wordToAdd = word;

	if (!wordToAdd) {
		return
	}
	if (!wordCloud[wordToAdd])
	{			
		if (previousWordSpanID)
		{
			document.getElementById(previousWordSpanID).className = "staticCloud";
		}
	
		wordsHeard[wordNumber] = wordToAdd;
		wordsHeardSizes[wordNumber] = fontsize;
		
		var wordToAddSpanID = "cloudWord" + wordToAdd;
		var wordToAddAnchorID = wordToAddSpanID + "Anchor"
		wordCloud[wordToAdd] = wordToAddAnchorID;
		
		var newHTML =  "<span id='" + wordToAddSpanID + "' class='bouncyCloud'><a id='" + wordToAddAnchorID + "'>&nbsp;" + wordToAdd + "&nbsp;</a></span> ";
		wordCloudDiv.insertAdjacentHTML('afterbegin', newHTML);
		
		var wordAnchor = document.getElementById(wordToAddAnchorID);
		wordAnchor.style.color = getCloudColor(colorOffset);
		var fontSize = fontsize ? fontsize : baseFontSize;
		wordAnchor.style.fontSize = fontSize + 'px';
		wordAnchor.style.color = getCloudColor(fontsize);
		wordAnchor.addEventListener(touchOrClick, function() {
			makeBigger(wordToAdd);
			event.preventDefault();
		});
		
		previousWordSpanID = wordToAddSpanID;
		wordNumber++;
	}
	else
	{
		makeBigger(wordToAdd);
	}
	if (shouldsave) {
		localStorage.setItem('wordsHeard', JSON.stringify(wordsHeard));
		localStorage.setItem('wordsHeardSizes', JSON.stringify(wordsHeardSizes));
	}
	clearArea.classList.add('show');
	clearButton.classList.remove('hide');
}	

function makeBigger(word, size) {
	var wordIndex = wordsHeard.indexOf(word);
	wordsHeardSizes[wordIndex] = wordsHeardSizes[wordIndex] + fontIncreaseForIncrement;

	var wordElement = wordCloud[wordCloud + word];
	wordAnchor = document.getElementById(wordElement);
	wordParent = document.getElementById(wordElement).parentNode;
	previousWordSpan = document.getElementById(previousWordSpanID);

	if (previousWordSpanID || previousWordSpanID != wordParent.id)
	{
		previousWordSpan.className = "staticCloud";
	}
	
	setTimeout(function() {
		wordParent.classList.add('bouncyCloud');		
	}, 5);
	
	if (size) {
		wordFontSize = size;		
	}
	else {
		wordFontSize = parseInt(wordAnchor.style.fontSize) + fontIncreaseForIncrement;		
	}
	wordAnchor.style.fontSize = wordFontSize + "px";
	wordAnchor.style.color = getCloudColor(wordFontSize);

	previousWordSpanID = wordParent.id;
	
	localStorage.setItem('wordsHeardSizes', JSON.stringify(wordsHeardSizes));		
	
	return false;
}

function clearWordCloud() {
	wordCloudDiv.innerHTML = '';
	wordsHeard = [];
	wordsHeardSizes = [];
	previousWordSpanID = undefined;
	localStorage.removeItem('wordsHeard');
	localStorage.removeItem('wordsHeardSizes');
	clearButton.classList.add('hide');

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

function getCSSProperty(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
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


