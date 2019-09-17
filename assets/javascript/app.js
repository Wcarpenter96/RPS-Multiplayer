// My web app's Firebase configuration
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

// Variables
var player = 0;
var arr = [];
var player1 = {
    choice: 'rock',
    enabled: false,
    name: 'firstName',
    ready: false,
    wins: 0,
}
var player2 = {
    choice: 'rock',
    enabled: false,
    name: 'firstName',
    ready: false,
    wins: 0,
}
// Setup
const Player1 = database.ref('users/Player1');
const Player2 = database.ref('users/Player2');
$('#ready').html('<div><h1>READY</h1><div>').addClass('ready m-5 btn border').css('background-color', 'white');

// Login Player1
$(document).on("click", "#player1Login", function () {
    player1.enabled = true;
    player1.name = $("#name-input").val();
    sessionStorage.setItem("player", 1);
    Player1.set(player1);
    window.location.href = 'game.html';

});
// Login Player2 
$(document).on("click", "#player2Login", function () {
    player2.enabled = true;
    player2.name = $("#name-input").val();
    sessionStorage.setItem("player", 2);
    Player2.set(player2);
    window.location.href = 'game.html';
});
// Logout Player
$(document).on("click", "#playerLogout", function () {
    if (sessionStorage.getItem("player") == 1) {
        player1.enabled = false;
        player1.name = "logout";
        player1.wins = 0;
        sessionStorage.setItem("player", 0);
        Player1.set(player1);
    } else if (sessionStorage.getItem("player") == 2) {
        player2.enabled = false;
        player2.name = "logout";
        player2.wins = 0;
        sessionStorage.setItem("player", 0);
        Player2.set(player2);
    }
    window.location.href = 'index.html';
});
// When Player1 user data is updated 
Player1.on('value', function (snapshot) {
    player1.enabled = snapshot.child("enabled").val();
    player1.name = snapshot.child("name").val();
    player1.choice = snapshot.child("choice").val();
    player1.ready = snapshot.child("ready").val();
    if (player1.enabled) {
        $("#player1Login").prop("disabled", true);
        $("#player1Logout").prop("disabled", false);
    } else {
        $("#player1Login").prop("disabled", false);
        $("#player1Logout").prop("disabled", true);
    }
    startRound();
});
// When Player2 user data is updated 
Player2.on('value', function (snapshot) {
    player2.enabled = snapshot.child("enabled").val();
    player2.name = snapshot.child("name").val();
    player2.choice = snapshot.child("choice").val();
    player2.ready = snapshot.child("ready").val();
    if (player2.enabled) {
        $("#player2Login").prop("disabled", true);
        $("#player2Logout").prop("disabled", false);
    } else {
        $("#player2Login").prop("disabled", false);
        $("#player2Logout").prop("disabled", true);
    }
    startRound();
});
// This sends playerN object data to the database
function send() {
    Player1.set(player1);
    Player2.set(player2);
}
// Select Rock 
$(document).on("click", ".rock", function () {
    if (sessionStorage.getItem("player") == 1) {
        player1.choice = 'rock';
        console.log(player1.choice);
    } else {
        player2.choice = 'rock';
        console.log(player2.choice);
    }
    send();
});
// Select Paper
$(document).on("click", ".paper", function () {
    if (sessionStorage.getItem("player") == 1) {
        player1.choice = 'paper';
        console.log(player1.choice);
    } else {
        player2.choice = 'paper';
        console.log(player2.choice);
    }
    send();
});
// Select Scissors
$(document).on("click", ".scissors", function () {
    if (sessionStorage.getItem("player") == 1) {
        player1.choice = 'scissors';
        console.log(player1.choice);
    } else {
        player2.choice = 'scissors';
        console.log(player2.choice);
    }
    send();
});
// Indicates that both players are ready for the countdown 
$(document).on("click", ".ready", function () {

    if (player1.enabled && player2.enabled) {
        $(this).css("background-color", "lightgrey")
        if (sessionStorage.getItem("player") == 1) {
            player1.ready = true;
            Player1.set(player1);
        }
        if (sessionStorage.getItem("player") == 2) {
            player2.ready = true;
            Player2.set(player2);
        }
    }
});
// When user hovers on ready/rock/paper/scissors buttons, the buttons change color 
// and the cursor changes to a pointer
$(document).on("mouseenter", ".ready", function () {
    $(this).css("opacity", "0.7").css('cursor', 'pointer');
});
$(document).on("mouseenter", ".rock", function () {
    $(this).css("opacity", "0.7").css('cursor', 'pointer');
});
$(document).on("mouseenter", ".paper", function () {
    $(this).css("opacity", "0.7").css('cursor', 'pointer');
});
$(document).on("mouseenter", ".scissors", function () {
    $(this).css("opacity", "0.7").css('cursor', 'pointer');
});
$(document).on("mouseleave", ".ready", function () {
    $(this).css("opacity", "1").css('cursor', 'default');
});
$(document).on("mouseleave", ".rock", function () {
    $(this).css("opacity", "1").css('cursor', 'default');
});
$(document).on("mouseleave", ".paper", function () {
    $(this).css("opacity", "1").css('cursor', 'default');
});
$(document).on("mouseleave", ".scissors", function () {
    $(this).css("opacity", "1").css('cursor', 'default');
});
// Starts one round of RPS
function startRound() {
    if (player1.enabled && player2.enabled) {
        if (player1.ready && player2.ready) {
            $('#info').empty();
            player1.ready = false;
            player2.ready = false;
            send();
            console.log('Ready to Play!');
            $('#rock').html('<div><h1>Rock</h1></div>').addClass('rock border').css('background-color', 'white');
            $('#paper').html('<div><h1>Paper</h1></div>').addClass('paper border').css('background-color', 'white');
            $('#scissors').html('<div><h1>Scissors</h1></div>').addClass('scissors border').css('background-color', 'white');
            var intervalId;
            var number = 4;
            intervalId = setInterval(decrement, 1000);
        }
        else if (player1.ready)
            console.log('Waiting for Player 2!');
        else if (player2.ready)
            console.log('Waiting for Player 1!');
        else
            console.log('Press Ready!');
    }
    // counts down from 4 to 0, then triggers endRound
    function decrement() {
        number--;
        $("#ready").html("<h2>" + number + "</h2>");
        if (number === 0) {
            clearInterval(intervalId);
            console.log(player1.choice, player2.choice);
            endRound(player1.choice, player2.choice);
            number = 4;
        }
    }
}
// RPS game logic - determines winner, sends to either tie or win function
function endRound(p1, p2) {
    $('#rock').empty();
    $('#paper').empty();
    $('#scissors').empty();
    str = p1 + p2;
    switch (str) {
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            tie();
            break;
        case 'rockscissors':
        case 'scissorspaper':
        case 'paperrock':
            win(player1);
            break;
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
            win(player2);
            break;
    }
}
// displays round results if a player won 
function win(player) {
    $('#info').append(`${player1.name} chose ${player1.choice}. `);
    $('#info').append(`${player2.name} chose ${player2.choice}. `);
    player.wins++;
    Player1.set(player1);
    Player2.set(player2);
    $('#info').append(`<h1>${player.name} wins</h1>`);
    $('#info').append(`${player1.name}: ${player1.wins} |`);
    $('#info').append(` ${player2.name}: ${player2.wins}`);
    $('#ready').html('<div><h1>READY</h1><div>').addClass('ready btn m-5').css('background-color', 'white');;
}
// displays round results if the players tied 
function tie() {
    $('#info').append(`${player1.name} chose ${player1.choice}. `);
    $('#info').append(`${player2.name} chose ${player2.choice}. `);
    $('#info').append('<h1>Tie!</h1>');
    $('#ready').html('<div><h1>READY</h1><div>').addClass('ready btn m-5').css('background-color', 'white');;
}
