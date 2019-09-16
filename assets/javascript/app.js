
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOwvzg7VJYDiS11LmWOyBEtmAbPmbKkx0",
    authDomain: "rps-multiplayer-c9d8c.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-c9d8c.firebaseio.com",
    projectId: "rps-multiplayer-c9d8c",
    storageBucket: "",
    messagingSenderId: "782482094171",
    appId: "1:782482094171:web:56621e363b4547f8eba77e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

let player = 0;
let arr = [];

let player1 = {
    choice: 'r',
    enabled: false,
    name: 'firstName',
    wins: 0,
}

let player2 = {
    choice: 'r',
    enabled: false,
    name: 'firstName',
    wins: 0,
}

const Player1 = database.ref('users/Player1');
const Player2 = database.ref('users/Player2');

$(document).on("click", "#player1Login", function () {
    player = 1;
    player1.enabled = true;
    player1.name = $("#name-input").val();
    localStorage.setItem("player", 1);
    send();

});
$(document).on("click", "#player2Login", function () {
    player = 2;
    player2.enabled = true;
    player2.name = $("#name-input").val();
    localStorage.setItem("player", 2);
    send();
});
$(document).on("click", "#player1Logout", function () {
    player = 0;
    player1.enabled = false;
    player1.name = "firstName";
    player1.wins = 0;
    localStorage.setItem("player", 0);
    send();
});
$(document).on("click", "#player2Logout", function () {
    player = 0;
    player2.enabled = false;
    player2.name = "firstName";
    player2.wins = 0;
    localStorage.setItem("player", 0);
    send();
});

$(document).on("click", "#play", function () {
    if (player1.enabled && player2.enabled) {
        console.log('Ready to Play!');
        run();
    } else if (player1.enabled) {
        console.log('Player 2 Login Required');
    } else if (player2.enabled) {
        console.log('Player 1 Login Required');
    } else {
        console.log('Please log in to Play');
    }
});


var ref = database.ref("users");
ref.on('value', function (snapshot) {
    var p1Enabled = snapshot.child("Player1").child("enabled").val();
    player1.enabled = p1Enabled;
    if (p1Enabled) {
        $("#player1Login").prop("disabled", true);
        $("#player1Logout").prop("disabled", false);
    } else {
        $("#player1Login").prop("disabled", false);
        $("#player1Logout").prop("disabled", true);
    }
});

var ref = firebase.database().ref("users");
ref.on('value', function (snapshot) {
    var p2Enabled = snapshot.child("Player2").child("enabled").val();
    player2.enabled = p2Enabled;
    if (p2Enabled) {
        $("#player2Login").prop("disabled", true);
        $("#player2Logout").prop("disabled", false);
    } else {
        $("#player2Login").prop("disabled", false);
        $("#player2Logout").prop("disabled", true);
    }
});

$(document).on("click", "#rock", function () {
    if (localStorage.getItem("player") == 1) {
        player1.choice = 'r';
    } else {
        player2.choice = 'r';
    }
    send()
});

$(document).on("click", "#paper", function () {
    if (localStorage.getItem("player") == 1) {
        player1.choice = 'p';
    } else {
        player2.choice = 'p';
    }
    send()
});

$(document).on("click", "#scissors", function () {
    if (localStorage.getItem("player") == 1) {
        player1.choice = 's';
    } else {
        player2.choice = 's';
    }
    send()
});


var number = 4;
var intervalId;
function run() {
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    number--;
    $("#timer").html("<h2>" + number + "</h2>");
    if (number === 0) {
        clearInterval(intervalId);
        console.log(player1.choice, player2.choice);
        round(player1.choice, player2.choice);
        number = 4;
    }
}

function round(p1, p2) {
    str = p1 + p2;
    switch (str) {
        case 'rr':
        case 'pp':
        case 'ss':
            tie();
            break;
        case 'rs':
        case 'sp':
        case 'pr':
            win(player1);
            break;
        case 'sr':
        case 'rp':
        case 'ps':
            win(player2);
            break;
    }
}
function win(player) {
    console.log(`${player.name} is the winner!`);
    player.wins++;
    Player1.set(player1);
    Player2.set(player2);
    console.log(`${player.name} has won ${player.wins} times!`);
}
function tie() {
    console.log('Tie!');
}

function send() {
    Player1.set(player1);
    Player2.set(player2);
}

// window.onunload = function (e) {
//     if (localStorage.getItem("player") === 1){
//         player1.enabled = false;
//         Player1.set(player1);
//     }else{
//         player2.enabled = false;
//         Player2.set(player2);
//     }
// } 