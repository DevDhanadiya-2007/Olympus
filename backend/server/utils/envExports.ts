import dotenv from "dotenv"
dotenv.config()

const PROD_URL_CALLBACK = process.env.PROD_URL_CALLBACK as string
const DEV_URL_CALLBACK = process.env.DEV_URL_CALLBACK as string

export {
    PROD_URL_CALLBACK,
    DEV_URL_CALLBACK
}