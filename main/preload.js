const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },
    getWalletData: () => ipcRenderer.invoke('get-wallet-data'),
    readUserData: () => ipcRenderer.invoke('read-user-data'),
    updateUserData: (key, value) => ipcRenderer.invoke('update-user-data', key, value),
    getCoreUrl: () => ipcRenderer.invoke('get-core-url'),
    getCoreWsUrl: () => ipcRenderer.invoke('get-core-ws-url'),
    setCoreUrl: (url) => ipcRenderer.invoke('set-core-url', url),
    setCoreWsUrl: (url) => ipcRenderer.invoke('set-core-ws-url', url),
    getDirname: () => ipcRenderer.invoke('get-dirname'),
    getUserDirname: () => ipcRenderer.invoke('get-user-dirname'),
    openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),
    generateTransaction: (from, to, amount) =>
        ipcRenderer.invoke('generate-transaction', from, to, amount),
    sendTransaction: (transaction) => ipcRenderer.invoke('send-transaction', transaction),
});
