player1 = {
    name : 'Player 1',
    wins : 0,
    choice : 's'
}

player2 = {
    name : 'Player 2',
    wins : 0,
    choice : 'r'
}

$("#submit").on("click", function(event) {
    round(player1.choice,player2.choice);
});


function round(p1, p2) {
    switch (p1 + p2) {
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
function win(player){
    console.log(`${player.name} is the winner!`);
    player.wins++;
    console.log(`${player.name} has won ${player.wins} times!`);
}
function tie(){
    console.log('Tie!');
}