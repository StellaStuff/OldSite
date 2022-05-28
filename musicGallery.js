class PseudoPlayer {
    constructor(id) {
        var temp = songTemplate;
        this.id = id;
        this.paused = true;
        this.duration = playlist[id].duration;
        this.currentTime = 0;
        temp = temp.replace(/ALBUMSRC/g,playlist[id].artsrc);
        temp = temp.replace(/SONGSRC/g,playlist[id].src);
        temp = temp.replace(/SONGID/g,id);
        temp = temp.replace(/SONGTITLE/g,playlist[id].name);
        temp = temp.replace(/SONGDISCRIPTION/g,playlist[id].blerb);
        temp = temp.replace(/DURATIONFANCY/g,(Math.floor(this.duration/60)).toString() + ":" + (Math.floor(this.duration%60)).toString().padStart(2,0));
        temp = temp.replace(/DURATION/g,this.duration);
        
        document.getElementsByClassName('songbox')[0].insertAdjacentHTML('beforeend', temp);
        parent.resizeIframe();
        
        this.playButton = document.getElementById(this.id + "-playPauseButton");//////grabbing all the things it needs
        this.time = document.getElementById(this.id + "-time");
        this.seeker = document.getElementById(this.id + "-seeker");
    }
    playPause() {
        if (this.paused) { //toggles the paused state
            this.play();
        } else {
            this.pause();
        }
    }
    play() {
        stopEverything();
        if (parent.musicPlayer.nowPlaying != this.id) {
            parent.musicPlayer.load(this.id);
            parent.musicPlayer.player.currentTime = this.currentTime;
        }
        parent.musicPlayer.play();
        this.update(); //sets the button to the pause icon
    }
    pause() {
        if (!parent.musicPlayer.player.paused) {
            parent.musicPlayer.pause();
        }
        this.update(); // sets the button to the play icon
    }
    update(time) {
        if (time != undefined) this.currentTime = time;
        
        if (parent.musicPlayer.player.paused) {
            this.paused = true;
            this.playButton.value = "▶️";
        } else {
            this.paused = false;
            this.playButton.value = "⏸";
        }
        
        ///generates the text saying how much time is remaining
        this.time.innerHTML = 
            (Math.floor(this.currentTime/60)).toString() + ":" + (Math.floor(this.currentTime%60)).toString().padStart(2,0) + " / " +
            (Math.floor(this.duration/60)).toString() + ":" + (Math.floor(this.duration%60)).toString().padStart(2,0);
        this.seeker.value = this.currentTime; ///sets the seeker slider to the right position
    }
    seek() {
        if (parent.musicPlayer.nowPlaying != this.id) {
            parent.musicPlayer.load(this.id);
        } else {
            parent.musicPlayer.player.currentTime = this.seeker.value; //actually sets the player position when you seek  
        }
    }
}


const songTemplate = `
<div class="box">
    <div class='song'> 
        <img src='ALBUMSRC' class='albumArt'>
        <h2>SONGTITLE</h2>
        <p>SONGDISCRIPTION</p>
        <div class="audioPlayer">
            <input type="button" class="playPauseButton" id="SONGID-playPauseButton" onclick="songboxes[SONGID].playPause()" value="▶️">
            <div class="progressbar">
                <input type="range" class="seeker" id="SONGID-seeker" oninput="songboxes[SONGID].seek()" value="0" max="DURATION">
                <p class="time" id="SONGID-time">0:00 / DURATIONFANCY</p>
            </div>
        </div>
    </div>
</div>`;
var playlist = parent.musicPlayer.playlist, songboxes = Object;

preload(setup());

function preload(callback) {
    if (callback != undefined) callback();
}

function setup() {
    for (var i = 0; i < playlist.length; i+=1) {
        songboxes[i] = new PseudoPlayer(i);
    }
}

function stopEverything() {
    for (var i = 0; i < playlist.length; i+=1) {
        songboxes[i].pause();
        console.log("test");
    }
}



