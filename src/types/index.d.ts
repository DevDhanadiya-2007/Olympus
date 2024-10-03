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
interface LayoutProps {
    create: React.ReactNode,
    manage: React.ReactNode,
    settings: React.ReactNode,
    children: React.ReactNode
}

export {
    MnemonicResponse,
    NeumorphicButtonProps,
    StarProps,
    LayoutProps
}