console.log
// Building my deck with Variables
// Create the four suits
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
// Assign the card values
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
// Creates an open array for the changing card variable, pairs up each var above
var deck = new Array ();

// Functions

function createDeck()
//function to produce a new deck
{   
    deck = new Array();
    for(var i = 0 ; i < values.length; i++)
{
    for(var x = 0; x < suits.length; x++)
    {
        //change the letters to be considered numbers in the array and assign facecard values
        var weight = parseInt(values[i]);
                if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                    weight = 10;
                if (values[i] == "A")
                    weight = 11;
                var card = { Value: values[i], Suit: suits[x], Weight: weight };
                deck.push(card);

    }
}    

}
// Shuffle Function - set to loop 1000 times to make sure it's mostly random
function shuffle()
{
    for (var i = 0; i < 1000; 1++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

// Players

var players = new Array();
function createPlayers(num)
{
    players = new Array();
    for(var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

function createPlayersUI()
{
    document.getElementById('players').innerHTML = '';
    for(var i = 0; i < players.length; i++)
    {
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}

// Beginning the game
function startBlackJack()
{
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById('status').style.display="none";
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}
// Dealing the cards
// one card to each player, pop will help select the card from the array above
//then the push will assign one card to each player
function dealHands()
{
    for (var i = 0; i < 2; i++)
    {
        for (var x = 0; x < players.length; x++)
    {
        var card = desk.pop();
        players[x].Hand.push(card);
        addCard(card, x);
        updatePoints();
    }
    }
    updateDeck();
}
// functions to put the card in the player's hand - research harder on this  
// -  the functions are confusing
function addCard( card, player)
{
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}
function getCardUI(card)
{
    var el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = card.Suit + ' '+ card.Value;
    return el;
}
// HIT ME FUNCTION - POPs card out of array and adds to player's cards
var currentPlayer = 0; 
function hitMe()
{
    var card = deck-pop();
    players[currentPlayer].Hand.push(card);
    addCard(card, currentPlayer);
    updatePoints();
    check();
}
//function to check if cards exceed 21
function check()
{
    if (players[currentPlayer].Points > 21)
    {
        document.getElementById('status').innerHTML= 'Player: ' + players[currentPlayer].ID + ' LOST';
    }
}

// HOLD/STAY FUNCTION

function stay()
    {
        if (currentPlayer != players.length-1){
            document.getElementById('player_' + currentPlayer).classList.remove('active');
            currentPlayer += 1;
            document.getElementById('player_' + currentPlayer).classList.add('active');
    }
        else {
            end();
        }
    }

function end()
{
    var winner = -1;
    var score = 0;

    for (var i = 0; i < players.length; i++)
    {
        if (players[i].Points > score && players[i].Points < 22)
        {
            winner = i;
        }
        score = players[i].Points;
    }
    document.getElementById('status').innerHTML = "Player " + players[winner].ID + " wins!"
    document.getElementById("status").style.display = "inline-block";
}
function check()
{
    if (players[currentPlayer].Points > 21)
    {
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
}

function updateDeck()
{
    document.getElementById('deckcount').innerHTML = deck.length;
}

window.addEventListener('load', function(){
    createDeck();
    shuffle();
    createPlayers(1);
});