import { get, post } from '@/lib/request.lib';
import { SERVICES, PATHES } from '@/constants/request.js';

export async function getBalance(address) {
    const { result } = await get(SERVICES.CORE, `${PATHES.CORE_BALANCE}/${address}`);
    return result;
}

/**
 *
 * @typedef {Object} Options
 * @property {number} limit
 * @property {number} maxId
 * @property {number} skip
 * @property {string} direction
 */

/**
 * @param {string} address
 * @param {Options} options
 */
export async function getTransactions(address, options) {
    const { result, total } = await get(
        SERVICES.CORE,
        `${PATHES.CORE_GET_TRANSACTION}/${address}`,
        options,
    );
    return { result, total };
}
