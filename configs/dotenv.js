import env from "dotenv";
env.config();

const dotenv = {
    PORT : process.env.port,
    MONGODB_URL : process.env.MONGODB_URL
}

export default dotenv;