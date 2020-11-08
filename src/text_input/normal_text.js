function TextInput (elmId) {
  // let FONTSIZE = "48px";
  // let FONTFAMILY = "serif"
  const textInput = document.getElementById(elmId);
  // textInput.innerText = "Type here to get started";
  // textInput.contentEditable = "true";

  const textInputTitle = document.getElementById(`${elmId}-title`);
  const textInputWrapper = document.getElementById(`${elmId}-wrapper`);

  // * Set initial font + position of paper for typewriter mode
  textInputWrapper.style.left = "0px";
  
  textInputWrapper.addEventListener('input', (e) => shiftPage(e));
  textInputWrapper.addEventListener('keydown', (e) => handleKeyDown(e));
  // textInput.addEventListener('input', (e) => shiftPage(e));
  // textInputTitle.addEventListener('input', (e) => shiftPage(e));
  // textInput.addEventListener('keydown', (e) => shiftPage(e));
  let fullFont = "48px serif"; 

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

  // * Handle Enter and Backspace
  function handleKeyDown (e) {
    // console.log("keydown target: ", e.target);
    // console.log("keydown parent: ", e.currentTarget);
    console.log("old left position: ", e.currentTarget.style.left);
    console.log("key: ", e.key);
    // console.log("event: ", e);
    // console.log(e.target.)
    textInputWrapper.style.transition = "all 0.1s";
    switch (e.key) {
      case "Enter":
        console.log("Enter pressed: ", true);
        e.currentTarget.style.left = "500px";
        console.log("new left position: ", e.currentTarget.style.left);
        // if (e.target.attr("id") == `${elmId}-title`) {
        //   e.currentTarget.style.left = "500px";
        // } else {
        //   e.currentTarget.style.left = "500px";
        // }
        break;
      case "Backspace":
        if (parseFloat(e.currentTarget.style.left.slice(0,-2)) >= 500) {
          e.currentTarget.style.left = "-500px";
        }
        let charWidth = getCharWidth("a", "48px PT Mono");
        e.currentTarget.style.left = `${parseFloat(e.currentTarget.style.left.slice(0, -2)) + charWidth}` + "px";
        console.log("new left position: ", e.currentTarget.style.left);
        break;
      default:
        break;
    }
  }

  // * Shifts page depending on key input
  function shiftPage(e) {
    // console.log(e.data);
    // let charWidth = Math.floor(getCharWidth(e.data, "serif"));
    let charWidth = getCharWidth(e.data, "48px PT Mono");
    // let charWidth = getCharWidth(e.data, `${fullFont.family}` + " " + "48px");
    // console.log(textInput.style.left.slice(0, -2));
    console.log("charWidth:", charWidth);
    // textInput.style.left = textInput.style.left.slice(0,-2).concat(`${charWidth}`,"px");
    // console.log(textInput.style.left.slice(0,-2).concat(`${charWidth}`,"px"));
    console.log("currentLeftOffset:", parseFloat(textInputWrapper.style.left.slice(0, -2)));
    // console.log("key: ", e.key);
    // if (e.data === null) {
    //   textInputWrapper.style.left = "0px";
    // } else 
    if (e.data !== undefined && e.data !== null) {
      textInputWrapper.style.left = `${parseFloat(textInputWrapper.style.left.slice(0,-2)) - charWidth}` + "px"; //,"px"));
    }
    // console.log("data null?: ", e.data === null)
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