BACKGROUNDS = [
  // "retrosupply.jpg",
  "griffin-wooldridge.jpg",
  "letizia-agosta.jpg",
  "sven-mieke.jpg",
  "aditya-vyas.jpg",
  "alex-loup-1.jpg",
  "alex-loup-2.jpg",
  "alice-donovan-rouse.jpg",
  "alyssa-strohmann.jpg",
]
function getImages(imageFolderPath) {
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
  const canvasEl = document.getElementById(elmId);
  const ctx = canvasEl.getContext("2d");

  // * Set Random Background Image w/Canvas
  let bgImage = new Image();
  let bgImagePath = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
  bgImage.src = `../../images/other_backgrounds/${bgImagePath}`;
  bgImage.onload = drawBackground;
  // let bgImagePath = bgImagePathArray[Math.floor(Math.random() * bgImagePathArray.length)];
  // bgImage.src = bgImagePath;

  // ! Why does this not work?
  async function getPaths() {
    let x = await getImages("../../images/other_backgrounds");
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
    console.log("x: ", x)
    return x;
  };

  function drawBackground() {
    // Draws Image + Adds Gradient
    ctx.drawImage(bgImage, 0, 0);

    ctx.globalCompositeOperation = "source-over";
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
    // * Monotone Background
    // ctx.fillStyle = "#97a4b1";
    // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    // * Draw Background once loaded
    // drawBackground();
    ctx.drawImage(bgImage, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const gradient = ctx.createLinearGradient(canvasEl.width / 2, 0, canvasEl.width / 2, canvasEl.height);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.0)");
    gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.0)");
    gradient.addColorStop(1, "rgba(255, 241, 208, 1.0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }
  resizeCanvas();
}

module.exports = Background;