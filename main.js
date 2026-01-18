const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');
const store = new Store();

let mainWindow;
let settingsWindow;

const defaultSettings = {
    color: '#ffffff',
    showSeconds: true,
    showDate: true,
    startup: true,
    timezone: 'local',
    size: 1 
};

function createMainWindow() {
    const saved = store.get('settings', defaultSettings);
    const scale = saved.size || 1;

    mainWindow = new BrowserWindow({
        // Width is generous, Height is now much tighter (shorter)
        width: Math.floor(550 * scale),
        height: Math.floor(180 * scale), 
        frame: false, 
        transparent: true, 
        alwaysOnTop: false, 
        focusable: true,   
        skipTaskbar: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('apply-settings', saved);
    });
}

ipcMain.on('save-settings', (event, newSettings) => {
    store.set('settings', newSettings);
    if (mainWindow) {
        const scale = newSettings.size || 1;
        // This physically resizes the window to match the new clock scale
        mainWindow.setSize(Math.floor(550 * scale), Math.floor(180 * scale));
        mainWindow.webContents.send('apply-settings', newSettings);
    }
    app.setLoginItemSettings({ openAtLogin: newSettings.startup });
});

// Settings Window & Helper logic
ipcMain.on('open-settings', () => {
    if (settingsWindow) { settingsWindow.focus(); return; }
    settingsWindow = new BrowserWindow({ width: 400, height: 550, title: "Settings", autoHideMenuBar: true, webPreferences: { nodeIntegration: true, contextIsolation: false } });
    settingsWindow.loadFile('settings.html');
    settingsWindow.on('closed', () => { settingsWindow = null; });
});
ipcMain.on('get-settings', (event) => { event.returnValue = store.get('settings', defaultSettings); });
app.whenReady().then(createMainWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });