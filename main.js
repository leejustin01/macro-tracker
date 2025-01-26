const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    const indexPath = path.resolve(__dirname, 'dist', 'index.html');
    console.log('Loading index.html from:', indexPath);

    win.loadFile(indexPath).then(() => {
        console.log('Successfully loaded index.html');
    }).catch((err) => {
        console.error("Error loading index.html:", err);
    });
}

app.whenReady().then(() => {
    // receive 'ping' from renderer, reply with 'pong'
    ipcMain.handle('ping', () => 'pong')

    createWindow()

    // for macOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    // not for macOS
    if (process.platform !== 'darwin') app.quit()
})





