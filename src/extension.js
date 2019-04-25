const vscode = require('vscode');
const addNext = require('./addNext');

const activate = context => {
  let disposable = vscode.commands.registerCommand(
    'extension.selectSameText',
    () => {
      try {
        addNext();
      } catch (error) {
        console.error(error);
      }
    }
  );

  context.subscriptions.push(disposable);
};
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
