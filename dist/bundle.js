/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/javascripts/text_input/normal_text.js":
/*!***************************************************!*\
  !*** ./src/javascripts/text_input/normal_text.js ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 203:0-14 */
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
// const Background = require("./javascripts/background/background");
// const TextInputCanvas = require("./javascripts/text_input/canvas_text");
const TextInput = __webpack_require__(/*! ./javascripts/text_input/normal_text */ "./src/javascripts/text_input/normal_text.js");
// const WritingSpace = require('./javascripts/writing_space');
// import TextInput from "./text_input/normal_text";

document.addEventListener("DOMContentLoaded", () => {
  // * VARIABLES ---------------------------------------------------------------
  // document.body.innerHTML = ""; // resets everything
  const textInput = document.getElementById("text-input");
  const cafeAudio = document.getElementById("cafe-button-audio");
  const rainAudio = document.getElementById("rain-button-audio");
  // const cafeButton = document.getElementById("cafe-button");
  // const rainButton = document.getElementById("rain-button");
  const soundButtons = document.getElementById("sound-buttons");

  // * METHODS -----------------------------------------------------------------
  // Background("background");

  // WritingSpace();
  // TextInputCanvas("text-input-canvas");
  // TextInput("text-input");
  TextInput(textInput);

  // * SOUND
  // Chrome doesn't allow autoplay until user interacts
  // cafeAudio.play();
  // rainAudio.play();
  cafeAudio.volume = 0.1;
  rainAudio.volume = 0.1;

  // * EVENT LISTENERS ---------------------------------------------------------
  soundButtons.addEventListener("click", function(evt) {
    // evt.target.classList.toggle("off");
    let soundButton = evt.target;
    if (soundButton.classList.contains("off")) {
      soundButton.classList.remove("off");
      document.getElementById(`${soundButton.id}-audio`).play();
    } else {
      soundButton.classList.add("off");
      document.getElementById(`${soundButton.id}-audio`).pause();
    }
  })

  // * EXTRA 
  // Print welcome message to console
  const consoleStyle = [
    'font: 12px bold, Courier',
    'background: black',
    'margin-top: 10px',
    'padding: 10px 0',
    'border-top: 3px solid white',
    'border-bottom: 3px solid white'
  ].join(';');

  console.log('%ccoded with %c❤',
    consoleStyle.concat(';font-style: italic;padding-left: 10px;border-left: 3px solid white'),
    consoleStyle.concat(';padding-right: 10px;border-right: 3px solid white;color: #03dac5'),
    '\n\nthanks for stopping by!!'
  );
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGVfd3JpdGFyeS8uL3NyYy9qYXZhc2NyaXB0cy90ZXh0X2lucHV0L25vcm1hbF90ZXh0LmpzIiwid2VicGFjazovL3RoZV93cml0YXJ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RoZV93cml0YXJ5Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUEsdURBQXVELE1BQU07QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGlCQUFpQjs7QUFFM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBLDBDQUEwQyxrRUFBa0U7QUFDNUc7QUFDQSw0Q0FBNEMsaUJBQWlCOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxTQUFTO0FBQ3ZELGlEQUFpRCxnQkFBZ0I7QUFDakUseUVBQXlFLFVBQVU7QUFDbkYsNkJBQTZCLE9BQU87QUFDcEM7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7QUFDQSwyQ0FBMkMsaUJBQWlCO0FBQzVELHVDQUF1QyxpQkFBaUI7QUFDeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxpRUFBaUUsU0FBUztBQUNqSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlOzs7Ozs7VUMzTkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFPLENBQUMseUZBQXNDO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGVBQWU7QUFDaEQsS0FBSztBQUNMO0FBQ0EsaUNBQWlDLGVBQWU7QUFDaEQ7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQSwwQkFBMEIsbUJBQW1CLG1CQUFtQjtBQUNoRSwwQkFBMEIsb0JBQW9CLDhCQUE4QjtBQUM1RTtBQUNBO0FBQ0EsQ0FBQyxDIiwiZmlsZSI6Ii4vYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gVGV4dElucHV0KHRleHRJbnB1dEVsbSkge1xuICBjb25zdCBGT05UU0laRSA9IFwiMjVweFwiO1xuICAvLyBsZXQgRk9OVEZBTUlMWSA9IFwic2VyaWZcIlxuICBjb25zdCBQQVBFUldJRFRIID0gODAwOyAvLyB3aWR0aCBvZiB3aG9sZSBwYXBlciBpbiBweFxuICBjb25zdCBJTlBVVFdJRFRIID0gNzAwOyAvLyB3aWR0aCBvZiB0ZXh0IGFyZWEgaW4gcHhcbiAgLy8gY29uc3QgdGV4dElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpO1xuICAvLyB0ZXh0SW5wdXQuaW5uZXJUZXh0ID0gXCJUeXBlIGhlcmUgdG8gZ2V0IHN0YXJ0ZWRcIjtcbiAgLy8gdGV4dElucHV0LmNvbnRlbnRFZGl0YWJsZSA9IFwidHJ1ZVwiO1xuICAvLyBjb25zdCB0ZXh0SW5wdXRWYWx1ZSA9IHRleHRJbnB1dEVsbS52YWx1ZTtcblxuICBcbiAgY29uc3QgdGV4dElucHV0ID0gdGV4dElucHV0RWxtO1xuXG4gIC8vIFJldHJpZXZlIHRleHQgZnJvbSBsb2NhbFN0b3JhZ2UgaWYgd2UndmUgc2F2ZWQgYW55XG4gIHRleHRJbnB1dC52YWx1ZSA9ICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0ZXh0SW5wdXRWYWx1ZVwiKSkgfHwgXCJcIjtcbiAgXG4gIC8vIGNvbnN0IHRleHRJbnB1dFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZWxtSWR9LXRpdGxlYCk7XG4gIGNvbnN0IHRleHRJbnB1dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdGV4dElucHV0QXR0cnMgPSB7XG4gICAgXCJpZFwiOiBcInRleHQtaW5wdXQtdGl0bGVcIixcbiAgICBcImF1dG9mb2N1c1wiOiBcIlwiLFxuICAgIFwiZGF0YS1wbGFjZWhvbGRlclwiOiBcInRpdGxlXCIsXG4gICAgXCJjb250ZW50ZWRpdGFibGVcIjogXCJ0cnVlXCIsXG4gICAgXCJhdXRvY29tcGxldGVcIjogXCJvZmZcIixcbiAgICBcImF1dG9jb3JyZWN0XCI6IFwib2ZmXCIsXG4gICAgXCJhdXRvY2FwaXRhbGl6ZVwiOiBcIm9mZlwiLFxuICAgIFwic3BlbGxjaGVja1wiOiBcImZhbHNlXCJcbiAgfTtcbiAgZm9yIChsZXQga2V5IGluIHRleHRJbnB1dEF0dHJzKSB7XG4gICAgdGV4dElucHV0VGl0bGUuc2V0QXR0cmlidXRlKGtleSwgdGV4dElucHV0QXR0cnNba2V5XSk7XG4gIH07XG4gIFxuICBjb25zdCB0ZXh0SW5wdXRXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHR5cGV3cml0ZXItcGFwZXJgKTtcbiAgdGV4dElucHV0V3JhcHBlci5pbnNlcnRCZWZvcmUodGV4dElucHV0VGl0bGUsIHRleHRJbnB1dCk7XG5cblxuICAvLyAqIFNldCBpbml0aWFsIGZvbnQgKyBwb3NpdGlvbiBvZiBwYXBlciBmb3IgdHlwZXdyaXRlciBtb2RlXG4gIHRleHRJbnB1dFdyYXBwZXIuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG5cbiAgdGV4dElucHV0V3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiBzaGlmdFBhZ2UoZSkpO1xuICB0ZXh0SW5wdXRXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gaGFuZGxlS2V5RG93bihlKSk7XG4gIGNvbnN0IGF1ZGlvQ2hhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2V5LWNoYXJcIik7XG4gIGNvbnN0IGF1ZGlvU3BhY2ViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleS1zcGFjZWJhclwiKTtcbiAgY29uc3QgYXVkaW9CYWNrc3BhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleS1iYWNrc3BhY2VcIik7XG4gIGNvbnN0IGF1ZGlvRW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleS1lbnRlclwiKTtcblxuICAvLyB0ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gc2hpZnRQYWdlKGUpKTtcbiAgLy8gdGV4dElucHV0VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gc2hpZnRQYWdlKGUpKTtcbiAgLy8gdGV4dElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gc2hpZnRQYWdlKGUpKTtcbiAgLy8gbGV0IGZ1bGxGb250ID0gXCI0OHB4IHNlcmlmXCI7XG4gIGxldCBudW1DaGFycyA9IDA7XG4gIGxldCBwcmV2TGluZUVuZFBvcyA9IDA7XG5cbiAgLy8gKiBIYW5kbGUgRW50ZXIsIEJhY2tzcGFjZSwgYW5kIFR5cGluZyBDaGFyc1xuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2dCkge1xuICAgIHRleHRJbnB1dFdyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwiYWxsIDAuMXNcIjtcbiAgICBjb25zdCBjdXJyZW50TGVmdE9mZnNldCA9IHBhcnNlRmxvYXQoZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpO1xuICAgIFxuICAgIGxldCBwYXBlclRvcCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGV4dElucHV0V3JhcHBlcikudG9wKTtcbiAgICBsZXQgbGluZUhlaWdodCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGV4dElucHV0KS5saW5lSGVpZ2h0KTtcbiAgICBsZXQgcGFwZXJIZWlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRleHRJbnB1dFdyYXBwZXIpLmhlaWdodCk7XG5cbiAgICBzd2l0Y2ggKGV2dC5jb2RlKSB7XG4gICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgLy8gZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUubGVmdCA9IFwiNTAwcHhcIjtcbiAgICAgICAgcHJldkxpbmVFbmRQb3MgPSBwYXJzZUZsb2F0KGV2dC5jdXJyZW50VGFyZ2V0LnN0eWxlLmxlZnQuc2xpY2UoMCwgLTIpKTtcbiAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUubGVmdCA9IGAkeyhJTlBVVFdJRFRIIC8gMil9cHhgO1xuICAgICAgICBcbiAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUudG9wID0gKHBhcGVyVG9wIC0gbGluZUhlaWdodCkgKyAncHgnO1xuICAgICAgICBldnQuY3VycmVudFRhcmdldC5zdHlsZS5oZWlnaHQgPSAocGFwZXJIZWlnaHQgKyBsaW5lSGVpZ2h0KSArICdweCc7XG4gICAgICAgIFxuICAgICAgICBhdWRpb0VudGVyLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYXVkaW9FbnRlci5wbGF5KCk7XG4gICAgICAgIGlmIChldnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpID09IGB0ZXh0LWlucHV0LXRpdGxlYCkge1xuICAgICAgICAgIHRleHRJbnB1dC5mb2N1cygpO1xuICAgICAgICAgIC8vIHRleHRJbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAgIGV2dC5jdXJyZW50VGFyZ2V0LnN0eWxlLmxlZnQgPSBcIjUwMHB4XCI7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgZXZ0LnVycmVudFRhcmdldC5zdHlsZS5sZWZ0ID0gXCI1MDBweFwiO1xuICAgICAgICAvLyB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkJhY2tzcGFjZVwiOlxuICAgICAgICAvLyBpZiAocGFyc2VGbG9hdChldnQuY3VycmVudFRhcmdldC5zdHlsZS5sZWZ0LnNsaWNlKDAsLTIpKSA+PSA1MDApIHtcbiAgICAgICAgLy8gICBldnQuY3VycmVudFRhcmdldC5zdHlsZS5sZWZ0ID0gXCItNTAwcHhcIjtcbiAgICAgICAgLy8gfVxuICAgICAgICBhdWRpb0JhY2tzcGFjZS5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIGF1ZGlvQmFja3NwYWNlLnBsYXkoKTtcbiAgICAgICAgbGV0IGNoYXJXaWR0aCA9IGdldENoYXJXaWR0aChcImFcIiwgYCR7Rk9OVFNJWkV9IFBUIE1vbm9gKTtcbiAgICAgICAgbGV0IGxlZnRCb3VuZGFyeSA9IChJTlBVVFdJRFRIIC8gMik7XG4gICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0LnN0eWxlLmxlZnQgPSBgJHtwYXJzZUZsb2F0KGV2dC5jdXJyZW50VGFyZ2V0LnN0eWxlLmxlZnQuc2xpY2UoMCwgLTIpKSArIGNoYXJXaWR0aH1gICsgXCJweFwiO1xuICAgICAgICBpZiAoY3VycmVudExlZnRPZmZzZXQgPiBsZWZ0Qm91bmRhcnktY2hhcldpZHRoKSB7XG4gICAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUubGVmdCA9IGAkeyhwcmV2TGluZUVuZFBvcyl9cHhgO1xuXG4gICAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUudG9wID0gKHBhcGVyVG9wICsgbGluZUhlaWdodCkgKyAncHgnO1xuICAgICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0LnN0eWxlLmhlaWdodCA9IChwYXBlckhlaWdodCAtIGxpbmVIZWlnaHQpICsgJ3B4JztcblxuICAgICAgICAgIG51bUNoYXJzLS07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiU3BhY2VcIjpcbiAgICAgICAgYXVkaW9TcGFjZWJhci5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIGF1ZGlvU3BhY2ViYXIucGxheSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChldnQua2V5ICE9PSBcIk1ldGFcIiAmJiBldnQua2V5ICE9PSBcIlRhYlwiICYmIGV2dC5rZXkgIT09IFwiU2hpZnRcIiAmJlxuICAgICAgICAgIGV2dC5rZXkuc3Vic3RyaW5nKDAsIDUpICE9PSBcIkFycm93XCIpIHtcbiAgICAgICAgICBhdWRpb0NoYXIuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgIGF1ZGlvQ2hhci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gKiBTaGlmdHMgcGFnZSBkZXBlbmRpbmcgb24ga2V5IGlucHV0XG4gIGZ1bmN0aW9uIHNoaWZ0UGFnZShldnQpIHtcbiAgICBsZXQgdGV4dElucHV0VmFsdWUgPSB0ZXh0SW5wdXQudmFsdWU7XG4gICAgbGV0IHRleHRJbnB1dFRpdGxlVmFsdWUgPSB0ZXh0SW5wdXRUaXRsZS5pbm5lclRleHQ7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGV4dElucHV0VmFsdWVcIiwgdGV4dElucHV0VmFsdWUpO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRleHRJbnB1dFRpdGxlVmFsdWVcIiwgdGV4dElucHV0VGl0bGVWYWx1ZSk7XG5cbiAgICAvLyBsZXQgY2hhcldpZHRoID0gTWF0aC5mbG9vcihnZXRDaGFyV2lkdGgoZXZ0LmRhdGEsIFwic2VyaWZcIikpO1xuICAgIGxldCBjaGFyV2lkdGggPSBnZXRDaGFyV2lkdGgoZXZ0LmRhdGEsIGAke0ZPTlRTSVpFfSBQVCBNb25vYCk7XG4gICAgLy8gbGV0IGNoYXJXaWR0aCA9IGdldENoYXJXaWR0aChldnQuZGF0YSwgYCR7ZnVsbEZvbnQuZmFtaWx5fWAgKyBcIiBcIiArIFwiNDhweFwiKTtcbiAgICAvLyB0ZXh0SW5wdXQuc3R5bGUubGVmdCA9IHRleHRJbnB1dC5zdHlsZS5sZWZ0LnNsaWNlKDAsLTIpLmNvbmNhdChgJHtjaGFyV2lkdGh9YCxcInB4XCIpO1xuICAgIC8vIGxldCBtYXhQYWdlV2lkdGggPSBgJHs1MDAgKyB9YFxuICAgIGNvbnN0IGN1cnJlbnRMZWZ0T2Zmc2V0ID0gcGFyc2VGbG9hdCh0ZXh0SW5wdXRXcmFwcGVyLnN0eWxlLmxlZnQuc2xpY2UoMCwgLTIpKSAtIGNoYXJXaWR0aDtcbiAgICAvLyBpZiAoZXZ0LmRhdGEgPT09IG51bGwpIHtcbiAgICAvLyAgIHRleHRJbnB1dFdyYXBwZXIuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgLy8gfSBlbHNlIFxuXG4gICAgbGV0IHN0YXJ0UG9zID0gdGV4dElucHV0LnNlbGVjdGlvblN0YXJ0O1xuICAgIGxldCBlbmRQb3MgPSB0ZXh0SW5wdXQuc2VsZWN0aW9uRW5kO1xuICAgIGxldCByaWdodEJvdW5kYXJ5ID0gKC1JTlBVVFdJRFRIIC8gMikgKyBjaGFyV2lkdGg7XG4gICAgLy8gbGV0IGxlZnRCb3VuZGFyeSA9IChJTlBVVFdJRFRIIC8gMik7XG5cbiAgICAvLyAhIFRlc3Rpbmcgc3BsaXR0aW5nIG9uIGxpbmUgYnJlYWtzIHRvIGdldCBhcnJheSBvZiBzZXBhcmF0ZSBsaW5lc1xuICAgIGxldCB0ZXh0ID0gdGV4dElucHV0LnZhbHVlO1xuICAgIGxldCBudW1MaW5lQnJlYWtzID0gKHRleHQubWF0Y2goL1xccj9cXG58XFxyL2cpIHx8ICcnKS5sZW5ndGg7XG4gICAgbGV0IHRvdGFsVGV4dExlbmd0aCA9IHRleHQubGVuZ3RoICsgbnVtTGluZUJyZWFrcztcblxuICAgIGlmIChjdXJyZW50TGVmdE9mZnNldCA8PSByaWdodEJvdW5kYXJ5KSB7XG4gICAgICBhdWRpb0VudGVyLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgIGF1ZGlvRW50ZXIucGxheSgpO1xuICAgICAgLy8gdGV4dElucHV0V3JhcHBlci5zdHlsZS5sZWZ0ID0gYCR7KElOUFVUV0lEVEggLyAyKX1weGA7XG4gICAgICAvLyBwcmV2TGluZUVuZFBvcyA9IHBhcnNlRmxvYXQoZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpO1xuICAgICAgcHJldkxpbmVFbmRQb3MgPSAtKElOUFVUV0lEVEggLyAyKTtcbiAgICAgIC8vIGV2dC5jdXJyZW50VGFyZ2V0LnN0eWxlLmxlZnQgPSBgJHsoSU5QVVRXSURUSCAvIDIpfXB4YDtcbiAgICAgIHRleHRJbnB1dFdyYXBwZXIuc3R5bGUubGVmdCA9IGAkeyhJTlBVVFdJRFRIIC8gMil9cHhgO1xuICAgICAgbGV0IHBhcGVyVG9wID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0ZXh0SW5wdXRXcmFwcGVyKS50b3ApO1xuICAgICAgbGV0IGxpbmVIZWlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRleHRJbnB1dCkubGluZUhlaWdodCk7XG4gICAgICBsZXQgcGFwZXJIZWlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRleHRJbnB1dFdyYXBwZXIpLmhlaWdodCk7XG5cbiAgICAgIHRleHRJbnB1dFdyYXBwZXIuc3R5bGUudG9wID0gKHBhcGVyVG9wIC0gbGluZUhlaWdodCkgKyAncHgnO1xuICAgICAgdGV4dElucHV0V3JhcHBlci5zdHlsZS5oZWlnaHQgPSAocGFwZXJIZWlnaHQgKyBsaW5lSGVpZ2h0KSArICdweCc7XG5cbiAgICAgIG51bUNoYXJzKys7XG4gICAgICByZXR1cm47XG4gICAgICAvLyB9IGVsc2UgaWYgKGN1cnJlbnRMZWZ0T2Zmc2V0ID49IGxlZnRCb3VuZGFyeSkge1xuICAgICAgLy8gICBhdWRpb0JhY2tzcGFjZS5jdXJyZW50VGltZSA9IDA7XG4gICAgICAvLyAgIGF1ZGlvQmFja3NwYWNlLnBsYXkoKTtcbiAgICAgIC8vICAgZXZ0LmN1cnJlbnRUYXJnZXQuc3R5bGUubGVmdCA9IGAkeyhyaWdodEJvdW5kYXJ5KX1weGA7XG4gICAgICAvLyAgIG51bUNoYXJzLS07XG4gICAgICAvLyAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2dC5kYXRhICE9PSB1bmRlZmluZWQgJiYgZXZ0LmRhdGEgIT09IG51bGwpIHtcbiAgICAgIHRleHRJbnB1dFdyYXBwZXIuc3R5bGUubGVmdCA9IGAke3BhcnNlRmxvYXQodGV4dElucHV0V3JhcHBlci5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSkgLSBjaGFyV2lkdGh9YCArIFwicHhcIjsgLy8sXCJweFwiKSk7XG4gICAgICBudW1DaGFycysrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldCBwaXhlbCB3aWR0aCBvZiBzdHJpbmcgd2l0aCBjYW52YXNcbiAgZnVuY3Rpb24gZ2V0Q2hhcldpZHRoKGNoYXIsIGZvbnQpIHtcbiAgICBsZXQgdGVtcENhbnZhcyA9IGdldENoYXJXaWR0aC50ZW1wQ2FudmFzIHx8IChnZXRDaGFyV2lkdGgudGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikpO1xuICAgIGxldCBjdHggPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjdHguZm9udCA9IGZvbnQ7XG4gICAgcmV0dXJuIGN0eC5tZWFzdXJlVGV4dChjaGFyKS53aWR0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlckN1cnNvcihlbG0sIHBhZ2VXaWR0aCwgYXZnQ2hhcldpZHRoKSB7XG4gICAgLy8gZWxtLmZvY3VzKCk7XG4gICAgZWxtLnNldFNlbGVjdGlvblJhbmdlKClcbiAgfVxuXG4gIC8vICEgQm9sZGluZyBTZWxlY3Rpb25cbiAgZnVuY3Rpb24gYm9sZFR4dChlbG0pIHtcbiAgICAvLyBsZXQgc2VsZWN0U3RhcnQgPSBlbG0uc2VsZWN0aW9uU3RhcnQ7XG4gICAgLy8gbGV0IHNlbGVjdEVuZCA9IGVsbS5zZWxlY3Rpb25FbmQ7XG5cbiAgfVxuXG59XG5cbi8vIGZ1bmN0aW9uIGFkZExpc3RlbmVycyhub2RlLCBsaXN0ZW5lcnMsIGhhbmRsZXIpIHtcbi8vICAgaWYgKCEobGlzdGVuZXJzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4vLyAgICAgdGhyb3cgXCJhZGRMaXN0ZW5lcnM6IG5lZWRzIHRvIGJlIGFuIGFycmF5IG9mIGV2ZW50IGxpc3RlbmVyc1wiXG4vLyAgIH1cbi8vICAgbGlzdGVuZXJzLmZvckVhY2goIGZ1bmN0aW9uKGV2dCkge1xuLy8gICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIsIGZhbHNlKVxuLy8gICB9KVxuLy8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRJbnB1dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIFVudXNlZCBjb2RlXG5cbi8vICEgRG8gSSBuZWVkIHRvIGxvYWQgbG9jYWwgZm9udD8gSXMgdGhlIHRoZSBKUyBhbHRlcm5hdGl2ZSB0byBAZm9udC1mYWNlP1xuLy8gYXN5bmMgZnVuY3Rpb24gbG9hZEZvbnRzKCkge1xuLy8gICBjb25zdCBmb250ID0gbmV3IEZvbnRGYWNlKCdQVCBNb25vJywgJ3VybCguLi8uLi9kaXN0L2ZvbnRzL1BUX01vbm8vUFRNb25vLVJlZ3VsYXIudHRmKScpO1xuLy8gICAvLyB3YWl0IGZvciBmb250IHRvIGJlIGxvYWRlZFxuLy8gICBhd2FpdCBmb250LmxvYWQoKS50aGVuKGZ1bmN0aW9uKCkge1xuLy8gICAgIGZ1bGxGb250ID0gZm9udDsgXG4vLyAgIH0pO1xuLy8gICAvLyAvLyBhZGQgZm9udCB0byBkb2N1bWVudFxuLy8gICBkb2N1bWVudC5mb250cy5hZGQoZm9udCk7XG4vLyAgIC8vIC8vIGVuYWJsZSBmb250IHdpdGggQ1NTIGNsYXNzXG4vLyAgIC8vIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZm9udHMtbG9hZGVkJyk7XG4vLyB9XG4vLyBsb2FkRm9udHMoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGNvbnN0IEJhY2tncm91bmQgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmRcIik7XG4vLyBjb25zdCBUZXh0SW5wdXRDYW52YXMgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0cy90ZXh0X2lucHV0L2NhbnZhc190ZXh0XCIpO1xuY29uc3QgVGV4dElucHV0ID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdHMvdGV4dF9pbnB1dC9ub3JtYWxfdGV4dFwiKTtcbi8vIGNvbnN0IFdyaXRpbmdTcGFjZSA9IHJlcXVpcmUoJy4vamF2YXNjcmlwdHMvd3JpdGluZ19zcGFjZScpO1xuLy8gaW1wb3J0IFRleHRJbnB1dCBmcm9tIFwiLi90ZXh0X2lucHV0L25vcm1hbF90ZXh0XCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgLy8gKiBWQVJJQUJMRVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gXCJcIjsgLy8gcmVzZXRzIGV2ZXJ5dGhpbmdcbiAgY29uc3QgdGV4dElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0LWlucHV0XCIpO1xuICBjb25zdCBjYWZlQXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhZmUtYnV0dG9uLWF1ZGlvXCIpO1xuICBjb25zdCByYWluQXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhaW4tYnV0dG9uLWF1ZGlvXCIpO1xuICAvLyBjb25zdCBjYWZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYWZlLWJ1dHRvblwiKTtcbiAgLy8gY29uc3QgcmFpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFpbi1idXR0b25cIik7XG4gIGNvbnN0IHNvdW5kQnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmQtYnV0dG9uc1wiKTtcblxuICAvLyAqIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQmFja2dyb3VuZChcImJhY2tncm91bmRcIik7XG5cbiAgLy8gV3JpdGluZ1NwYWNlKCk7XG4gIC8vIFRleHRJbnB1dENhbnZhcyhcInRleHQtaW5wdXQtY2FudmFzXCIpO1xuICAvLyBUZXh0SW5wdXQoXCJ0ZXh0LWlucHV0XCIpO1xuICBUZXh0SW5wdXQodGV4dElucHV0KTtcblxuICAvLyAqIFNPVU5EXG4gIC8vIENocm9tZSBkb2Vzbid0IGFsbG93IGF1dG9wbGF5IHVudGlsIHVzZXIgaW50ZXJhY3RzXG4gIC8vIGNhZmVBdWRpby5wbGF5KCk7XG4gIC8vIHJhaW5BdWRpby5wbGF5KCk7XG4gIGNhZmVBdWRpby52b2x1bWUgPSAwLjE7XG4gIHJhaW5BdWRpby52b2x1bWUgPSAwLjE7XG5cbiAgLy8gKiBFVkVOVCBMSVNURU5FUlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHNvdW5kQnV0dG9ucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgLy8gZXZ0LnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwib2ZmXCIpO1xuICAgIGxldCBzb3VuZEJ1dHRvbiA9IGV2dC50YXJnZXQ7XG4gICAgaWYgKHNvdW5kQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcIm9mZlwiKSkge1xuICAgICAgc291bmRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NvdW5kQnV0dG9uLmlkfS1hdWRpb2ApLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc291bmRCdXR0b24uY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NvdW5kQnV0dG9uLmlkfS1hdWRpb2ApLnBhdXNlKCk7XG4gICAgfVxuICB9KVxuXG4gIC8vICogRVhUUkEgXG4gIC8vIFByaW50IHdlbGNvbWUgbWVzc2FnZSB0byBjb25zb2xlXG4gIGNvbnN0IGNvbnNvbGVTdHlsZSA9IFtcbiAgICAnZm9udDogMTJweCBib2xkLCBDb3VyaWVyJyxcbiAgICAnYmFja2dyb3VuZDogYmxhY2snLFxuICAgICdtYXJnaW4tdG9wOiAxMHB4JyxcbiAgICAncGFkZGluZzogMTBweCAwJyxcbiAgICAnYm9yZGVyLXRvcDogM3B4IHNvbGlkIHdoaXRlJyxcbiAgICAnYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHdoaXRlJ1xuICBdLmpvaW4oJzsnKTtcblxuICBjb25zb2xlLmxvZygnJWNjb2RlZCB3aXRoICVj4p2kJyxcbiAgICBjb25zb2xlU3R5bGUuY29uY2F0KCc7Zm9udC1zdHlsZTogaXRhbGljO3BhZGRpbmctbGVmdDogMTBweDtib3JkZXItbGVmdDogM3B4IHNvbGlkIHdoaXRlJyksXG4gICAgY29uc29sZVN0eWxlLmNvbmNhdCgnO3BhZGRpbmctcmlnaHQ6IDEwcHg7Ym9yZGVyLXJpZ2h0OiAzcHggc29saWQgd2hpdGU7Y29sb3I6ICMwM2RhYzUnKSxcbiAgICAnXFxuXFxudGhhbmtzIGZvciBzdG9wcGluZyBieSEhJ1xuICApO1xufSkiXSwic291cmNlUm9vdCI6IiJ9