import {defineStore} from 'pinia'
import CanvasUtil from "../util/canvasUtil";
import ImageUtil from "../util/imageUtil";
import defaultBubble from "../assets/bubble/0111简约宇航员_1.png"
import {Bubble, EFontSize} from "../type/Diy";
import {reactive} from "vue";

export const sys_store = defineStore('system', {
    state: () => {
        const imageUtil = new ImageUtil()
        return {
            loading: false,
            isMobile: false,
            imageUtil,
            canvasUtil: new CanvasUtil(imageUtil),
        }
    },
    getters: {}
    ,
    actions: {
        loadingBegin() {
            this.loading = true
        },
        loadingEnd() {
            this.loading = false
        },
        listener(width: number) {
            this.isMobile = width >= 600 ? false : true
        }
    }
})
export const chat_store = defineStore('chat', {
    state: () => ({}),
    getters: {
        /*        举例
                example(state) {
                    return state
                }*/
    }
    ,
    actions: {}
})

export const user_diy_store = defineStore('user_diy', {
    state: () => {
        const _state: {
            bubble: Bubble,
            fontSize: EFontSize
        } = {
            bubble: reactive({
                url: "https://avatar-img.wuhan716.com/dress/%E7%94%9C%E7%94%9C%E5%85%94%E7%86%8A%E6%81%8B.png"
            }),
            fontSize: EFontSize.Default
        }
        return _state
    },
    getters: {},
    actions: {
        async setBubble(url: string, bgColor?: string) {
            if (await sys_store().imageUtil.isImg(url)) {
                this.bubble.url = url
                if (bgColor) this.bubble.bgColor = bgColor
            }
        },
    }
})

export default {
    sys_store,
    chat_store
}