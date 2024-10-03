import { openDB } from 'idb';

const isClient = typeof window !== 'undefined';

let dbPromise: any;
if (isClient) {
    dbPromise = openDB('wallet-db', 1, {
        upgrade(db) {
            db.createObjectStore('mnemonics', {
                keyPath: 'id',
            });
        },
    });
}

export const saveMnemonic = async (id: string, mnemonic: string) => {
    if (!isClient) return;
    const db = await dbPromise;
    await db.put('mnemonics', { id, mnemonic });
};

export const getMnemonic = async (id: string) => {
    if (!isClient) return null;
    const db = await dbPromise;
    return await db.get('mnemonics', id);
};

export const deleteMnemonic = async (id: string) => {
    if (!isClient) return;
    const db = await dbPromise;
    await db.delete('mnemonics', id);
};
