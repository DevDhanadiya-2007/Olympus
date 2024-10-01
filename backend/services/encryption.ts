import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

export const encryptMnemonic = (mnemonic: string, encryptionKey: Buffer) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey, iv);
    let encrypted = cipher.update(mnemonic, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    const authTag = cipher.getAuthTag();
    return {
        iv: iv.toString('base64'),
        encryptedData: encrypted,
        authTag: authTag.toString('base64')
    };
};

export const decryptMnemonic = (encryptedData: string, iv: string, authTag: string, encryptionKey: Buffer) => {
    const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey, Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(authTag, 'base64'));
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
