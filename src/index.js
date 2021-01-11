const Background = require("./javascripts/background/background");
const TextInputCanvas = require("./javascripts/text_input/canvas_text");
const TextInput = require("./javascripts/text_input/normal_text");
// const WritingSpace = require('./javascripts/writing_space');
// import TextInput from "./text_input/normal_text";

document.addEventListener("DOMContentLoaded", () => {
  // * VARIABLES ---------------------------------------------------------------
  // document.body.innerHTML = ""; // resets everything
  const textInput = document.getElementById("text-input");

  // * METHODS -----------------------------------------------------------------
  Background("background");
  // WritingSpace();
  // TextInputCanvas("text-input-canvas");
  // TextInput("text-input");
  TextInput(textInput);

  // * EVENT LISTENERS ---------------------------------------------------------
})