var play1 = "",
	play2 = "",
	tour = true;

function afficheResulta(result){
	console.log(result)
};

let board = ["", "", "", "", "", "", "", "", ""];
function choixPion(id) {
	if (id == "idX") {
		play1 = "X";
		play2 = "0";
	} else {
		play1 = "0";
		play2 = "X";
	}

	document.querySelector(".layer").classList.toggle("d-none");
}

function isempty(id) {
	var vide = document.getElementById(id).textContent;
	if (vide == "") {
		return true;
	} else {
		return false;
	}
}

function updateboard(id, player) {
	let index = parseInt(id[4]) - 1;
	board[index] = player;
}
// Récupération des cases à clicker

const items = document.getElementsByClassName("grid-item");

function choiseCase(id) {
	var choix = document.getElementById(id);
	if (isempty(id)) {
		if (tour == true) {
			choix.textContent = play1;
			updateboard(id, play1);
			if (verifierboard(play1)) {
				afficheResulta(play1);
			} else {
				if (placeVide().length==0) {
					afficheResulta("Draw");
				} else {
					turn = false;
					cpuTurn();
				}
			}
		}
	}
}

function placeVide() {
	let i,
		empty = [];
	for (i = 0; i < board.length; i++) {
		if (board[i] == "") {
			empty.push(i);
		}
	}
	return empty;
}

function cpuTurn() {
	console.log("CPU");
	let emptyPlace = placeVide();
	let move = Math.floor(Math.random() * emptyPlace.length);
	let index = emptyPlace[move];
	let id = "item" + (index + 1);
	console.log(id);
	document.getElementById(id).textContent = play2;
	updateboard(id, play2);
	if (verifierboard(play2)) {
		afficheResulta(play2);
	} else {
		if (placeVide().length==0) {
			afficheResulta("Draw");
		} else {
			tour = true;
		}
	}
}

function isempty(id) {
	var choix = document.getElementById(id).textContent;
	if (choix == "") {
		return true;
	} else {
		return false;
	}
}


function verifierboard(player) {
	let win = player.repeat(3);
	let ligne = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
	];
	let col = [
		[0, 3, 6],
		[1, 4, 5],
		[2, 5, 8],
	];
	let diag = [
		[0, 4, 8],
		[6, 4, 2],
	];
	for (i = 0; i < ligne.length; i++) {
		now = board[ligne[i][0]] + board[ligne[i][1]] + board[ligne[i][2]];
		if (now == win) {
			return true;
		}
	}
	for (i = 0; i < col.length; i++) {
		now = board[col[i][0]] + board[col[i][3]] + board[col[i][6]];
		if (now == win) {
			return true;
		}
	}
	for (i = 0; i < ligne.length; i++) {
		now = board[diag[i][0]] + board[diag[i][4]] + board[diag[i][8]];
		if (now == win) {
			return true;
		}
		return false;
	}
}

// Vide le contenu de toute les cases
function rest() {
	for (var i = 0; i < items.length; i++) {
		console.log(items[i]);
		items[i].textContent = "";
	}
}
