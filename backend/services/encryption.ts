import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

const generateKey = (): string => {
    return crypto.randomBytes(KEY_LENGTH).toString('hex');
};

export const createHash = async (key: string) => {
    return crypto.createHash('sha256').update(key).digest('hex')
}

export const encrypt = (text: string, key: string): string => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const keyBuffer = Buffer.from(key, 'hex')
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${encrypted.toString('hex')}:${tag.toString('hex')}`;
};

export const decrypt = (text: string, key: string): string => {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift() as string, 'hex');
    const encryptedText = Buffer.from(parts.shift() as string, 'hex');
    const authTag = Buffer.from(parts.shift() as string, 'hex');

    const keyBuffer = Buffer.from(key, 'hex')
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString('utf8');
};

export { generateKey };
