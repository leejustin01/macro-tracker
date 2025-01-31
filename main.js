const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs');

const createWindow = page => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: __dirname + '/foodscale.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    win.setIcon(path.resolve(__dirname, 'public', 'foodscale.png'));

    win.loadFile(page).then(() => {
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

const writeFoods = (foodsJSON, backup) => {
    var filePath;
    if (backup) filePath = path.join(process.cwd(), 'src', 'data', 'foodsBackup.json');
    else filePath = path.join(process.cwd(), 'src', 'data', 'foods.json');
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, foodsJSON, 'utf-8');
    }
};

const readGoals = () => {
    const filePath = path.join(process.cwd(), 'src', 'data', 'goals.json');
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    } else {
      return '[0, 0, 0, 0]';
    }
};

const writeGoals = (goalsJSON, backup) => {
    var filePath;
    if (backup) filePath = path.join(process.cwd(), 'src', 'data', 'goalsBackup.json');
    else filePath = path.join(process.cwd(), 'src', 'data', 'goals.json');
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, goalsJSON, 'utf-8');
    }
};

app.whenReady().then(() => {
    ipcMain.handle('getFood', () => readFoods());
    ipcMain.handle('putFood', async (event, foodsJSON) => {
        try {
            if (typeof foodsJSON !== 'string') {
                throw new TypeError("foodsJSON must be a string");
            }
            writeFoods(foodsJSON, false);
        } catch (error) {
            console.error("Error in 'putFoods' handler:", error);
            throw error;
        }
    });
    ipcMain.handle('getGoals', () => readGoals());
    ipcMain.handle('putGoals', async (event, goalsJSON) => {
        try {
            if (typeof goalsJSON !== 'string') {
                throw new TypeError("goalsJSON must be a string");
            }
            writeGoals(goalsJSON, false);
        } catch (error) {
            console.error("Error in 'putGoals' handler:", error);
            throw error;
        }
    });

    createWindow(path.resolve(__dirname, 'dist', 'index.html'));

    // for macOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    // not for macOS
    if (process.platform !== 'darwin') app.quit()
});




