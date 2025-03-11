import Big from 'big.js';

import { TRANSACTION_FEE_PERCENT, MAX_TRANSACTION_FEE } from '@/constants/core.js';

export function calculateFee(amount) {
    if (!amount) return 0;

    const fee = Big(amount).times(TRANSACTION_FEE_PERCENT).toNumber();
    return Math.min(fee, MAX_TRANSACTION_FEE);
}
