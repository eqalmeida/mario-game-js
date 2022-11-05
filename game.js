window.addEventListener("load", () => {
  const mario = document.querySelector(".mario");
  const pipe = document.querySelector(".pipe");
  const vidas = document.getElementById("vidas");
  const pontosSpan = document.getElementById("pontos");
  let pontos = 0;
  let pulando = false;
  let numVidas = 0;

  pipe.classList.add("pipe-run");

  mario.addEventListener("ontouchstart", () => {
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
        mario.src = "./game-over.png";

        numVidas = +vidas.innerText;
        if (numVidas > 0) {
          numVidas--;
          vidas.innerText = numVidas;
        }

        if (numVidas > 0) {
          setTimeout(() => {
            pipe.classList.add("pipe-run");
            mario.src = "./mario-gif.gif";
          }, 2000);
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
