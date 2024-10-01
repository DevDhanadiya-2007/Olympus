interface MnemonicResponse {
    message?: ReactNode,
    mnemonic: string,
    publicKey?: string
}
interface NeumorphicButtonProps {
    icon?: LucideIcon,
    title?: string,
    href: string
}
interface StarProps {
    id: number,
    top: string;
    left: string;
    size: string;
    delay: number;
}


export {
    MnemonicResponse,
    NeumorphicButtonProps,
    StarProps
}