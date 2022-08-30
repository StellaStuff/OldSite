
/////////////classes & large functions////////////{
class MusicPlayer { //main music player for the header
    constructor(callback) {
        this.player = document.getElementById("header-player"); //////grabbing all the things it needs
        this.playButton = document.getElementById("header-playPauseButton");
        this.time = document.getElementById("header-time");
        this.seeker = document.getElementById("header-seeker");
        this.title = document.getElementById("header-title-bar");
        this.volumeButton = document.getElementById("header-volumeButton");
        this.volumeSlider = document.getElementById("header-volume");
        this.volumeWindow = document.getElementById("header-volume-window");
        
        this.volumeWindowOpen = false;
        

        this.nowPlaying = 0;
    }
    load(songId) {
        this.player.setAttribute("src",playlist[songId].src)
        this.title.innerHTML = playlist[songId].name;
        this.nowPlaying = songId;
        if (this.seeker != undefined) this.seeker.max = playlist[songId].duration;
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
    next() {
        if(this.nowPlaying < playlist.length - 1) {
            this.load(this.nowPlaying + 1);   
            this.play();
            if(page == "music" && iframe.contentWindow.songboxes != undefined) {
                iframe.contentWindow.songboxes[this.nowPlaying - 1].playButton.value = "▶️";
            }
        }
    }
    back() {
        if(this.nowPlaying > 0) {
            this.load(this.nowPlaying - 1);   
            this.play();
            if(page == "music" && iframe.contentWindow.songboxes != undefined) {
                iframe.contentWindow.songboxes[this.nowPlaying + 1].playButton.value = "▶️";
            }
        }
    }
    stop() {
        this.pause();
        this.player.currentTime = 0;
        this.load(0);
    }
    muteUnmute() {
        if (this.oldvol == undefined) this.oldvol = 0.5;
        if (this.player.volume == 0) {
            this.player.volume = this.oldvol;
            this.volumeSlider.value = this.oldvol;
            this.volumeButton.value = "🔉";
        } else {
            this.oldvol = this.player.volume;
            this.volumeSlider.value = 0;
            this.player.volume = 0;
            this.volumeButton.value = "🔇";
        }
    }
    update() {
        ///generates the text saying how much time is remaining
        this.time.innerHTML = 
            (Math.floor(this.player.currentTime/60)).toString() + ":" + (Math.floor(this.player.currentTime%60)).toString().padStart(2,0) + " / " +
            (Math.floor(this.player.duration/60)).toString() + ":" + (Math.floor(this.player.duration%60)).toString().padStart(2,0);
        this.seeker.value = this.player.currentTime; ///sets the seeker slider to the right position
        
        if (this.player.ended) {
            this.next();
        }
        
        if(page == "music" && iframe.contentWindow.songboxes != undefined) {
            iframe.contentWindow.songboxes[this.nowPlaying].update(this.player.currentTime);
        }
    }
    seek() {
        if (!this.seeker.initialized) { //"initializes" the seeker
            this.seeker.max = this.player.duration;
            this.seeker.initialized = true;
        }
        this.player.currentTime = this.seeker.value; //actually sets the player position when you seek
        this.update(); //runs the update function which makes the sliders and time remaining update way faster, allowing the site to feel smooth while not wasting cpu time updating very fast
    }
    toggleVolume() {
        if (this.volumeWindowOpen) {
            this.volumeSlider.style.width = "0";
            this.volumeSlider.style.opacity = "0%";
            this.volumeSlider.style.pointerEvents = "none";
            this.volumeSlider.style.transform =  "translate(-2em,0)"
            this.volumeWindow.style.background = "#dd00";
            
            this.volumeWindowOpen = false;
        } else {
            this.volumeSlider.style.width = "5em";
            this.volumeSlider.style.opacity = "100%";
            this.volumeSlider.style.pointerEvents = "auto";
            this.volumeSlider.style.transform =  "translate(0,0)"
            this.volumeWindow.style.background = "#ddddddff";
            this.volumeWindowOpen = true;
        }
    }
    volume() {
        this.player.volume = this.volumeSlider.value;
        if (this.volumeSlider.value == 0) { 
            this.volumeButton.value = "🔇";                           
        } else {
            this.volumeButton.value = "🔉";
        }
        
        if (this.volumeSlider.value > 0.75) {
            this.volumeButton.value = "🔊";
        }
        
    }
    getPlaylist() {
        return playlist;   
    }
    getNowPlaying() {
        return this.nowPlaying;
    }
}

function changePage(Page, noPush, noRefresh, SubPage) {
    tabs = document.getElementsByClassName("tabs");

    
    for(var i = 0; i < tabs.length; i+=1) {
        if (tabs[i].getAttribute("class") == "tabs active") {
            tabs[i].setAttribute("class","tabs");
        }
    }
    document.getElementById(Page).setAttribute("class","tabs active");
    
    if (SubPage != undefined) {
        if (!noPush) {
            history.pushState(Page, '', "?" + Page + "&" + SubPage);
        }
        if (!noRefresh && noPush) {
            history.replaceState(Page, '', "?" + Page + "&" + SubPage);
        }
        if (!noRefresh) {
            document.getElementsByTagName("iframe")[0].contentDocument.location.replace("assets/" + Page + "/" + SubPage + "/" + "index.html");
        }
    } else {
        if (!noPush) {
            history.pushState(Page, '', "?" + Page);
        }
        if (!noRefresh && noPush) {
            history.replaceState(Page, '', "?" + Page);
        }
        if (!noRefresh) {
            document.getElementsByTagName("iframe")[0].contentDocument.location.replace(Page + ".html");
        }
    }
    
    
    
    
    subpage = SubPage;
    page = Page;
}

function resizeIframe() {
    if (iframe.contentWindow.document.body != undefined) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
}

//////////end of classes & large functions////////}
Mpreload(Msetup); ////pulls the script up by its bootstraps


var page = "home";
var musicData, playlist, gameData, musicPlayer, iframe;


async function Mpreload(callback) {
    temp = await fetch("assets/music/music.json").then(response => {return response.json();});
    
    playlist = [];
    let names = Object.keys(temp["songs"]); //creates a temporary array of strings based on the names of the music
        for(var i = 0; i < names.length; i+=1) {
        playlist.push(temp["songs"][names[i]])
    }
    
    musicPlayer = new MusicPlayer();
    
    
    iframe = document.getElementById("main-iframe");
    //iframe.document.onmousemove = function(e){console.log("mouse location:", e.clientX, e.clientY)}

    if (callback != undefined) callback();
}


function Msetup() {
    musicPlayer.load(0);
    setInterval(Mtick, 1000/2);
    if (window.location.search != "") {
        var temp = window.location.search.split("&");
        
        if (temp.length > 1) {
            changePage(temp[0].slice(1),false,false,temp[1]);
        } else {
            changePage(temp[0].slice(1));
        }
    }
}

function Mtick() {
    musicPlayer.update(); //runs the update function every tick
    resizeIframe();
}


addEventListener('popstate', event => {
    if (history.state != null && history.state != page) changePage(history.state,true,true);
    if (history.state == null) changePage("home",true);
});

