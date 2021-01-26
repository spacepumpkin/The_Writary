function TextInput(textInputElm) {
  const FONTSIZE = "25px";
  // let FONTFAMILY = "serif"
  const PAPERWIDTH = 800; // width of whole paper in px
  const INPUTWIDTH = 700; // width of text area in px
  // const textInput = document.getElementById(elmId);
  // textInput.innerText = "Type here to get started";
  // textInput.contentEditable = "true";
  // const textInputValue = textInputElm.value;

  
  const textInput = textInputElm;

  // Retrieve text from localStorage if we've saved any
  textInput.value = (window.localStorage.getItem("textInputValue")) || "";
  
  // const textInputTitle = document.getElementById(`${elmId}-title`);
  const textInputTitle = document.createElement("div");
  const textInputAttrs = {
    "id": "text-input-title",
    "autofocus": "",
    "data-placeholder": "title",
    "contenteditable": "true",
    "autocomplete": "off",
    "autocorrect": "off",
    "autocapitalize": "off",
    "spellcheck": "false"
  };
  for (let key in textInputAttrs) {
    textInputTitle.setAttribute(key, textInputAttrs[key]);
  };
  
  const textInputWrapper = document.getElementById(`typewriter-paper`);
  textInputWrapper.insertBefore(textInputTitle, textInput);


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
  // let fullFont = "48px serif";
  let numChars = 0;
  let prevLineEndPos = 0;

  // * Handle Enter, Backspace, and Typing Chars
  function handleKeyDown(evt) {
    textInputWrapper.style.transition = "all 0.1s";
    const currentLeftOffset = parseFloat(evt.currentTarget.style.left.slice(0, -2));
    
    let paperTop = parseInt(getComputedStyle(textInputWrapper).top);
    let lineHeight = parseInt(getComputedStyle(textInput).lineHeight);
    let paperHeight = parseInt(getComputedStyle(textInputWrapper).height);

    switch (evt.code) {
      case "Enter":
        // evt.currentTarget.style.left = "500px";
        prevLineEndPos = parseFloat(evt.currentTarget.style.left.slice(0, -2));
        evt.currentTarget.style.left = `${(INPUTWIDTH / 2)}px`;
        
        evt.currentTarget.style.top = (paperTop - lineHeight) + 'px';
        evt.currentTarget.style.height = (paperHeight + lineHeight) + 'px';
        
        audioEnter.currentTime = 0;
        audioEnter.play();
        if (evt.target.getAttribute("id") == `text-input-title`) {
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
        let charWidth = getCharWidth("a", `${FONTSIZE} PT Mono`);
        let leftBoundary = (INPUTWIDTH / 2);
        evt.currentTarget.style.left = `${parseFloat(evt.currentTarget.style.left.slice(0, -2)) + charWidth}` + "px";
        if (currentLeftOffset > leftBoundary-charWidth) {
          evt.currentTarget.style.left = `${(prevLineEndPos)}px`;

          evt.currentTarget.style.top = (paperTop + lineHeight) + 'px';
          evt.currentTarget.style.height = (paperHeight - lineHeight) + 'px';

          numChars--;
        }
        break;
      case "Space":
        audioSpacebar.currentTime = 0;
        audioSpacebar.play();
        break;
      default:
        if (evt.key !== "Meta" && evt.key !== "Tab" && evt.key !== "Shift" &&
          evt.key.substring(0, 5) !== "Arrow") {
          audioChar.currentTime = 0;
          audioChar.play();
        }
        break;
    }
  }

  // * Shifts page depending on key input
  function shiftPage(evt) {
    let textInputValue = textInput.value;
    let textInputTitleValue = textInputTitle.innerText;
    window.localStorage.setItem("textInputValue", textInputValue);
    window.localStorage.setItem("textInputTitleValue", textInputTitleValue);

    // let charWidth = Math.floor(getCharWidth(evt.data, "serif"));
    let charWidth = getCharWidth(evt.data, `${FONTSIZE} PT Mono`);
    // let charWidth = getCharWidth(evt.data, `${fullFont.family}` + " " + "48px");
    // textInput.style.left = textInput.style.left.slice(0,-2).concat(`${charWidth}`,"px");
    // let maxPageWidth = `${500 + }`
    const currentLeftOffset = parseFloat(textInputWrapper.style.left.slice(0, -2)) - charWidth;
    // if (evt.data === null) {
    //   textInputWrapper.style.left = "0px";
    // } else 

    let startPos = textInput.selectionStart;
    let endPos = textInput.selectionEnd;
    let rightBoundary = (-INPUTWIDTH / 2) + charWidth;
    // let leftBoundary = (INPUTWIDTH / 2);

    // ! Testing splitting on line breaks to get array of separate lines
    let text = textInput.value;
    let numLineBreaks = (text.match(/\r?\n|\r/g) || '').length;
    let totalTextLength = text.length + numLineBreaks;

    if (currentLeftOffset <= rightBoundary) {
      audioEnter.currentTime = 0;
      audioEnter.play();
      // textInputWrapper.style.left = `${(INPUTWIDTH / 2)}px`;
      // prevLineEndPos = parseFloat(evt.currentTarget.style.left.slice(0, -2));
      prevLineEndPos = -(INPUTWIDTH / 2);
      // evt.currentTarget.style.left = `${(INPUTWIDTH / 2)}px`;
      textInputWrapper.style.left = `${(INPUTWIDTH / 2)}px`;
      let paperTop = parseInt(getComputedStyle(textInputWrapper).top);
      let lineHeight = parseInt(getComputedStyle(textInput).lineHeight);
      let paperHeight = parseInt(getComputedStyle(textInputWrapper).height);

      textInputWrapper.style.top = (paperTop - lineHeight) + 'px';
      textInputWrapper.style.height = (paperHeight + lineHeight) + 'px';

      numChars++;
      return;
      // } else if (currentLeftOffset >= leftBoundary) {
      //   audioBackspace.currentTime = 0;
      //   audioBackspace.play();
      //   evt.currentTarget.style.left = `${(rightBoundary)}px`;
      //   numChars--;
      //   return;
    }
    if (evt.data !== undefined && evt.data !== null) {
      textInputWrapper.style.left = `${parseFloat(textInputWrapper.style.left.slice(0, -2)) - charWidth}` + "px"; //,"px"));
      numChars++;
    }
  }

  // Get pixel width of string with canvas
  function getCharWidth(char, font) {
    let tempCanvas = getCharWidth.tempCanvas || (getCharWidth.tempCanvas = document.createElement("canvas"));
    let ctx = tempCanvas.getContext("2d");
    ctx.font = font;
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
//   });
//   // // add font to document
//   document.fonts.add(font);
//   // // enable font with CSS class
//   // document.body.classList.add('fonts-loaded');
// }
// loadFonts();