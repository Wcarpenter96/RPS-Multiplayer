
// Your web app's Firebase configuration
var firebaseConfig = {
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

var database = firebase.database();

var player = 0;
var arr = [];

var player1 = {
    choice: 'r',
    enabled: false,
    name: 'firstName',
    wins: 0,
}

var player2 = {
    choice: 'r',
    enabled: false,
    name: 'firstName',
    wins: 0,
}

let Player1 = database.ref('users/' + 'Player1');
let Player2 = database.ref('users/' + 'Player2');

$(document).on("click", "#player1Login", function () {
    player = 1;
    player1.enabled = true;
    player1.name = $("#name-input").val();
    Player1.set(player1);
    localStorage.setItem("player", 1);

});
$(document).on("click", "#player2Login", function () {
    player = 2;
    player2.enabled = true;
    player2.name = $("#name-input").val();
    Player2.set(player2);
    localStorage.setItem("player", 2);
});
$(document).on("click", "#player1Logout", function () {
    player = 0;
    player1.enabled = false;
    player1.name = "firstName";
    player1.wins = 0;
    Player1.set(player1);
    localStorage.setItem("player", 0);
});
$(document).on("click", "#player2Logout", function () {
    player = 0;
    player2.enabled = false;
    player2.name = "firstName";
    player2.wins = 0;
    Player2.set(player2);
    localStorage.setItem("player", 0);
});

$(document).on("click", "#play", function () {
    if (player1.enabled && player2.enabled) {
        console.log('Ready to Play!');
    } else if (player1.enabled) {
        console.log('Player 2 Login Required');
    } else if (player2.enabled) {
        console.log('Player 1 Login Required');
    } else {
        console.log('Please log in to Play');
    }
});


var ref = firebase.database().ref("users");
ref.on('value', function (snapshot) {
    var p1Enabled = snapshot.child("Player1").child("enabled").val();
    player1.enabled = p1Enabled;
    if (p1Enabled) {
        $("#player1Login").prop("enabled", false);
        $("#player1Logout").prop("enabled", true);
        console.log("Player1 login disabled, player1 logout enabled");
    } else {
        $("#player1Login").prop("enabled", true);
        $("#player1Logout").prop("enabled", false);
        console.log("Player1 login enabled, player1 logout disabled");
    }
});

var ref = firebase.database().ref("users");
ref.on('value', function (snapshot) {
    var p2Enabled = snapshot.child("Player2").child("enabled").val();
    player2.enabled = p2Enabled;
    if (p2Enabled) {
        $("#player2Login").prop("enabled", false);
        $("#player2Logout").prop("enabled", true);
        console.log("Player2 login disabled, player2 logout enabled");
    } else {
        $("#player2Login").prop("enabled", true);
        $("#player2Logout").prop("enabled", false);
        console.log("Player2 login enabled, player2 logout disabled");
    }
});

// window.onunload = function (e) {
//     if (localStorage.getItem("player") === 1){
//         player1.enabled = false;
//         Player1.set(player1);
//     }else{
//         player2.enabled = false;
//         Player2.set(player2);
//     }
// }   


function round(arr) {
    str = arr.join("");
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
    console.log(`${player.name} has won ${player.wins} times!`);
}
function tie() {
    console.log('Tie!');
}


