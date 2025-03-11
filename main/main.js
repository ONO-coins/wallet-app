import { app, BrowserWindow, ipcMain, screen } from 'electron';
import serve from 'electron-serve';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { transaction } from 'ono-web/index.js';
import { exec } from 'child_process';
import {
    readOrCreateWalletSecret,
    createUserDataFile,
    readUserData,
    updateUserData,
    setDirname,
    getDirname,
} from '../lib/storage.lib.js';
import { DEFAULT_CORE_URL, DEFAULT_CORE_WS_URL } from '../constants/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let walletData = '';
let coreUrl = DEFAULT_CORE_URL;
let coreWsUrl = DEFAULT_CORE_WS_URL;

const startURL = app.isPackaged
    ? `file://${__dirname}/out/index.html` // If packaged, load static Next.js export
    : 'http://localhost:3050'; // During development

const appServe = app.isPackaged ? serve({ directory: join(__dirname, '../out') }) : null;

const createWindow = () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const win = new BrowserWindow({
        width: Math.round(width * 0.9),
        height: Math.round(height * 0.9),
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    if (app.isPackaged) {
        appServe(win).then(() => {
            win.loadURL('app://-');
        });
    } else {
        win.loadURL(startURL);
        win.webContents.openDevTools();
        win.webContents.on('did-fail-load', (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
};

app.on('ready', async () => {
    const userDataPath = app.getPath('userData');
    setDirname(userDataPath);

    await createUserDataFile();
    walletData = await readOrCreateWalletSecret();

    const userData = await readUserData();
    coreUrl = userData.coreUrl;
    coreWsUrl = userData.coreWsUrl;
    transaction.setCoreHost(coreUrl);

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('get-core-url', () => coreUrl);
ipcMain.handle('get-core-ws-url', () => coreWsUrl);
ipcMain.handle('set-core-url', (_, url) => {
    coreUrl = url;
});
ipcMain.handle('set-core-ws-url', (_, url) => {
    coreWsUrl = url;
});
ipcMain.handle('get-wallet-data', () => walletData);
ipcMain.handle('read-user-data', async () => readUserData());
ipcMain.handle('update-user-data', async (_, key, value) => updateUserData(key, value));
ipcMain.handle('get-dirname', () => {
    return __dirname;
});
ipcMain.handle('get-user-dirname', () => {
    return getDirname();
});
ipcMain.handle('generate-transaction', async (_, to, amount, keyPair) => {
    return transaction.generateTransaction(to, amount, keyPair);
});
ipcMain.handle('send-transaction', async (_, transactionData) => {
    return transaction.sendTransaction(transactionData);
});
ipcMain.handle('open-file', async (_, filePath) => {
    return new Promise((resolve, reject) => {
        let command;

        if (process.platform === 'win32') {
            // Windows: use 'start' command
            command = `start "" "${filePath}"`;
        } else if (process.platform === 'darwin') {
            // macOS: use 'open' command
            command = `open "${filePath}"`;
        } else {
            // Linux: use 'xdg-open' command
            command = `xdg-open "${filePath}"`;
        }

        exec(command, (error) => {
            if (error) {
                console.error('Error opening file:', error);
                reject(error);
            } else {
                resolve();
            }
        });
    });
});
