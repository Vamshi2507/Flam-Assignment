class DrawingState {
  constructor() {
    this.history = [];
    this.redoStack = [];
  }

  addStroke(stroke) {
    this.history.push(stroke);
    this.redoStack = [];
  }

  undo() {
    if (this.history.length) this.redoStack.push(this.history.pop());
  }

  redo() {
    if (this.redoStack.length) this.history.push(this.redoStack.pop());
  }

  getState() {
    return this.history;
  }
}

module.exports = { DrawingState };
