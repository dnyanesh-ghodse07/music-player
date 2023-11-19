const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music is
const songs = [

    {
        name: 'dg1',
        displayName: 'Stay Forever',
        artist: 'Ft. Yohanna Seifu',
    },
    {
        name: 'dg2',
        displayName: "That's-Life",
        artist: 'Johny Grimes',
    },
    {
        name: 'dg3',
        displayName: 'Ehrling',
        artist: 'Groove',
    },
    {
        name: 'dg4',
        displayName: "Luke Bergs",
        artist: 'Aurora',
    },
    {
        name: 'dg5',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jocinto Design',
    },
    {
        name: 'dg7',
        displayName: 'Mee Baburao Boltoy',
        artist: 'Santosh Ghadge',
    }
    
];



//check if audio playing
let isPlaying = false;

//play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}
//pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

//play or pause event listener
playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    
}

// current Song
let songIndex = 0;


//Prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//Next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}



//onload- select First Song
loadSong(songs[songIndex]);

//Update Progress Bar and time

function updateProgressBar(e){
    if(isPlaying){
        const { duration, currentTime} = e.srcElement;
        console.log(duration, currentTime);
        //update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);
    // Delay switching duration Element to avoid NaN errors
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    // calculate display duration for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

//set progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clikx = e.offsetX;
    const { duration} = music;
    music.currentTime = (clikx / width) * duration;


}

//volume




prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
