/**
 * @param {string} address
 * @returns {string}
 */
export const toWsAddress = (address) => {
    if (!/^https?:\/\//i.test(address) && !/^ws?:\/\//i.test(address)) {
        return 'ws://' + address;
    }

    if (/^https:\/\//i.test(address)) {
        return 'wss://' + address.slice(8);
    }
    if (/^http:\/\//i.test(address)) {
        return 'ws://' + address.slice(7);
    }

    return address;
};

/**
 * @param {string} url
 * @returns {string}
 */
export const isValidURL = (url) => {
    const pattern = /^(https?|wss?):\/\/([^\s\/?#]+)([^\s?#]*)(\?[^\s#]*)?(#.*)?$/;
    return pattern.test(url);
};
