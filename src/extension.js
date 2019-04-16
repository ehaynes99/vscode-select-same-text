// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const addSelection = (rowStart, colStart, rowEnd, colEnd) => {
  const editor = vscode.window.activeTextEditor;
  const start = new vscode.Position(rowStart, colStart);
  const end = new vscode.Position(rowEnd, colEnd);
  editor.selections = [
    ...editor.selections,
    new vscode.Selection(start, end),
  ];
};

const addNext = () => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    addSelection(2, 6, 2, 9);
    console.log('***** editor.selections:', editor.selections);
  }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "case-sensitive-add-to-selection" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.caseSensitiveAddSelectionToNextFindMatch',
    function() {
      // The code you place here will be executed every time your command is executed

      try {
        addNext();
      } catch (error) {
        console.error(error);
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
