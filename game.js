window.addEventListener("load", () => {
  const mario = document.querySelector(".mario");
  const pipe = document.querySelector(".pipe");
  const vidas = document.getElementById("vidas");
  const pontosSpan = document.getElementById("pontos");
  const resetBtn = document.getElementById("reset-btn");
  const jumpBtn = document.getElementById("jump-btn");
  let pontos = 0;
  let pulando = false;
  let numVidas = 10;

  pipe.classList.add("pipe-run");
  vidas.innerText = numVidas;
  pontosSpan.innerText = pontos;
  resetBtn.style.display = "none";

  jumpBtn.addEventListener("touchstart", (evt) => {
    mario.classList.add("jump");
    setTimeout(() => mario.classList.remove("jump"), 500);
  });

  resetBtn.addEventListener("click", (ev) => {
    pontos = 0;
    pulando = false;
    numVidas = 10;
    resetBtn.style.display = "none";

    vidas.innerText = numVidas;
    pontosSpan.innerText = pontos;

    if (pipe.classList.contains("pipe-run")) {
      pipe.classList.remove("pipe-run");
    }

    pipe.classList.remove("pipe-run");
    setTimeout(() => pipe.classList.add("pipe-run"), 500);

    mario.src = "./mario-gif.gif";
  });

  mario.addEventListener("touchstart", (ev) => {
    mario.classList.add("jump");
    setTimeout(() => mario.classList.remove("jump"), 500);
  });

  document.addEventListener("keydown", (key) => {
    console.log(key);

    if (key.code === "Space") {
      mario.classList.add("jump");
      setTimeout(() => mario.classList.remove("jump"), 500);
    } else if (key.code === "KeyP") {
      if (pipe.classList.contains("pipe-run")) {
        pipe.classList.remove("pipe-run");
      } else {
        pipe.classList.add("pipe-run");
      }
    }
  });

  const loop = () => {
    // console.log(pipe.offsetLeft, mario.offsetLeft, mario.offsetWidth);
    const marioBottom = mario.offsetTop + mario.offsetHeight;
    const pipeLeft = pipe.offsetLeft;
    const pipeRight = pipeLeft + pipe.offsetWidth;
    const marioLeft = mario.offsetLeft;
    const marioRight = marioLeft + 60;
    if (pipeLeft < marioRight && pipeRight > marioLeft) {
      pulando = true;

      if (marioBottom > pipe.offsetTop) {
        pipe.classList.remove("pipe-run");
        pipe.style.right = "-80px";

        mario.src = "./game-over.png";

        if (numVidas > 0) {
          numVidas--;
          vidas.innerText = numVidas;
        }

        if (numVidas > 0) {
          setTimeout(() => {
            pipe.classList.add("pipe-run");
            mario.src = "./mario-gif.gif";
          }, 2000);
        } else {
          resetBtn.style.display = "block";
        }

        pulando = false;
      }
    } else {
      if (pulando && pipeRight < marioLeft && numVidas > 0) {
        pontos += 100;

        pontosSpan.innerText = pontos;
      }

      pulando = false;
    }
  };

  setInterval(loop, 10);
});
