
class WritingSpace {
  constructor () {

  }

  render(child, node) {
    if (!node) return;
    node.innerHTML = (typeof child === 'function' ? child() : child);
  }
}