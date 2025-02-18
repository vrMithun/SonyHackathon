# 🚀 Bundle Next.js with Electron to Create an EXE File

This guide explains how to integrate **Next.js** with **Electron**, bundle the app, and generate a **Windows `.exe` file** using `electron-builder`.

---

## 📌 Prerequisites

Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **NPM** (Comes with Node.js)
- **Next.js Project** (or create one)

---

## 1️⃣ Install Next.js (Skip if You Already Have a Project)**

Create a new Next.js project:

## 2️⃣ Install Required Dependencies
Install Electron and required packages:

bash
```
npm install electron electron-builder wait-on concurrently
```
# What Each Package Does  </br>
-electron → Runs Electron </br>
-electron-builder → Packages and builds the .exe file </br>
-wait-on → Ensures Electron starts only after Next.js is ready </br>
-concurrently → Runs multiple scripts in parallel 

## 3️⃣ Create electron.js (Electron Main Process File)
Create an electro.js file in the root directory (/electron.js):
```
const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const appUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "out", "index.html")}`;

  mainWindow.loadURL(appUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

## 4️⃣ Modify package.json
Edit package.json and add the following:
```
"main": "electron.js",
"scripts": {
  "dev": "concurrently \"next dev\" \"wait-on http://localhost:3000 && electron .\"",
  "build": "next build && next export",
  "start": "next start",
  "electron": "electron .",
  "electron-pack": "electron-builder"
},
"build": {
  "asar": true,
  "files": [
    "next.config.js",
    "electron.js",
    "package.json",
    ".next/**/*"
  ],
  "win": {
    "target": "nsis",
    "icon": "public/icon.ico"
  },
  "mac": {
    "target": "dmg",
    "icon": "public/icon.icns"
  }
}
```
Explanation
"main": "electron.js" → Tells Electron which file to run.
"asar": true → Packages source files securely.
"win": { "target": "nsis" } → Builds a Windows installer (.exe).
"mac": { "target": "dmg" } → Builds a macOS installer.

## 5️⃣ Test the Electron App Locally
Run the following command:
~~~
npm run dev
~~~
If everything works, proceed to the next step.

## 6️⃣ Build Next.js for Production
Generate a static Next.js build:
```
npm run build
```
## 7️⃣ Package and Create an EXE File
Run the following command:
```
npm run electron-pack
```
The .exe file will be generated inside the /dist folder.
