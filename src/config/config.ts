import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), '.env')
})


export const config = {
    urls: {
        backendUrl: process.env.BACKEND_URL,
        frontendUrl: process.env.FRONTEND_URL
    }
}