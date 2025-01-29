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

contextBridge.exposeInMainWorld('food', {
  get: () => ipcRenderer.invoke('get'),
  put: foodsJSON => ipcRenderer.invoke('put', foodsJSON)
});
