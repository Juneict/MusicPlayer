const playListContainerTag = document.getElementsByClassName("playListContainer")[0];
const audioTag  = document.getElementsByClassName("audioTag")[0];
const tracks  = [
    { trackId:"music/track1.mp3",title :"December Nya - Lin Lat"},
    { trackId:"music/track2.mp3",title:"Tsaw Ra Ai Tsaw Hkrup Sai - Ann Naw"},
    { trackId:"music/track3.mp3",title:"Lan Mha Gyee Yey Bey - Wine Suu Khine Thein"},
    { trackId:"music/track4.mp3",title:"Yee Zar Sar - Sai Sai Kham Hlaing"},
];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag  = document.getElementsByClassName("pauseButton")[0];
const nextButtonTag  = document.getElementsByClassName("nextButton")[0];
const previousButtonTag  = document.getElementsByClassName("previousButton")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag = document.getElementById('currentProgress');

for(let i=0;i<tracks.length;i++){
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click",()=>{
        currentPlayingIndex = i;
        playSong();
    })
    trackTag.classList.add("trackItem");
    const title = (i+1).toString() + "." +tracks[i].title;
    trackTag.textContent = title;
    playListContainerTag.append(trackTag);
}
let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata",()=>{
    duration = Math.floor(audioTag.duration);
    durationText = createMinutesAndSecondText(duration) ;
})
audioTag.addEventListener("timeupdate",()=>{
    const currentTime =Math.floor(audioTag.currentTime);
    const currentTimeText =createMinutesAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText+" / "+durationText;
    currentAndTotalTimeTag.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress(currentTime);
});
const updateCurrentProgress = (currentTime) =>{
   const currentProgressWidth = (500/duration)*currentTime;
   currentProgressTag.style.width = currentProgressWidth.toString()+"px";
}   

const createMinutesAndSecondText = (totalSecond)=>{
    const minutes = Math.floor(totalSecond/60);
    const seconds = totalSecond%60;
    const minutesText  = minutes<10 ? "0"+minutes.toString() : minutes;
    const secondsText  = seconds<10 ? "0"+seconds.toString() : seconds;
    return minutesText + ":" +secondsText;
}
let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click",()=>{
    const CurrentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if(CurrentTime === 0){
       playSong();
    }else{
        audioTag.play();
        updatePlayAndPauseButton();
    }
  
});
pauseButtonTag.addEventListener("click",()=>{
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
})
const updatePlayAndPauseButton = ()=>{
    if(isPlaying){
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }else{
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}
previousButtonTag.addEventListener("click",()=>{
    if(currentPlayingIndex === 0){
        return;
    }
    currentPlayingIndex -=1;
    playSong();
})
nextButtonTag.addEventListener("click",()=>{
    if(currentPlayingIndex === tracks.length-1){
        return;
    }
    currentPlayingIndex +=1;
    playSong();
})
const playSong = ()=>{
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();

}