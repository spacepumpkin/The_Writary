function TextInput () {
  const textInput = document.getElementById("text-input");
  // textInput.innerText = "Type here to get started";
  textInput.contentEditable = "true";
}

module.exports = TextInput;