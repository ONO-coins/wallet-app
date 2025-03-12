import { get, post } from '@/lib/request.lib';
import { SERVICES, PATHES } from '@/constants/request.js';

export async function purchase(address, amount) {
    const { result } = await post(SERVICES.API, PATHES.PURCHASE, {
        address,
        amount,
    });
    return result;
}
