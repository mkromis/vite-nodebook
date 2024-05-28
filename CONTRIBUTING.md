# Contributing to the Notebook Renderers extension for Visual Studio Code

## Contributing a pull request

### Prerequisites

1. [Node.js](https://nodejs.org/) 18
1. npm >= 10
1. Windows, macOS, or Linux
1. [Visual Studio Code](https://code.visualstudio.com/)
1. The following VS Code extensions:
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### Setup

```shell
git clone https://github.com/DonJayamanne/typescript-notebook
cd typescript-notebook
npm ci
```

If you see warnings that `The engine "vscode" appears to be invalid.`, you can ignore these.

### Incremental Build

Run the `Build` build Tasks from the [Run Build Task...](https://code.visualstudio.com/docs/editor/tasks) command picker (short cut `CTRL+SHIFT+B` or `⇧⌘B`). This will leave build task running in the background and which will re-run as files are edited and saved. You can see the output from either task in the Terminal panel (use the selector to choose which output to look at).

For incremental builds you can use the following commands depending on your needs:

```shell
npm run dev
```

### Errors and Warnings

TypeScript errors and warnings will be displayed in the `Problems` window of Visual Studio Code.

## Local Build

Steps to build the extension on your machine once you've cloned the repo:

```shell
> npm install -g vsce
> npm ci
> npm run package
```

## Install Problem

If there are issues loading tensorflow, and danfojs-node you may need to remove it from package.json, then add it later.

```powershell
> npm install -g vsce node-gyp
# remove from @tensorflow/tfjs-vis from package.json
> npm install --legacy-peer-deps
# Everything should have installed without error, so add it back in
> npm install --legacy-peer-deps @tensorflow/tfjs-vis@latest
> npm run postinstall
# then run build
```
