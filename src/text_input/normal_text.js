function TextInput (elmId) {
  const textInput = document.getElementById(elmId);
  // textInput.innerText = "Type here to get started";
  // textInput.contentEditable = "true";

  const textInputWrapper = document.getElementById(`${elmId}-wrapper`);
  

  textInput.addEventListener('input', (e) => shiftPage(e));
  // textInput.addEventListener('keydown', (e) => shiftPage(e));
  textInput.style.left = "0px";
  let fullFont = "48px serif"; 
  async function loadFonts() {
    const font = new FontFace('PT Mono', 'url(../../dist/fonts/PT_Mono/PTMono-Regular.ttf)');
    // wait for font to be loaded
    await font.load().then(function() {
      fullFont = font; 
      console.log("fullFont: ", fullFont)
    });
    // // add font to document
    // document.fonts.add(font);
    // // enable font with CSS class
    // document.body.classList.add('fonts-loaded');
  }
  loadFonts();

  function shiftPage(e) {
    console.log(e.data);
    // let charWidth = Math.floor(getCharWidth(e.data, "serif"));
    let charWidth = getCharWidth(e.data, "48px serif");
    // let charWidth = getCharWidth(e.data, `${fullFont.family}` + " " + "48px");
    // console.log(textInput.style.left.slice(0, -2));
    console.log("charWidth:", charWidth);
    // textInput.style.left = textInput.style.left.slice(0,-2).concat(`${charWidth}`,"px");
    // console.log(textInput.style.left.slice(0,-2).concat(`${charWidth}`,"px"));
    console.log("currentLeftOffset:", parseFloat(textInput.style.left.slice(0, -2)));
    console.log("key: ", e.key);
    if (e.data === null) {
      textInput.style.left = "0px";
    } else if (e.data !== undefined || e.data !== null) {
      textInput.style.left = `${parseFloat(textInput.style.left.slice(0,-2)) - charWidth}` + "px"; //,"px"));
    }
    console.log("data null?: ", e.data === null)
  }

  // Get pixel width of string with canvas
  function getCharWidth(text, font) {
    let tempCanvas = getCharWidth.tempCanvas || (getCharWidth.tempCanvas = document.createElement("canvas"));
    let ctx = tempCanvas.getContext("2d");
    ctx.font = font;
    console.log("text:", text);
    return ctx.measureText(text).width;
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