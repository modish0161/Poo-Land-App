const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, '../frontend/public/icon-512.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // In production, load the built React app
  // In development, you might want to load localhost:5173
  // For this setup, we'll assume we want to wrap the live web version or a local build
  
  // Option 1: Load local dev server (for testing)
  // win.loadURL('http://localhost:5173');

  // Option 2: Load production build (recommended for distribution)
  // We need to point to the frontend/dist/index.html
  // But first, the user needs to build the frontend.
  
  // For now, let's try to load the dev server if available, or fall back to a file
  win.loadURL('http://localhost:5173').catch(() => {
      console.log('Dev server not running, trying to load build...');
      win.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
