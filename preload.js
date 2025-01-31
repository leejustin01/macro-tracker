const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('food', {
  get: () => ipcRenderer.invoke('getFood'),
  put: foodsJSON => ipcRenderer.invoke('putFood', foodsJSON),
});

contextBridge.exposeInMainWorld('goal', {
  get: () => ipcRenderer.invoke('getGoals'),
  put: goalsJSON => ipcRenderer.invoke('putGoals', goalsJSON)
});
