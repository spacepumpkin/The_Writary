

class TextBlock {
  
  constructor(writingSpace, prevText, prevSibling) {
    this.writingSpace = writingSpace;
    this.prevSibling = prevSibling;

    this.wordCount = 0;
    this.charCount = 0;
    this.content = prevText;
    // this.lines = [];

    // this.addNewLine = this.addNewLine.bind(this);
  }

  // addNewLine(evt) {
  //   evt.preventDefault();
  //   let newLine = document.createElement('span');
  //   // newLine.classList.add("textblock-line");

  //   const textInputAttrs = {
  //     "autofocus": "",
  //     "contenteditable": "true",
  //     "autocomplete": "off",
  //     "autocorrect": "off",
  //     "autocapitalize": "off",
  //     "spellcheck": "false"
  //   };
  //   for (let key in textInputAttrs) {
  //     newLine.setAttribute(key, textInputAttrs[key]);
  //   };
  //   newLine.addEventListener("keydown",function(evt) {
  //     debugger
  //     if (!newLine.value && evt.code === "Backspace") {

  //     }
  //   })
  //   this.writingSpace.append(newLine);
  // }

  // If we press enter to start a new block
  handleEnter(evt) {

  }

  // If we press backspace at the beginning of the block to merge with prevSibling
  handleBackspace(evt) {
    let caretAtStart = (evt.target.selectionStart === 0 && evt.target.selectionEnd === 0);
    if (this.prevSibling && caretAtStart && evt.code === "Backspace") {
      
    }
  }

  render() {
    let textBlock = document.createElement('textarea');
    textBlock.value = this.content;

    this.writingSpace.insertAdjacentText('afterend', textBlock);

    let that = this;
    textBlock.addEventListener('change', function() {
      that.content = this.value;
      that.wordCount = this.value.trim().match(/\S+/g).length;
      that.charCount = this.value.split('').length;
    })

  }
}
