window.onload = init;
const dict = {
	woonstijlen: ["Basic", "Vintage", "Design", "Industrieel", "Klassiek", "Landelijk", "Romantisch", "Retro"],
	uitspraken: ["Verbinding met de keuken", "Tuin is het verlengstuk van het huis", "Verschillende functies", "Kinderen nemen de woonkamer over", "Alle meubels tegen de muren", "Knipoog naar ...", "Middelpunt van het huis"],
	partners: ["Dock Four", "Eijerkamp", "Eijffinger", "Flexa", "Geberit", "GewoonGers", "Hartman", "Upstairs", "Verasol", "Werk aan de muur", "Woninginrichting-Aanhuis.nl"],
	diversen: ["Robust", "Stoer", "Pastel kleuren", "Aardse kleuren", "Zachte materialen", "Natuurlijke materialen", "Persoonlijke touch", "Woontrend", "Mix & match", "Zitcomfort", "Elementenbank", "Shutters"]
}

function init() {
	document.getElementById("reload").onclick = createCard;
	if (card = localStorage.getItem('card')) {
		restoreCard(JSON.parse(card));
	} else {
		createCard();
	}
}

function restoreCard(card) {
	for (const [id, state] of Object.entries(card)) {
		fillBox(id, state.value, state.checked);
	}
}

function createCard() {
	localStorage.setItem('card', '{}');
	const dictClone = JSON.parse(JSON.stringify(dict)); // clone dict to keep original values
	for (const [category, values] of Object.entries(JSON.parse(JSON.stringify(dict)))) {
		for (var i=1; i<=3; i++) {
			fillBox(category + i, shuffle(values).pop(), false);
		}
	}
}

function fillBox(id, value, checked) {
	document.getElementById(id).innerHTML = value;
	document.getElementById(id).setAttribute("data-checked", checked ? 1 : 0);
	document.getElementById(id).onmousedown = toggleColor;
	storeState(id, value, checked);
	checkWin();
}

function storeState(id, value, checked) {
	let card = JSON.parse(localStorage.getItem('card') ?? "{}");
	let box = card[id] ?? {};
	if (value) {
		box.value = value;
	}
	box.checked = checked;
	card[id] = box;
	localStorage.setItem('card', JSON.stringify(card));
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
	const element = evt ? evt.target : window.event.srcElement;
	const currentState = parseInt(element.dataset.checked ?? 0);
	const wantedState = currentState === 0 ? 1 : 0;
	element.dataset.checked = wantedState;
	storeState(element.id, null, wantedState === 1);
	checkWin();
}


function checkWin() {
	for (const category of Object.keys(dict)) {
		document.getElementById(category).dataset.count =
			parseInt(document.getElementById(category + 1).dataset.checked) +
			parseInt(document.getElementById(category + 2).dataset.checked) +
			parseInt(document.getElementById(category + 3).dataset.checked);
	}
}
