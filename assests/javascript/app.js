// global variables 
let gameOver = false;
let numOfAttacks = 0;

let selectedCharacter = null;
let enemies = [];
let defender = null;
const allBands = [
    {
        id: "lz",
        name: "Led Zepplin",
        imgSrc: "http://artist2.cdn107.com/a95/a95aade3e0a87d7bca89b86855aa9395_lg.png",
        hp: 168,
        attack: 9,
        counter: 25,
        attackIncrease: 5
    },
    {
        id: "nv",
        name: "Nirvana",
        imgSrc: "https://tonedeaf.thebrag.com/wp-content/uploads/2017/08/nirvana.jpg",
        hp: 187,
        attack: 19,
        counter: 15,
        attackIncrease: 10
    },
    {
        id: "rhcp",
        name: "Red Hot Chilli Peppers",
        imgSrc: "https://junkee.com/wp-content/uploads/2019/02/330e12cfdf1ece78f3a80437944efea81.jpg",
        hp: 183,
        attack: 8,
        counter: 30,
        attackIncrease: 15
    },
    {
        id: "wz",
        name: "Weezer",
        imgSrc: "https://beardedgentlemenmusic.com/wp-content/uploads/2016/04/Weezer-are-dorks.jpg",
        hp: 192,
        attack: 13,
        counter: 23,
        attackIncrease: 11
    }
];
let bands = $.extend(true, [], allBands); //deep copy

function createUnselectedBands() {
    //loop through array to append each band 
    for (let i = 0; i < bands.length; i++) {
        let band = bands[i];
        appendCharacter(band, "unselectedBands");
    }
}
// this funtion append a character to a specific div
function appendCharacter(band, parentId) {
    let bandElement = "<div class='pick-band' id='" + band.id + "'>";
    bandElement += "<p>" + band.name + "</p>";
    bandElement += "<img src='" + band.imgSrc + "'>";
    bandElement += "<p class='hp'>" + band.hp + "</p>";
    bandElement += "</div>";
    $("#" + parentId).append(bandElement);
}

createUnselectedBands();

//This will save the selected band to the original div and move the rest to the enemies div
$("#unselectedBands").on("click", ".pick-band", function () {
    let bandElement = $(this)[0];
    let bandId = bandElement.id;

    for (let i = 0; i < bands.length; i++) {
        let band = bands[i];
        if (band.id === bandId) {
            selectedCharacter = band;
            appendCharacter(selectedCharacter, "selectedCharacter");
        } else {
            enemies.push(band);
            appendCharacter(band, "enemies");
        }
    }
    $("#unselectedBands").empty();
});

//this will move the selected enemy to the defender div
$("#enemies").on("click", ".pick-band", function () {
    //to make sure there is one defender at a time 
    if (defender) {
        return;
    }
    let bandElement = $(this)[0];
    let bandId = bandElement.id;

    $("#enemies").empty();
    let tempEnemies = [];
    for (let i = 0; i < enemies.length; i++) {
        let band = enemies[i];
        if (band.id === bandId) {
            defender = band;
            appendCharacter(defender, "defender");
        } else {
            tempEnemies.push(band);
            appendCharacter(band, "enemies");
        }
    }
    enemies = tempEnemies;
});

// this will activate the attack button 
$("#attack").on("click", function () {
    if(!selectedCharacter || !defender || selectedCharacter.hp === 0 || defender.hp === 0){
        return;
    }
    let characterAttack = selectedCharacter.attack + (numOfAttacks * selectedCharacter.attackIncrease);
    numOfAttacks++;
    let enemyAttack = defender.counter;

    selectedCharacter.hp -= enemyAttack;
    defender.hp -= characterAttack;
    let str = selectedCharacter.name + " dealt " + characterAttack + " damage and " + defender.name + " countered with " + enemyAttack;
    $("#update").text(str);

    updateGameState();
});

function updateGameState() {
    if (selectedCharacter.hp <= 0 && defender.hp <= 0) { //this is a tie
        $("#update").text("Its a tie!");
        $(".reset").removeClass("no-display");
        $("#defender").empty();
        defender.hp=0;
        selectedCharacter.hp = 0;
        appendCharacter(defender, "defender");
    } else if (selectedCharacter.hp <= 0) { //hero lost
        selectedCharacter.hp = 0;
        gameOver = true;
        $("#defender").empty();
        appendCharacter(defender, "defender");
        $("#attack").css("display", "none");
        $("#update").text("You lost! Click restart to play again!");
        $(".reset").removeClass("no-display");
    } else if (defender.hp <= 0) { //enemy lost
        $("#defender").empty();
        defender = null;
        if (enemies.length === 0) {
            $("#update").text(selectedCharacter.name + " are the winners!");
            $(".reset").removeClass("no-display");
        }
    } else { //both take damage
        $("#defender").empty();
        appendCharacter(defender, "defender");
    }

    $("#selectedCharacter").empty();
    appendCharacter(selectedCharacter, "selectedCharacter");
}

$(".reset").on("click", function () {
    restart();
});

function restart() {
    $("#unselectedBands").empty();
    gameOver = false;
    numOfAttacks = 0;
    selectedCharacter = null;
    enemies = [];
    defender = null;
    $("#attack").css("display","flex");
    $(".reset").addClass("no-display");
    bands =  $.extend(true, [], allBands);
    $("#enemies").empty();
    $("#selectedCharacter").empty();
    $("#defender").empty();
    $("#update").empty();
    createUnselectedBands();
}