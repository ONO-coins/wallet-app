import { wallet } from 'ono-web/index.js';
import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { DEFAULT_CORE_URL, DEFAULT_CORE_WS_URL } from '../constants/core.js';

let dirname = null;

export const setDirname = (name) => {
    dirname = name;
};

export const getDirname = () => {
    return dirname;
};

export const readOrCreateWalletSecret = async () => {
    const secretPath = path.join(dirname, '/secrets/secret.txt');
    try {
        const seed = await fsPromises.readFile(secretPath, 'utf8');
        return seed;
    } catch (err) {
        const newWalletData = await wallet.newWalletData();

        const dirPath = path.join(dirname, '/secrets');
        const existed = fs.existsSync(dirPath);
        if (!existed) await fsPromises.mkdir();

        await fsPromises.appendFile(secretPath, newWalletData.seed);
        return newWalletData.seed;
    }
};

export const createUserDataFile = async () => {
    const filePath = path.join(dirname, '/secrets/data.json');

    const dirPath = path.join(dirname, '/secrets');
    const existed = fs.existsSync(dirPath);
    if (!existed) await fsPromises.mkdir(dirPath);

    const fileExisted = fs.existsSync(filePath);
    if (!fileExisted)
        await fsPromises.appendFile(
            filePath,
            JSON.stringify({
                coreUrl: DEFAULT_CORE_URL,
                coreWsUrl: DEFAULT_CORE_WS_URL,
                addresses: [],
            }),
        );
};

export const readUserData = async () => {
    const filePath = path.join(dirname, '/secrets/data.json');
    const data = await fsPromises.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

export const writeUserData = async (data) => {
    const filePath = path.join(dirname, '/secrets/data.json');
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export const updateUserData = async (key, value) => {
    const data = await readUserData();
    data[key] = value;
    await writeUserData(data);
};
