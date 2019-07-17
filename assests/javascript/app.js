// global variables 
let bands= ["Led Zepplin", "Nirvana", "RHCP", "Weezer"];
let hp = 0;
let attack = 0;
let counter= 0;
const gameOver= false;


//Bands hp, attack and counter
let bandStat= {
    "Led Zepplin" :{
        hp: parseInt($("#led-hp").text()),
        attack: 5,
        counter: 17,
    },

    "Nirvana" :{
        hp: parseInt($("#nirvana-hp").text()),
        attack: 10,
        counter: 8,
    },
    "RHCP": {
        hp: parseInt($("#rhcp-hp").text()),
        attack: 8,
        counter: 15,
    },
    "Weezer": {
        hp: parseInt($("#weezer-hp").text()),
        attack: 11,
        counter: 11,
    }
}
function hideStuff(){
        $(".pick-band").on("click", function(){
           $(this).attr("class", "flex");
          let detachBand= $(".pick-band").detach();
           detachBand.appendTo("#enemy-attack", "flex")
           
        })
        
    }
hideStuff()



    
