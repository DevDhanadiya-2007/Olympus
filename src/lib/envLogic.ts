import dotenv from "dotenv"
dotenv.config()

const nodeEnv = process.env.NODE_ENV
const productionUrl = process.env.NEXT_PUBLIC_API_URL_PRODUCTION
const devUrl = process.env.NEXT_PUBLIC_API_URL

const baseUrl = () => {
    if (nodeEnv === 'production') {
        return productionUrl
    } else {
        return devUrl
    }
}
export default baseUrl