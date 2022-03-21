import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
// import styleImport, { VantResolve } from 'vite-plugin-style-import';
import {resolve} from "path";

function pathResolve(dir: string): string {
    return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                AntDesignVueResolver(),
            ],
        }),
        // styleImport({
        //     resolves: [VantResolve()],
        // }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.d.ts'],
        alias: {
            '@': pathResolve("src")
        }
    },
    base: "./",
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "src/style/mixins.scss";
                @import "src/style/variables.scss";
                `
            }
        }
    }
})
