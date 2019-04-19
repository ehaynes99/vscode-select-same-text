const assert = require('assert');
const extension = require('../src/extension');
const vscode = require('vscode');
const path = require('path');

// positions of the word 'test'
const testLocations = [
  new vscode.Selection(0, 13, 0, 17),
  new vscode.Selection(1, 18, 1, 22),
  new vscode.Selection(3, 11, 3, 15),
];

// positions of the term 'are\nnot'
const areNotLocations = [
  new vscode.Selection(2, 20, 3, 2),
  new vscode.Selection(4, 22, 5, 2),
];

const addNext = () => {
  vscode.commands.executeCommand(
    'extension.selectSameText'
  );
};

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {
  test('it searches to the end of the document', async () => {
    const editor = await setup();
    editor.selections = [testLocations[1]];
    addNext();
    await sleep();

    expectSelections(1, 2);

    const expected = testLocations.slice(1);
    const newSelections = vscode.window.activeTextEditor.selections;
    assert.deepEqual(newSelections, expected);
  });

  test('it searches from the start of the document', async () => {
    const editor = await setup();
    editor.selections = [testLocations[2]];
    addNext();
    await sleep();

    expectSelections(2, 0);
  });

  test('it searches between the selections', async () => {
    const editor = await setup();
    editor.selections = getLocations(2, 0);
    addNext();
    await sleep();

    expectSelections(2, 0, 1);
  });

  test('it does not add duplicates once all matches are found', async () => {
    const editor = await setup();
    editor.selections = getLocations(1, 2, 0);
    addNext();
    await sleep();

    expectSelections(1, 2, 0);
  });

  test('it selects in the same direction as the initial selection', async () => {
    const editor = await setup();
    editor.selections = [reverse(testLocations[0])];
    addNext();
    await sleep();

    const expected = [reverse(testLocations[0]), reverse(testLocations[1])];
    assert.deepEqual(editor.selections, expected);
  });

  test('it finds matches when search term is multiline', async () => {
    const editor = await setup();
    editor.selections = [areNotLocations[0]];
    addNext();
    await sleep();

    assert.deepEqual(editor.selections, areNotLocations);
  });

  const setup = async () => {
    const uri = vscode.Uri.file(path.join(__dirname, 'sample_text'));
    const document = await vscode.workspace.openTextDocument(uri);
    return await vscode.window.showTextDocument(document);
  };

  const expectSelections = (...testLocationIndexes) => {
    const expected = getLocations(...testLocationIndexes);
    const { selections } = vscode.window.activeTextEditor;
    assert.deepEqual(selections, expected);
  };

  const getLocations = (...testLocationIndexes) => {
    return testLocationIndexes.map(index => testLocations[index]);
  };

  const reverse = selection => {
    return new vscode.Selection(selection.active, selection.anchor);
  };
});

// lame... there has to be some way to ensure the action is done...
const sleep = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 200);
  });
};
