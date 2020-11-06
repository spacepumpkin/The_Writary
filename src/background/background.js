const BACKGROUNDS = [
  // "retrosupply.jpg",
  // "griffin-wooldridge-original.jpg",
  "letizia-agosta.jpg",
  "sven-mieke.jpg",
  "aditya-vyas.jpg",
  // "alex-loup-1.jpg",
  // "alex-loup-2.jpg",
  "alice-donovan-rouse.jpg",
  "alyssa-strohmann.jpg",
]
async function getImages(imageFolderPath) {
  // * Async request to get arr of all image paths from images folder;

  let imagePaths = [];
  let xhr = new XMLHttpRequest();
  // xhr.open("GET", "../../images/other_backgrounds", true);
  xhr.open("GET", `${imageFolderPath}`, true);
  xhr.responseType = 'document';
  xhr.onload = () => {
    if (xhr.status === 200) {
      let elements = xhr.response.getElementsByTagName("a");
      // console.log("response: ",elements);
      for (x of elements) {
        if (x.href.match(/\.(jpe?g|png)$/)) {
          imagePaths.push(x.href);
        }
      };
      console.log("imagePaths: ", imagePaths); // returns arr of all paths
      // return new Promise(res => imagePaths)
      return imagePaths; // ! don't know why this doesn't work?
    }
    else {
      alert('Request failed. Returned status of ' + xhr.status);
      return [];
    }
  }
  xhr.send()
}

function Background(elmId) {
  // * Set up Canvas
  const canvasEl = document.getElementById(elmId);
  const ctx = canvasEl.getContext("2d");
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;

  // * Set Random Background Image w/Canvas
  // Pulls arr of stored previous indices from sessionStorage; if none exists, initiate as []
  let prevBackgroundIndices = JSON.parse(window.sessionStorage.getItem("prevBackgroundIndices"));
  prevBackgroundIndices = (prevBackgroundIndices !== undefined && prevBackgroundIndices !== null) ? prevBackgroundIndices : [];

  // Keep generating new index until it corresponds to a new image
  let bgImagePathIndex = Math.floor(Math.random() * BACKGROUNDS.length);
  while (prevBackgroundIndices.includes(bgImagePathIndex)) {
    if (prevBackgroundIndices.length >= BACKGROUNDS.length) {
      prevBackgroundIndices = [];
      window.sessionStorage.setItem("prevBackgroundIndices", JSON.stringify([]));
    }
    bgImagePathIndex = Math.floor(Math.random() * BACKGROUNDS.length);
  }

  // Add new image index to stored indices
  prevBackgroundIndices.push(bgImagePathIndex)
  window.sessionStorage.setItem("prevBackgroundIndices", JSON.stringify(prevBackgroundIndices));
  console.log("usedBackgroundIndicies: ", prevBackgroundIndices);

  // Create new image that leads to the background 
  let bgImagePath = BACKGROUNDS[bgImagePathIndex];
  let bgImage = new Image();
  bgImage.src = `../../images/other_backgrounds/${bgImagePath}`;
  bgImage.onload = drawBackground;

  function drawBackground() {
    // * Draws Monotone Background
    // ctx.fillStyle = "#97a4b1";
    // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    // * Draws Image + Adds Gradient
    ctx.drawImage(bgImage, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.filter = 'blur(2px) brightness(80%)';
    const gradient = ctx.createLinearGradient(canvasEl.width / 2, 0, canvasEl.width / 2, canvasEl.height);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.0)");
    gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.0)");
    gradient.addColorStop(1, "rgba(255, 241, 208, 1.0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }


  // * Dynamic Resizing of Background to Window Resizing
  window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    ctx.filter = 'blur(2px)';
    drawBackground();
  }
  let x = [];
  // ! Why does this not work?
  (async function () {
    try {
      console.log( getImages("../../images/other_backgrounds").then((res) => console.log(res)));
      // console.log("x: ", x)
    } catch(err) {
      console.log(err);
    }

    // .then(function(res) {
    //   let bgImagePathArray = res;
    //   console.log("bgImagePathArray: ", bgImagePathArray);
    //   // let bgImagePath = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    //   // let bgImagePath = bgImagePathArray[Math.floor(Math.random() * bgImagePathArray.length)];
    //   // bgImage.src = `../../images/other_backgrounds/${bgImagePath}`;
    //   // bgImage.src = bgImagePath;
    //   console.log("result: ", x)
    // })
    // .catch(function(err) {
    //   console.log("error: ", err);
    // });
  })();

  resizeCanvas();
}

module.exports = Background;