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
    player1.enabled = true;
    player1.name = $("#name-input").val();
    sessionStorage.setItem("player", 1);
    Player1.set(player1);

});
$(document).on("click", "#player2Login", function () {
    player2.enabled = true;
    player2.name = $("#name-input").val();
    sessionStorage.setItem("player", 2);
    Player2.set(player2);
});
$(document).on("click", "#player1Logout", function () {
    player1.enabled = false;
    player1.name = "logout";
    player1.wins = 0;
    sessionStorage.setItem("player", 0);
    Player1.set(player1);
});
$(document).on("click", "#player2Logout", function () {
    player2.enabled = false;
    player2.name = "logout";
    player2.wins = 0;
    sessionStorage.setItem("player", 0);
    Player2.set(player2);
});

Player1.on('value', function (snapshot) {
    player1.enabled = snapshot.child("enabled").val();
    player1.name = snapshot.child("name").val();
    player1.choice = snapshot.child("choice").val();
    if (player1.enabled) {
        $("#player1Login").prop("disabled", true);
        $("#player1Logout").prop("disabled", false);
    } else {
        $("#player1Login").prop("disabled", false);
        $("#player1Logout").prop("disabled", true);
    }
});
Player2.on('value', function (snapshot) {
    player2.enabled = snapshot.child("enabled").val();
    player2.name = snapshot.child("name").val();
    player2.choice = snapshot.child("choice").val();
    if (player2.enabled) {
        $("#player2Login").prop("disabled", true);
        $("#player2Logout").prop("disabled", false);
    } else {
        $("#player2Login").prop("disabled", false);
        $("#player2Logout").prop("disabled", true);
    }
});

function send() {
    Player1.set(player1);
    Player2.set(player2);
}


$(document).on("click", "#rock", function () {
    if (sessionStorage.getItem("player") == 1) {
        player1.choice = 'r';
        console.log(player1.choice);
    } else {
        player2.choice = 'r';
        console.log(player2.choice);
    }
    send()
});

$(document).on("click", "#paper", function () {
    if (sessionStorage.getItem("player") == 1) {
        player1.choice = 'p';
        console.log(player1.choice);
    } else {
        player2.choice = 'p';
        console.log(player2.choice);
    }
    send()
});

$(document).on("click", "#scissors", function () {
    if (sessionStorage.getItem("player") == 1) {
        player1.choice = 's';
        console.log(player1.choice);
    } else {
        player2.choice = 's';
        console.log(player2.choice);
    }
    send()
});

$(document).on("click", "#play", function () {
    if (player1.enabled && player2.enabled) {
        console.log('Ready to Play!');
        var intervalId;
        var number = 4;
        intervalId = setInterval(decrement, 1000);
    } else if (player1.enabled) {
        console.log('Player 2 Login Required');
    } else if (player2.enabled) {
        console.log('Player 1 Login Required');
    } else {
        console.log('Please log in to Play');
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
});

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

// window.onunload = function (e) {
//     if (sessionStorage.getItem("player") === 1){
//         player1.enabled = false;
//         Player1.set(player1);
//     }else{
//         player2.enabled = false;
//         Player2.set(player2);
//     }
// } 