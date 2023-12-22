const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      lives: document.querySelector("#lives"),
      github: document.querySelector(".github-icon"),
      linkedin: document.querySelector(".linkedin-logo")
    },
    values: {
      gameVelocity: 500,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
      initialLives: 3
    },
    actions: {
      timerId: setInterval(randomSquare,500),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  
  function goToLinkedin(){
    state.view.linkedin.addEventListener('click', function(){
      window.open('https://www.linkedin.com/in/eduarda-farias-2938b2235/', '_blank');
    });
  }  

  function goToGithub(){
    state.view.github.addEventListener('click', function(){
      window.open('https://github.com/EduardaFarias', '_blank');
    });
  }

  function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    if (state.values.curretTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert("Game Over! O seu resultado foi: " + state.values.result);
    }
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }else{
            state.values.initialLives--;
            state.view.lives.textContent = state.values.initialLives;
            if(state.values.initialLives === 0){
              alert("Você perdeu!");
              window.location.reload();
            }
        }
      });
    });
  }
  
  function initialize() {
    addListenerHitBox();
    goToGithub();
    goToLinkedin();
  }
  
  initialize();