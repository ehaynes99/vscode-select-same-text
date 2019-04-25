const vscode = require('vscode');

const getLastSelection = () => {
  const { selections } = vscode.window.activeTextEditor;
  return selections[selections.length - 1];
};

const selectedText = () => {
  const { document, selection } = vscode.window.activeTextEditor;
  return document.getText(selection);
};

const search = (start, end) => {
  const range = new vscode.Range(start, end);
  const editor = vscode.window.activeTextEditor;
  const { document, selections } = editor;
  const searchText = selectedText();

  const text = document.getText(
    new vscode.Range(new vscode.Position(0, 0), range.end)
  );
  const startIndex = document.offsetAt(range.start);
  const index = text.indexOf(searchText, startIndex);

  if (index >= 0) {
    const bounds = [
      document.positionAt(index),
      document.positionAt(index + searchText.length),
    ];
    if (selections[0].isReversed) {
      bounds.reverse();
    }
    const newSelection = new vscode.Selection(bounds[0], bounds[1]);
    editor.selections = [...editor.selections, newSelection];
    return true;
  }
};

const searchStartToFirst = () => {
  const { selections } = vscode.window.activeTextEditor;
  const start = new vscode.Position(0, 0);
  const end = selections[0].start;
  return search(start, end);
};

const searchLastToEnd = () => {
  const { document } = vscode.window.activeTextEditor;
  const start = getLastSelection().end;
  const end = document.lineAt(document.lineCount - 1).range.end;
  return search(start, end);
};

const searchLastToFirst = () => {
  const { selections } = vscode.window.activeTextEditor;
  if (selections.length > 1) {
    const start = getLastSelection().end;
    const end = selections[0].start;

    if (start.isBefore(end)) {
      search(start, end);
      return true;
    }
  }
};

const addNext = () => {
  searchLastToFirst() || searchLastToEnd() || searchStartToFirst();
};

module.exports = addNext;
