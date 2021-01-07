function TextInput(elmId) {
  // let FONTSIZE = "48px";
  // let FONTFAMILY = "serif"
  const textInput = document.getElementById(elmId);
  // textInput.innerText = "Type here to get started";
  // textInput.contentEditable = "true";

  const textInputTitle = document.getElementById(`${elmId}-title`);
  const textInputWrapper = document.getElementById(`writing-space`);

  // * Set initial font + position of paper for typewriter mode
  textInputWrapper.style.left = "0px";

  textInputWrapper.addEventListener('input', (e) => shiftPage(e));
  textInputWrapper.addEventListener('keydown', (e) => handleKeyDown(e));
  const audioChar = document.getElementById("key-char");
  const audioSpacebar = document.getElementById("key-spacebar");
  const audioBackspace = document.getElementById("key-backspace");
  const audioEnter = document.getElementById("key-enter");

  // textInput.addEventListener('input', (e) => shiftPage(e));
  // textInputTitle.addEventListener('input', (e) => shiftPage(e));
  // textInput.addEventListener('keydown', (e) => shiftPage(e));
  let fullFont = "48px serif";

  // * Handle Enter and Backspace
  function handleKeyDown(evt) {
    console.log("old left position: ", evt.currentTarget.style.left);
    console.log("key: ", evt.key);
    console.log("code: ", evt.code);
    textInputWrapper.style.transition = "all 0.1s";
    switch (evt.code) {
      case "Enter":
        console.log("Enter pressed: ", true);
        evt.currentTarget.style.left = "500px";
        audioEnter.currentTime = 0;
        audioEnter.play();
        console.log("new left position: ", evt.currentTarget.style.left);
        if (evt.target.getAttribute("id") == `${elmId}-title`) {
          textInput.focus();
          // textInput.setSelectionRange(0, 1);
        }
        //   evt.currentTarget.style.left = "500px";
        // } else {
        //   evt.urrentTarget.style.left = "500px";
        // }
        break;
      case "Backspace":
        // if (parseFloat(evt.currentTarget.style.left.slice(0,-2)) >= 500) {
        //   evt.currentTarget.style.left = "-500px";
        // }
        audioBackspace.currentTime = 0;
        audioBackspace.play();
        let charWidth = getCharWidth("a", "48px PT Mono");
        evt.currentTarget.style.left = `${parseFloat(evt.currentTarget.style.left.slice(0, -2)) + charWidth}` + "px";
        console.log("new left position: ", evt.currentTarget.style.left);
        break;
      case "Space":
        audioSpacebar.currentTime = 0;
        audioSpacebar.play();
        break;
      default:
        if (evt.key !== "Meta") {
          audioChar.currentTime = 0;
          audioChar.play();
        }
        break;
    }
  }

  // * Shifts page depending on key input
  function shiftPage(evt) {
    // console.log(evt.data);
    // let charWidth = Math.floor(getCharWidth(evt.data, "serif"));
    let charWidth = getCharWidth(evt.data, "48px PT Mono");
    // let charWidth = getCharWidth(evt.data, `${fullFont.family}` + " " + "48px");
    // console.log(textInput.style.left.slice(0, -2));
    console.log("charWidth:", charWidth);
    // textInput.style.left = textInput.style.left.slice(0,-2).concat(`${charWidth}`,"px");
    // console.log(textInput.style.left.slice(0,-2).concat(`${charWidth}`,"px"));
    console.log("currentLeftOffset:", parseFloat(textInputWrapper.style.left.slice(0, -2)));
    // console.log("key: ", evt.key);
    // if (evt.data === null) {
    //   textInputWrapper.style.left = "0px";
    // } else 
    if (evt.data !== undefined && evt.data !== null) {
      textInputWrapper.style.left = `${parseFloat(textInputWrapper.style.left.slice(0, -2)) - charWidth}` + "px"; //,"px"));
    }
    // console.log("data null?: ", evt.data === null)
  }

  // Get pixel width of string with canvas
  function getCharWidth(char, font) {
    let tempCanvas = getCharWidth.tempCanvas || (getCharWidth.tempCanvas = document.createElement("canvas"));
    let ctx = tempCanvas.getContext("2d");
    ctx.font = font;
    console.log("char:", char);
    return ctx.measureText(char).width;
  }

  function centerCursor(elm, pageWidth, avgCharWidth) {
    // elm.focus();
    elm.setSelectionRange()
  }

  // ! Bolding Selection
  function boldTxt(elm) {
    // let selectStart = elm.selectionStart;
    // let selectEnd = elm.selectionEnd;

  }

}

// function addListeners(node, listeners, handler) {
//   if (!(listeners instanceof Array)) {
//     throw "addListeners: needs to be an array of event listeners"
//   }
//   listeners.forEach( function(evt) {
//     node.addEventListener(evt, handler, false)
//   })
// }

module.exports = TextInput;

// #############################################################################
// Unused code

// ! Do I need to load local font? Is the the JS alternative to @font-face?
// async function loadFonts() {
//   const font = new FontFace('PT Mono', 'url(../../dist/fonts/PT_Mono/PTMono-Regular.ttf)');
//   // wait for font to be loaded
//   await font.load().then(function() {
//     fullFont = font; 
//     // console.log("fullFont: ", fullFont.family)
//   });
//   // // add font to document
//   document.fonts.add(font);
//   // // enable font with CSS class
//   // document.body.classList.add('fonts-loaded');
// }
// loadFonts();