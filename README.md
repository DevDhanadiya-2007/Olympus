# 🌐 Olympus

Welcome to **Olympus**! 🎉  
An ambitious real-time project where users can create, manage, and view their crypto wallets 🪙. Olympus is a multipurpose-driven website aiming to empower users with the ability to manage crypto transactions effortlessly. 🌍✨

---

## ⚡ Features

💼 **Create & Manage Wallets**  
    - Easily generate new crypto wallets, view wallet details, and keep track of transactions in real-time. 🕒

🔍 **Real-Time Insights**  
    - Get up-to-date information on your wallets and their performance. 📊

🛠️ **Future Features** (coming soon 🚀):
- **Transactions History** 📜  
    - Keep track of all your past transactions with a detailed history log.
- **Integrated Crypto Exchange** 💱  
    - Exchange your crypto seamlessly within Olympus.
- **Enhanced Security** 🛡️  
    - Multi-factor authentication (MFA) for added security.

---

## 🛠️ Tech Stack

Olympus is built using the following cutting-edge technologies:

- **Next.js** 🏗️ - For a powerful and scalable front-end framework.
- **Express.js** 🚀 - To handle backend routing and APIs.
- **TypeScript** 🔧 - Strict type checking for better code maintainability.
- **Custom Authentication** 🔒 - Secure, efficient, and built from scratch!

---

## 🚀 Getting Started

### Folder Strucutre

```
└── 📁olympus-deploy
    └── 📁.git
    └── 📁backend
        └── 📁server
            └── 📁controllers
                └── authController.ts
                └── serviceController.ts
            └── 📁middleware
                └── authMiddleware.ts
            └── 📁model
                └── model.ts
            └── 📁routes
                └── authRoutes.ts
                └── walletRoutes.ts
            └── 📁utils
                └── database.ts
                └── envExports.ts
                └── passport.ts
            └── server.ts
        └── 📁services
            └── encryption.ts
            └── mnemonic.ts
        └── 📁types
            └── express.d.ts
    └── 📁src
        └── 📁app
            └── 📁api
                └── 📁auth
                    └── 📁google-auth-callback
                        └── page.tsx
                    └── 📁login
                        └── page.tsx
                    └── 📁signup
                        └── page.tsx
                    └── 📁user-warning
                        └── page.tsx
                └── 📁wallet
                    └── 📁(wallets)
                        └── 📁create-wallet
                            └── page.tsx
                        └── 📁import-wallet
                            └── page.tsx
                    └── layout.tsx
                    └── page.tsx
            └── 📁dashboard
                └── 📁@create
                    └── page.tsx
                └── 📁@manage
                    └── page.tsx
                └── 📁@settings
                    └── page.tsx
                └── layout.tsx
                └── page.tsx
            └── globals.css
            └── layout.tsx
            └── page.tsx
        └── 📁components
            └── 📁ui
                └── button.tsx
                └── card.tsx
                └── checkbox.tsx
                └── dropdown-menu.tsx
                └── progress.tsx
                └── skeleton.tsx
                └── tooltip.tsx
            └── Navbar.tsx
        └── 📁hooks
            └── useAuth.tsx
        └── 📁lib
            └── dbActions.ts
            └── indexedDB.ts
            └── utils.ts
        └── 📁public
            └── bg.jpg
        └── 📁store
            └── 📁slice
                └── authSlice.ts
            └── ReduxProviderWrapper.tsx
            └── store.ts
        └── 📁types
            └── index.d.ts
    └── .env
    └── .gitignore
    └── components.json
    └── next.config.mjs
    └── nodemon.json
    └── package.json
    └── pnpm-lock.yaml
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.ts
    └── tsconfig.json
    └── tsconfig.server.json
```

### Clone the repository

```bash
git clone https://github.com/DevDhanadiya-2007/olympus.git
cd olympus
