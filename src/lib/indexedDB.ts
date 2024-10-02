import { openDB } from 'idb';

const dbPromise = openDB('wallet-db', 1, {
    upgrade(db) {
        db.createObjectStore('mnemonics', {
            keyPath: 'id',
        });
    },
});

export const saveMnemonic = async (id: string, mnemonic: string) => {
    const db = await dbPromise;
    await db.put('mnemonics', { id, mnemonic });
};

export const getMnemonic = async (id: string) => {
    const db = await dbPromise;
    return await db.get('mnemonics', id);
};

export const deleteMnemonic = async (id: string) => {
    const db = await dbPromise;
    await db.delete('mnemonics', id);
};
