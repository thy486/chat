import ImageUtil from "./imageUtil";

export class CanvasUtil {
    canvas: HTMLCanvasElement;
    imageUtil: ImageUtil;

    constructor(imgUtil?: ImageUtil) {
        this.canvas = document.createElement('canvas')
        this.imageUtil = imgUtil ?? new ImageUtil()
    }

    async screenshot(img: HTMLImageElement | string, start: [number, number], end: [number, number]): Promise<string> {
        const src = typeof img === 'string' ? img : img.src
        const canvas = this.canvas
        const ctx = canvas.getContext('2d')
        const that = this
        return new Promise(resolve => {
            if (ctx) {
                try {
                    if (start[0] === end[0] || start[1] === end[1]) {
                        resolve('')
                        return
                    }
                    // 从左往右画
                    if (start[0] > end[0]) {
                        [start, end] = [end, start]
                    }
                    const width = end[0] - start[0]

                    // 获取图像左上角坐标
                    if (start[1] > end[1]) {
                        [start, end] = [[start[0], end[1]], [end[0], start[1]]]
                    }
                    const height = end[1] - start[1]
                    canvas.width = width
                    canvas.height = height
                    that.imageUtil.img_hook(src, (img) => {
                        ctx.drawImage(img, start[0], start[1], width, height, 0, 0, width, height)
                        resolve(canvas.toDataURL())
                    }, () => {
                        resolve('')
                    })
                } catch (e) {
                    resolve('')
                } finally {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                }
            } else {
                resolve('')
            }
        })
    }
}

/**
 * 贝塞尔曲线
 * @param ctx {CanvasRenderingContext2D}  canvas2d 上下文
 * @param start { [number, number] } 起点
 * @param end { [number, number] } 终点
 * @param curvedX { number } 中心点 x 轴偏移度(0 ~ 1)
 * @param curvedY { number } 中心点 y 轴偏移度(0 ~ 1)
 */
export function drawCurvePath(
    ctx: CanvasRenderingContext2D,
    start: [number, number],
    end: [number, number],
    curvedX: number = 0,
    curvedY: number = 0
): void {
    // 计算中间控制点
    let cp = [
        (start[0] + (end[0] - start[0]) * curvedX) - (start[1] - end[1]) * curvedY,
        (start[1] + (end[1] - start[1]) * curvedX) - (end[0] - start[0]) * curvedY
    ];
    ctx.moveTo(start[0], start[1]);
    ctx.quadraticCurveTo(
        cp[0], cp[1],
        end[0], end[1]
    );
    // ctx.stroke()
}

/**
 *
 * @param ctx
 * @param center 圆心
 * @param radius 半径
 * @param startAngle 起始角度, 0为最右边，顺时针
 * @param endAngle 结束角度
 */
export function drawCircle(
    ctx: CanvasRenderingContext2D,
    center: [number, number],
    radius: number,
    startAngle: number = 0, endAngle = 360,
) {
    startAngle = startAngle * Math.PI / 180
    endAngle = endAngle * Math.PI / 180
    ctx.arc(center[0], center[1], radius, startAngle, endAngle)
}

export default CanvasUtil