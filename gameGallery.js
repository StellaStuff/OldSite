class GameThumbnail {
    constructor(id) {
        var temp = gameTemplate;
        this.id = id;
        temp = temp.replace(/THUMBNAILSRC/g,gameData[id].artsrc);
        temp = temp.replace(/ID/g,id);
        temp = temp.replace(/GAMETITLE/g,gameData[id].name);
        temp = temp.replace(/GAMEDISCRIPTION/g,gameData[id].blerb);
        
        document.getElementsByClassName('gamebox')[0].insertAdjacentHTML('beforeend', temp);

    }
}


const gameTemplate = `
<div class="box">
    <div class='game' id='gameID' onclick='parent.changePage("games",false,false,"GAMETITLE")')> 
        <img src='THUMBNAILSRC' class='thumbnail'>
        <h3>GAMETITLE</h3>
        <p>GAMEDISCRIPTION</p>
    </div>
</div>`;

var gameData, gameboxes = [];

preload(setup);

async function preload(callback) {
    temp = await fetch("assets/games/games.json").then(response => {return response.json();});
    
    gameData = [];
    let names = Object.keys(temp["games"]); //creates a temporary array of strings based on the names of the games
        for(var i = 0; i < names.length; i+=1) {
        gameData.push(temp["games"][names[i]]);
    }
    if (callback != undefined) callback();
}

function setup() {
    for (var i = 0; i < gameData.length; i+=1) {
        gameboxes[i] = new GameThumbnail(i);
    }
    parent.resizeIframe();
    if (window.innerWidth < window.innerHeight) {
        alert("WARNING: this part of the site is intended for desktop use. most of the games & demos *should* work on mobile, but may require a keyboard or a larger display to function properly");   
    }
}



