// user-input-canvas
function TextInputCanvas() {
  const canvasEl = document.getElementById("text-input-canvas");
  canvasEl.width = 1000; //window.innerWidth;
  canvasEl.height = 300; //window.innerHeight;
  const ctx = canvasEl.getContext("2d", {
    // alpha: false,
  });
  ctx.globalCompositeOperation = "source-over";
  ctx.font = "48px serif";
  ctx.fillText("helloo worldddd!!!!", 50, 100);
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "#fffaef";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  
  // canvasEl = addEventListener("")
}

module.exports = TextInputCanvas;