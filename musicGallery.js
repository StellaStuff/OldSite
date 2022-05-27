const songTemplate = `
<div class="box">
    <div class='song'> 
        <img src='ALBUMSRC' class='albumArt'>
        <h2>SONGTITLE</h2>
        <p>SONGDISCRIPTION</p>
        <div class="audioPlayer">
            <audio id="SONGID">
                <source src="SONGSRC" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <input type="button" class="playPauseButton" id="SONGID-playPause" onclick="musicPlayer.playPause()" value="▶️">
            <div class="progressbar">
                <input type="range" class="seeker" id="SONGID-seeker" oninput="musicPlayer.seek()" value="0">
                <p class="time" id="SONGID-time">I am broken!</p>
            </div>
        </div>
    </div>
</div>`;


setInterval(tick, 1000/20);

function tick() {
    //document.getElementsByClassName('songbox')[0].insertAdjacentHTML('beforeend', songTemplate);
}

function createBoxes() {
    for (var i = 0; i < playlist.length; i+=1) {
        var temp = songTemplate;
        temp = temp.replace(/ALBUMSRC/g,playlist[i].artsrc);
        temp = temp.replace(/SONGSRC/g,playlist[i].src);
        temp = temp.replace(/SONGTITLE/g,playlist[i].name);
        temp = temp.replace(/SONGDISCRIPTION/g,playlist[i].blerb);
        document.getElementsByClassName('songbox')[0].insertAdjacentHTML('beforeend', temp);
        parent.resizeIframe();
    }
}

let nowPlaying, playlist;

function takeData(NOWPLAYING, PLAYLIST) {
    nowPlaying = NOWPLAYING;
    playlist = PLAYLIST;
    console.log("successssssss");
    console.log(nowPlaying,playlist[0].artsrc);
    createBoxes();
}