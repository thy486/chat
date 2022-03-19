type ImageOnloadFunc = (img: HTMLImageElement, e: Event) => any

class ImageUtil {
    img: HTMLImageElement

    constructor() {
        this.img = new Image()
        this.img.crossOrigin = "anonymous"
    }

    async create(src: string): Promise<HTMLImageElement> {
        const self = this
        return new Promise((resolve, rejects) => {
            self.img_hook(src, img => {
                resolve(img)
            }, (e) => {
                rejects('不是有效的图片地址!')
            })
        })
    }

    async isImg(src: string): Promise<boolean> {
        const self = this
        return new Promise(resolve => {
            self.img_hook(src, () => {
                resolve(true)
            }, () => {
                resolve(false)
            })
        })
    }

    img_hook(src: string, onload: ImageOnloadFunc, onerror?: OnErrorEventHandler) {
        const img = this.img
        img.src = src
        onerror && (img.onerror = onerror)
        img.onload = (e) => {
            onload(img, e)
        }
    }
}

export default ImageUtil