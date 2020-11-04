function Background() {
  const canvasEl = document.getElementById("background");
  const ctx = canvasEl.getContext("2d");
  window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    ctx.fillStyle = "#6c7e90";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }
  resizeCanvas();
  // canvasEl = addEventListener("")
}

module.exports = Background;