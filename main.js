const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 500,       
    height: 500,      
    resizable: true, 
    maximizable: true, 
    minimizable: true,  
    alwaysOnTop: true,  
    frame: true,        
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
