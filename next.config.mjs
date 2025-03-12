import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    sassOptions: {
        includePaths: [path.join(__dirname, 'style')],
        prependData: `@use "@/style/mixins.scss";`,
    },
    env: {
        API_URL: process.env.API_URL,
        CORE_URL: process.env.CORE_URL,
        CORE_WS_URL: process.env.CORE_WS_URL,
    },
};

export default nextConfig;
