import { Response, Request } from "express";
import generateMnemonic from "../../services/mnemonic";
import { encrypt, generateKey } from "../../services/encryption";

const mnemonicService = async (req: Request, res: Response) => {
    try {
        const response = await generateMnemonic();
        const key = generateKey();
        const encryptedMnemonic = encrypt(response.mnemonic, key);

        res.status(200).json({
            message: "Generation Success",
            mnemonic: response.mnemonic,
            publicKey: response.publicKey,
            encryptedMnemonic,
            key
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate mnemonic" });
    }
};

export { mnemonicService };
