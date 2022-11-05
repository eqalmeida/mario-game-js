window.addEventListener("load", () => {
  const mario = document.querySelector(".mario");
  const pipe = document.querySelector(".pipe");
  const vidas = document.getElementById("vidas");

  pipe.classList.add("pipe-run");

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
    if (
      pipe.offsetLeft < mario.offsetLeft + 60 &&
      pipe.offsetLeft + pipe.offsetWidth > mario.offsetLeft &&
      marioBottom > pipe.offsetTop
    ) {
      pipe.classList.remove("pipe-run");
      mario.src = "./game-over.png";

      setTimeout(() => {
        pipe.classList.add("pipe-run");
        mario.src = "./mario-gif.gif";
      }, 2000);

      let numVidas = +vidas.innerText;
      if (numVidas > 0) {
        numVidas--;
        vidas.innerText = numVidas;
      }
    }
  };

  setInterval(loop, 10);
});
