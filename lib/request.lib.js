import { METHODS, HEADERS, ERRORS, SERVICES } from '@/constants/request.js';

function parseResponse(res) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) return res.json();
    return res.text();
}

async function req(url, body, options) {
    const { revalidate = 0, method = METHODS.GET } = options;

    const params = {
        method: method,
        headers: { ...HEADERS.JSON },
        next: { revalidate },
    };

    if (body) params.body = JSON.stringify(body);

    try {
        const res = await fetch(url, params);
        const result = await parseResponse(res);
        if (!res.ok) {
            throw new Error(result.error || ERRORS.FAILED_REQUEST);
        }
        const total = res.headers.get('x-total-count') || 0;
        return { result, total };
    } catch (error) {
        throw new Error(error.message);
    }
}

function appendQuery(url, query) {
    for (const key in query) {
        const paramValue = query[key];
        if (Array.isArray(paramValue)) {
            for (const value of paramValue) {
                url.searchParams.append(key, value);
            }
        } else {
            url.searchParams.append(key, query[key]);
        }
    }
}

async function getAPIUrl(service, path) {
    switch (service) {
        case SERVICES.API:
            return new URL(path, process.env.API_URL);
        case SERVICES.CORE:
            const coreUrl = await window.electronAPI.getCoreUrl();
            return new URL(path, coreUrl);
        default:
            return new URL(path, process.env.API_URL);
    }
}

async function prepareRequest(service, path, method, body = {}, query = {}) {
    const url = await getAPIUrl(service, path);
    appendQuery(url, query);
    return req(url, body, { method });
}

export async function get(service, path, query) {
    return prepareRequest(service, path, METHODS.GET, null, query);
}

export async function post(service, path, body = null) {
    return prepareRequest(service, path, METHODS.POST, body);
}

export async function put(service, path, body = null) {
    return prepareRequest(service, path, METHODS.PUT, body);
}

export async function del(service, path, body = null) {
    return prepareRequest(service, path, METHODS.DELETE, body);
}
