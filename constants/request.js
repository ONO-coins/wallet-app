export const SERVICES = {
    API: 'api',
    CORE: 'core',
};

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export const HEADERS = {
    JSON: { 'Content-Type': 'application/json' },
};

export const ERRORS = {
    FAILED_REQUEST: 'Failed to fetch data',
};

export const REVALIDATE_SECONDS = 60;

export const PATHES = {
    REFRESH_TOKEN: '/common/auth/refresh',
    DOWNLOAD_SECRET: '/common/wallet/download',
    ADDRESSES: '/common/wallet/addresses',
    TRANSACTION: '/common/wallet/transaction',
    PURCHASE: '/common/purchase',
    USER: '/common/user/me',
    CORE_BALANCE: '/balance',
    CORE_GET_TRANSACTION: '/transaction/by-address',
};
