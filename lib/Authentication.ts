// lib/Authentication.ts
export async function getAuthToken(username: string, apiKey: string): Promise<string> {
    const time = Math.floor(Date.now() / 1000);
    const token = hashHmac("sha256", `${username}::${apiKey}::${time}`, apiKey);
    return token;
}

function hashHmac(algorithm: string, data: string, key: string): string {
    // Your HMAC hashing implementation
    // You can use Node.js crypto library or another library of your choice
    // Example using Node.js crypto library:
    const crypto = require('crypto');
    const hmac = crypto.createHmac(algorithm, key);
    hmac.update(data);
    return hmac.digest('hex');
}
