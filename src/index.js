// const Background = require("./javascripts/background/background");
// const TextInputCanvas = require("./javascripts/text_input/canvas_text");
const TextInput = require("./javascripts/text_input/normal_text");
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