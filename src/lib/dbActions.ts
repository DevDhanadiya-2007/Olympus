import { openDB } from "idb";

const checkIndexedDbForMnemonic = async (): Promise<boolean> => {
    try {
        const db = await openDB('wallet-db', undefined, {
            blocking() {
                return false
            }
        })
        if (!db.objectStoreNames.contains('mnemonics')) {
            console.log("Object store does not exists")
            return false
        }
        const mnemonic = await db.get('mnemonics', 'user-mnemonic')
        if (mnemonic) {
            console.log("Mnemonic stored already")
            return true
        } else {
            console.log("Mnemonic not found")
            return false
        }
    } catch (error) {
        console.log("Error occured in IndexedDB", error)
        return false
    }
}
export {
    checkIndexedDbForMnemonic
}