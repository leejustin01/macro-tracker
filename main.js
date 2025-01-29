const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    const indexPath = path.resolve(__dirname, 'dist', 'index.html');
    console.log('Loading index.html from:', indexPath);

    win.loadFile(indexPath).then(() => {
        console.log('Successfully loaded index.html');
    }).catch((err) => {
        console.error("Error loading index.html:", err);
    });
};

const readFoods = () => {
    const filePath = path.join(process.cwd(), 'src', 'data', 'foods.json');
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    } else {
      return '[]';
    }
};

const writeFoods = foodsJSON => {
    const filePath = path.join(process.cwd(), 'src', 'data', 'foods.json');
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, foodsJSON, 'utf-8');
    }
};

app.whenReady().then(() => {
    // receive 'ping' from renderer, reply with 'pong'
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('get', () => readFoods());
    ipcMain.handle('put', async (event, foodsJSON) => {
        try {
            if (typeof foodsJSON !== 'string') {
                throw new TypeError("foodsJSON must be a string");
            }
            writeFoods(foodsJSON);
        } catch (error) {
            console.error("Error in 'put' handler:", error);
            throw error;
        }
    });

    createWindow()

    // for macOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    // not for macOS
    if (process.platform !== 'darwin') app.quit()
});





