const greet = document.querySelector(".greet");
const progress = document.querySelector("#progress");
const song = document.querySelector("#song");
const ctrlIcon = document.querySelector("#ctrl");
const backward = document.querySelectorAll(".controls div")[0];
const playPause = document.querySelectorAll(".controls div")[1];
const forward = document.querySelectorAll(".controls div")[2];
const currTime = document.querySelector(".currTime");
const duration = document.querySelector(".duration");
const songImg = document.querySelector(".song-img");

let timer = (element, time) => {
  let min = time / 60;
  let sec = time % 60;
  min = parseInt(min);
  sec = parseInt(sec);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  element.textContent = min + ":" + sec;
};

let myTime = () => {
  let time = new Date();
  let hr = time.getHours();

  if (hr >= 5 && hr < 12) {
    greet.textContent = "Good Morning";
  } else if (hr >= 12 && hr <= 17) {
    greet.textContent = "Good Afternoon";
  } else if (hr > 17 && hr <= 22) {
    greet.textContent = "Good Evening";
  } else {
    greet.textContent = "Good Night";
  }
};

myTime();

song.onloadedmetadata = () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
  setInterval(() => {
    timer(currTime, song.currentTime);
  }, 500);
  timer(duration, song.duration);
};

playPause.addEventListener("click", () => {
  if (ctrlIcon.classList.contains("fa-play")) {
    song.play();
    ctrlIcon.classList.toggle("fa-play");
    ctrlIcon.classList.toggle("fa-pause");
    songImg.classList.toggle("spin");
  } else {
    song.pause();
    ctrlIcon.classList.toggle("fa-play");
    ctrlIcon.classList.toggle("fa-pause");
    songImg.classList.toggle("spin");
  }
});

progress.addEventListener("change", () => {
  song.currentTime = progress.value;
});

if (ctrlIcon.classList.contains("fa-play")) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 1000);
}

song.onended = () => {
  ctrlIcon.classList.toggle("fa-play");
  ctrlIcon.classList.toggle("fa-pause");
  songImg.classList.toggle("spin");
};

backward.addEventListener("click", () => {
  progress.value = 0;
  song.currentTime = progress.value;
});

forward.addEventListener("click", () => {
  song.currentTime += 5;
  progress.value = song.currentTime;
});
