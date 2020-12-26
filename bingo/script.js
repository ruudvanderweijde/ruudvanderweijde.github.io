window.onload = createCard;
const dict = {
	woonstijlen: ["Basic", "Vintage", "Design", "Industrieel", "Klassiek", "Landelijk", "Romantisch"],
	uitspraken: ["Verbinding met de keuken", "Tuin is het verlengstuk van het huis", "Verschillende functies", "Kinderen nemen de woonkamer over", "Alle meubels tegen de muren", "Knipoog naar ...", "Middelpunt van het huis"],
	partners: ["Dock Four", "Eijerkamp", "Eijffinger", "Flexa", "Geberit", "GewoonGers", "Hartman", "Upstairs", "Verasol", "Werk aan de muur", "Woninginrichting-Aanhuis.nl", ],
	diversen: ["Robust", "Stoer", "Pastel kleuren", "Aardse kleuren", "Zachte materialen", "Natuurlijke materialen", "Persoonlijke touch", "No-nonsense", "Woontrend", "Mix-en-match"]
}

function createCard() {
	let shuffled;
	for (const [category, values] of Object.entries(dict)) {
		shuffled = shuffle(values);
		for (var i=1; i<=4; i++) {
			fillCategory(category, i, shuffled.pop());
		}
	}
}

function fillCategory(category, iteration, value) {
	const id = category + iteration;
	document.getElementById(id).innerHTML = value;
	document.getElementById(id).className = "";
	document.getElementById(id).onmousedown = toggleColor;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function toggleColor(evt) {
	var thisSquare = evt ? evt.target : window.event.srcElement;
	if (thisSquare.className === "") {
		thisSquare.className = "pickedBG";
	}	else {
		thisSquare.className = "";
	}
	checkWin();
}


function checkWin() {
	return false; // todo
	let i;
	var winningOption = -1;
	var setSquares = 0;
	var winners = [31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928];

	for (i = 0; i<24; i++) {
		var currSquare = "square" + i;
		if (document.getElementById(currSquare).className !== "") {
			document.getElementById(currSquare).className = "pickedBG";
			setSquares = setSquares | Math.pow(2,i);
		}
	}

	for (i = 0; i<winners.length; i++) {
		if ((winners[i] & setSquares) === winners[i]) {
			winningOption = i;
		}
	}

	if (winningOption > -1) {
		for (i = 0; i<24; i++) {
			if (winners[winningOption] & Math.pow(2,i)) {
				currSquare = "square" + i;
				document.getElementById(currSquare).className = "winningBG";
			}
		}
	}
}
