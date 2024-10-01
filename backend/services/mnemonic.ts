import * as bip39 from "bip39"
import { Keypair } from "@solana/web3.js"

const generateMnemonic = async () => {
    try {
        const mnemonic = bip39.generateMnemonic(128)
        const seed = await bip39.mnemonicToSeed(mnemonic)
        const keypair = Keypair.fromSeed(seed.slice(0, 32))
        return {
            mnemonic,
            publicKey: keypair.publicKey.toBase58(),
            secretKey: Array.from(keypair.secretKey)
        }
    } catch (error) {
        console.log(`Error generation Keypair ${error}`)
    }
}
export default generateMnemonic