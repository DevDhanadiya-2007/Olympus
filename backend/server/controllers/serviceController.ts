import { Response, Request } from "express";

import generateMnemonic from "../../services/mnemonic";

const mnemonicService = async (req: Request, res: Response) => {
    if (!res.locals.isAuthenticated) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    try {
        const response = await generateMnemonic();
        res.status(200).json({
            message: "Generate Success",
            mnemonic: response?.mnemonic,
            publicKey: response?.publicKey
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate mnemonic" });
    }
};

export { mnemonicService };