import { wallet } from 'ono-web/index.js';

export async function createAddress() {
    const data = await window.electronAPI.readUserData();
    const index = data.addresses?.length ? data.addresses.length : 0;

    const seed = await window.electronAPI.getWalletData();
    const hdWallet = await wallet.hdWallet(seed);
    const newAddress = await wallet.generateKeyPair(hdWallet, index);
    const keys = {
        id: index,
        publicKey: newAddress.publicKey.toString('hex'),
        privateKey: newAddress.privateKey.toString('hex'),
    };
    const addresses = data.addresses || [];
    await window.electronAPI.updateUserData('addresses', [...addresses, keys]);
    return keys;
}

export async function getAddresses() {
    const data = await window.electronAPI.readUserData();
    if (data.addresses?.length) return data.addresses;

    const newAddress = await createAddress();
    return [newAddress];
}

export async function sendTransaction(from, to, amount) {
    const addresses = await getAddresses();
    const keyPair = addresses.find((address) => address.publicKey === from);
    const newTransaction = await window.electronAPI.generateTransaction(to, amount, keyPair);
    const response = await window.electronAPI.sendTransaction(newTransaction);
    return response;
}
