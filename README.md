# Select Same Text
`vscode-select-same-text`

https://marketplace.visualstudio.com/items?itemName=ehaynes99.vscode-select-same-text

The built-in command **Add Selection To Next Find Match** (`editor.action.addSelectionToNextFindMatch`) has oft-undesirable behavior in that it
honors the settings of the find dialog (case-sensitivity, whole-word, etc.). This extension adds a command to multi-select the next occurrence of the exact, case sensitive text that is currently selected.

# Usage
By default, the extension is bound to `cmd+shift+d` on mac, or `ctrl+shift+d` on windows/linux. To rebind, in keyboard shortcuts, change the binding for `Select Same Text`.

## Behavior:
* Does nothing if no text is selected
* Search downward from the last selection for an exact match
* Wrap around to the top if last occurrence is selected
* If the text was selected from right to left, the new selection will be as well
