import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';
import { encrypt, generateKey } from './encryption';

const generateMnemonic = async (): Promise<{ mnemonic: string; publicKey: string; secretKey: number[]; encryptedMnemonic: string; key: string }> => {
    const mnemonic = bip39.generateMnemonic(128);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const key = generateKey();
    const encryptedMnemonic = encrypt(mnemonic, key);

    return {
        mnemonic,
        publicKey: keypair.publicKey.toBase58(),
        secretKey: Array.from(keypair.secretKey),
        encryptedMnemonic,
        key,
    };
};

export default generateMnemonic;
