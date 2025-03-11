import { get, post } from '@/lib/request.lib';
import { SERVICES, PATHES } from '@/constants/request.js';

export async function sendTransaction(from, to, amount) {
    const { result } = await post(SERVICES.API, `${PATHES.TRANSACTION}/transfer`, {
        from,
        to,
        amount,
    });
    return result;
}

export async function downloadSecret() {
    const { result } = await get(SERVICES.API, PATHES.DOWNLOAD_SECRET);
    return result;
}
