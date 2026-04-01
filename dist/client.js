const BASE_URL = "https://online.atol.ru/possystem/v5";
const TIMEOUT = 15_000;
const MAX_RETRIES = 3;
let cachedToken = null;
export async function getAtolToken() {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.token;
    }
    const login = process.env.ATOL_LOGIN;
    const password = process.env.ATOL_PASSWORD;
    if (!login || !password) {
        throw new Error("ATOL_LOGIN and ATOL_PASSWORD are required. Get credentials at https://online.atol.ru/");
    }
    const response = await fetch(`${BASE_URL}/getToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, pass: password }),
    });
    if (!response.ok) {
        throw new Error(`ATOL getToken failed: HTTP ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(`ATOL getToken error: ${data.error.text}`);
    }
    if (!data.token) {
        throw new Error("ATOL getToken returned no token");
    }
    // Token is valid for 24 hours, cache for 23 hours
    cachedToken = { token: data.token, expiresAt: Date.now() + 23 * 60 * 60 * 1000 };
    return data.token;
}
export function getGroupCode() {
    const groupCode = process.env.ATOL_GROUP_CODE;
    if (!groupCode) {
        throw new Error("ATOL_GROUP_CODE is required.");
    }
    return groupCode;
}
export async function atolPost(path, body) {
    const token = await getAtolToken();
    const groupCode = getGroupCode();
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT);
        try {
            const response = await fetch(`${BASE_URL}/${groupCode}${path}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Token": token,
                },
                body: JSON.stringify(body),
                signal: controller.signal,
            });
            clearTimeout(timer);
            if (response.ok)
                return response.json();
            if ((response.status === 429 || response.status >= 500) && attempt < MAX_RETRIES) {
                const delay = Math.min(1000 * 2 ** (attempt - 1), 8000);
                await new Promise(r => setTimeout(r, delay));
                continue;
            }
            if (response.status === 401) {
                cachedToken = null;
                throw new Error("ATOL: authentication failed. Check ATOL_LOGIN and ATOL_PASSWORD.");
            }
            throw new Error(`ATOL HTTP ${response.status}: ${response.statusText}`);
        }
        catch (error) {
            clearTimeout(timer);
            if (error instanceof DOMException && error.name === "AbortError" && attempt < MAX_RETRIES)
                continue;
            throw error;
        }
    }
    throw new Error("ATOL: all retry attempts exhausted");
}
export async function atolGet(path) {
    const token = await getAtolToken();
    const groupCode = getGroupCode();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);
    try {
        const response = await fetch(`${BASE_URL}/${groupCode}${path}`, {
            headers: { "Token": token },
            signal: controller.signal,
        });
        clearTimeout(timer);
        if (!response.ok) {
            throw new Error(`ATOL HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }
    catch (error) {
        clearTimeout(timer);
        throw error;
    }
}
//# sourceMappingURL=client.js.map