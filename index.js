
/////////////classes & large functions////////////{
class MusicPlayer { //main music player for the header
    constructor(callback) {
        this.player = document.getElementById("header-player"); //////grabbing all the things it needs
        this.playButton = document.getElementById("header-playPauseButton");
        this.time = document.getElementById("header-time");
        this.seeker = document.getElementById("header-seeker");
        this.title = document.getElementById("header-title-bar");
        
        this.playlist = [];
        let temp = Object.keys(musicData["songs"]); //creates a temporary array of strings based on the names of the music
        for(var i = 0; i < temp.length; i+=1) {
            this.playlist.push(musicData["songs"][temp[i]])
        }
        this.nowPlaying = 0;
    }
    load(songId) {
        this.player.setAttribute("src",this.playlist[songId].src)
        this.title.innerHTML = this.playlist[songId].name;
        this.nowPlaying = songId;
    }
    
    play() {
        this.player.play();
        this.playButton.value = "⏸"; //sets the button to the pause icon
    }
    pause() {
        this.player.pause();
        this.playButton.value = "▶️"; // sets the button to the play icon
    }
    playPause() {
        if (this.player.paused) { //toggles the paused state
            this.play();
        } else {
            this.pause();
        }
    }
    update() {
        ///generates the text saying how much time is remaining
        this.time.innerHTML = 
            (Math.floor(this.player.currentTime/60)).toString() + ":" + (Math.floor(this.player.currentTime%60)).toString().padStart(2,0) + " / " +
            (Math.floor(this.player.duration/60)).toString() + ":" + (Math.floor(this.player.duration%60)).toString().padStart(2,0);
        this.seeker.value = this.player.currentTime; ///sets the seeker slider to the right position
        
        if (this.player.ended) {
            if (this.playlist[this.nowPlaying+1] != undefined) {
                this.load(this.nowPlaying + 1);
                this.play();
            } else {
                this.pause();
            }
        }
    }
    seek() {
        if (!this.seeker.initialized) { //"initializes" the seeker
            this.seeker.max = this.player.duration;
            this.seeker.initialized = true;
        }
        this.player.currentTime = this.seeker.value; //actually sets the player position when you seek
    }
    getPlaylist() {
        return this.playlist;   
    }
    getNowPlaying() {
        return this.nowPlaying;
    }
}

function changePage(Page, noPush, noRefresh) {
    tabs = document.getElementsByClassName("tabs");
    
    for(var i = 0; i < tabs.length; i+=1) {
        if (tabs[i].getAttribute("class") == "tabs active") {
            tabs[i].setAttribute("class","tabs");
        }
    }
    document.getElementById(Page).setAttribute("class","tabs active");
    
    if (!noPush) {
        history.pushState(Page, '', "?" + Page);
    }
    
    if (!noRefresh) {
        document.getElementsByTagName("iframe")[0].contentDocument.location.replace(Page + ".html");
    }
    
    if (!noRefresh && noPush) {
        history.replaceState(Page, '', "?" + Page);
    }
    
    //console.log(state);
    page = Page;
}

function resizeIframe() {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}

//////////end of classes & large functions////////}
preload(setup); ////pulls the script up by its bootstraps


var page = "home";
let musicData, gameData, musicPlayer, iframe;


async function preload(callback) {
    musicData = await fetch("assets/music/music.json").then(response => {return response.json();});
    //gameData = await fetch("assets/p5games/games.json").then(response => {return response.json();});
    musicPlayer = new MusicPlayer();
    
    
    iframe = document.getElementById("main-iframe");
    iframe.onload = function () {
        resizeIframe();
        if (page == "music") {
            iframe.contentWindow.takeData(musicPlayer.nowPlaying,musicPlayer.playlist);
        }
    }
    if (callback != undefined) callback();
}


function setup() {
    musicPlayer.load(0);
    setInterval(tick, 1000/20);
    if (window.location.search != "") changePage(window.location.search.slice(1));
}

function tick() {
    musicPlayer.update(); //runs the update function 20 times a second
}


addEventListener('popstate', event => {
    if (history.state != null && history.state != page) changePage(history.state,true,true);
    if (history.state == null) changePage("home",true);
});

