// global variables 
let gameOver = false;
let numOfAttacks = 0;

let selectedCharacter = null;
let enemies = [];
let defender = null;
let bands = [
    {
        id: "lz",
        name: "Led Zepplin",
        imgSrc: "http://artist2.cdn107.com/a95/a95aade3e0a87d7bca89b86855aa9395_lg.png",
        hp: 168,
        attack: 9,
        counter: 17,
        attackIncrease: 5
    },
    {
        id: "nv",
        name: "Nirvana",
        imgSrc: "https://tonedeaf.thebrag.com/wp-content/uploads/2017/08/nirvana.jpg",
        hp: 187,
        attack: 6,
        counter: 15,
        attackIncrease: 20
    },
    {
        id: "rhcp",
        name: "Red Hot Chilli Peppers",
        imgSrc: "https://junkee.com/wp-content/uploads/2019/02/330e12cfdf1ece78f3a80437944efea81.jpg",
        hp: 183,
        attack: 8,
        counter: 15,
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

function createUnselectedBands() {
    //loop through array to pick each band and append them to div
    for (let i = 0; i < bands.length; i++) {
        let band = bands[i];
        appendCharacter(band, "unselectedBands");
    }
}
// this funtion will create the elements that will go into the div
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
    if(defender){
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

$("#attack").on("click", function() {

    let characterAttack= selectedCharacter.attack + (numOfAttacks * selectedCharacter.attackIncrease);
    numOfAttacks++;
    let enemyAttack= defender.counter;
    
    selectedCharacter.hp -= enemyAttack; 
    defender.hp -= characterAttack;
   let string= selectedCharacter.name+ " hit for "+ characterAttack + " and " + defender.name + " countered with " + enemyAttack;
    $("#update").html(string)


    console.log(selectedCharacter, defender);
    $("#selectedCharacter").empty();
    $("#defender").empty();
    appendCharacter(selectedCharacter, "selectedCharacter");
    appendCharacter(defender, "defender");

    if(defender.hp > 0){
        return}

        else{
    defender.hp= 0;
    $("#defender").empty();
    appendCharacter(defender, "defender");
    $("#attack").css("display","none")
    $("#update").html(string + " Please pick a new enemy")
        

    if(selectedCharacter.hp>0){
        
    }
    else {
        selectedCharacter.hp=0;
        $("#selectedCharacter").empty();
        appendCharacter(selectedCharacter, "selectedCharacter");
    }
    
    }


});



// pickCharacter();
// enemyTeam();




// function pickCharacter() {

//     }



// function enemyTeam() {
//         //if a villian is clicked 
//         $(".enemy-attack").on("click", function () {
//             // move villian to fight section
//             // if there is a band in fight section stop this code
//             // band selected will retrieve info from object (maybe create a function that does this and add it here)
//             // if fight section is empty reactivate this code 
//             //       $(this).attr("class", "fight-section");

//             //     let detachBand= $(this).detach() ;
//             //   detachBand.appendTo("#fight")
//         })
//     }


// function Gameover() {
//         // if hero hp = 0 game over;
//         //if villian hp = 0, enemyTeam() will run again
//         //if all villians lose game is over
//         // show reset button

//         //hero attacks with attach
//         // villian attacks with counter
//     }



