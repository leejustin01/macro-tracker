const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');
const path = require('node:path');
const { data } = require('react-router-dom');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('api', {
  readFoods: () => {
    const filePath = path.join(process.cwd(), 'src', 'data', 'foods.json');
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    } else {
      return '';
    }
  },

  writeFoods: foodsJSON => {
    const filePath = path.join(process.cwd(), 'src', 'data', 'foods.json');
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, foodsJSON, 'utf-8');
    }
  }
});
