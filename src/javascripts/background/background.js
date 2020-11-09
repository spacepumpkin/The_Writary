// Hardcoded background image file names if getImages fails
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
// Set background folder location for XHR request
const backgroundFolderPath = "../../images/backgrounds/other_backgrounds";

// Main Script for Generating Background
function Background(elmId) {

  // * Set up Canvas
  const canvasEl = document.getElementById(elmId);
  const ctx = canvasEl.getContext("2d");
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;

  // * Initialize bgImage and myImages arr of all images from background image folder
  let bgImage = new Image();
  let myImages = [];

  // * Pick background then draw on canvas
  // Closes around bgImage, called by getImages
  function pickRandomBackground(imagesArr) {
    // If sessionStorage already has prevBackgroundIndices, use that
    let prevBackgroundIndices = JSON.parse(window.sessionStorage.getItem("prevBackgroundIndices"));
    prevBackgroundIndices = (prevBackgroundIndices !== undefined && prevBackgroundIndices !== null) ? prevBackgroundIndices : [];

    let bgImagePathIndex = Math.floor(Math.random() * imagesArr.length);
    console.log("current bgImagePathIndex: ", bgImagePathIndex);
    while (prevBackgroundIndices.includes(bgImagePathIndex)) {
      if (prevBackgroundIndices.length >= imagesArr.length) {
        prevBackgroundIndices = [];
        window.sessionStorage.setItem("prevBackgroundIndices", JSON.stringify([]));
      }
      bgImagePathIndex = Math.floor(Math.random() * imagesArr.length);
    }

    // Remembers background indices that've been used already
    prevBackgroundIndices.push(bgImagePathIndex)
    window.sessionStorage.setItem("prevBackgroundIndices", JSON.stringify(prevBackgroundIndices));
    console.log("usedBackgroundIndicies: ", prevBackgroundIndices);

    // Set path for chosen image and draw on canvas
    let bgImagePath = imagesArr[bgImagePathIndex];
    bgImage.src = bgImagePath;
    bgImage.onload = drawBackground;
  }

  // Closes around bgImage, ctx, called by pickRandomBackgroun + resizeCanvas
  function drawBackground() {
    // Draws Monotone Background
    // ctx.fillStyle = "#97a4b1";
    // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    // Draws Image + Adds Gradient
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
  // Closes around canvasEl + ctx
  window.addEventListener('resize', resizeCanvas, false);
  
  function resizeCanvas() {
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    ctx.filter = 'blur(2px)';
    drawBackground();
  }
  
  // * Runs getImages to fill up myImages array with image file paths
  // Closes around myImages
  getImages(backgroundFolderPath).then(() => {
    // console.log("myImages: ", myImages);
  })

  // Closes around myImages
  async function getImages(imageFolderPath) {
    // Async request to get arr of all image paths from images folder;

    // let imagePaths = [];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${imageFolderPath}`, true);
    xhr.responseType = 'document';
    xhr.onload = () => {
      if (xhr.status === 200) {
        let elements = xhr.response.getElementsByTagName("a");
        // console.log("response: ",elements);
        for (x of elements) {
          if (x.href.match(/\.(jpe?g|png)$/)) {
            // imagePaths.push(x.href);
            myImages.push(x.href);
          }
        };
        pickRandomBackground(myImages)
        // console.log("myImages: ", myImages); // returns arr of all paths
        // return myImages; // ! don't know where this ends up
      }
      else {
        console.log('Background image request failed. Status ' + xhr.status);
        return [];
      }
    }
    xhr.send()
  }

  resizeCanvas();
}

module.exports = Background;


// ################################################################################
// ! Backup Code: 

// * Set Random Background Image w/Canvas *
// Pulls arr of stored previous indices from sessionStorage; if none exists, initiate as []
// let prevBackgroundIndices = JSON.parse(window.sessionStorage.getItem("prevBackgroundIndices"));
// prevBackgroundIndices = (prevBackgroundIndices !== undefined && prevBackgroundIndices !== null) ? prevBackgroundIndices : [];

// ** Keep generating new index until it corresponds to a new image
// let bgImagePathIndex = Math.floor(Math.random() * BACKGROUNDS.length);
// while (prevBackgroundIndices.includes(bgImagePathIndex)) {
//   if (prevBackgroundIndices.length >= BACKGROUNDS.length) {
//     prevBackgroundIndices = [];
//     window.sessionStorage.setItem("prevBackgroundIndices", JSON.stringify([]));
//   }
//   bgImagePathIndex = Math.floor(Math.random() * BACKGROUNDS.length);
// }

// ** Add new image index to stored indices
// prevBackgroundIndices.push(bgImagePathIndex)
// window.sessionStorage.setItem("prevBackgroundIndices", JSON.stringify(prevBackgroundIndices));
// console.log("usedBackgroundIndicies: ", prevBackgroundIndices);

// ** Create new image that leads to the background 
// let bgImagePath = BACKGROUNDS[bgImagePathIndex];
// let bgImage = new Image();
// bgImage.src = `../../images/other_backgrounds/${bgImagePath}`;
// bgImage.onload = drawBackground;


// ! Could not get async call to work with getImages
// (async () => {
//   try {
//     // await console.log("getImages return: ", getImages("../../images/other_backgrounds")); // await console.log(getImages("../../images/other_backgrounds"));
//     // await getImages("../../images/other_backgrounds")
//     // .then((res) => {
//     //   console.log("images: ", res);
//     // })
//     // console.log(await res);
//     let results;
//     await getImages("../../images/other_backgrounds", results);
//     console.log("results: ", results);
//   } catch(err) {
//     console.log(err);
//   }
// })();

// * Testing Async capability
// async function testAsync() {
//   return ("hello");
// };
// testAsync().then(res => console.log("test: ", res));