const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');
const path = require('node:path');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('api', {
  readFoods: () => {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'foods.json');
    return fs.readFileSync(dataPath, 'utf-8');
  }
});
