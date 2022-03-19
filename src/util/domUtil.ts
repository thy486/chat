/**
 * @非零环绕填充规则: 如果想知道某一区域是否被填充，就从这一区域画一条直线向外，在与其他线的交点处，如果其他线是顺时针方向画的，就+1，逆时针则-1，如果最后总和为0，则不会填充，非零则填充。
 */


// 自动获取下一个input的焦点
export function autoFocusInput(e: KeyboardEvent): void {
    // 只监听回车
    if (e.code === 'Enter') {
        const el = <HTMLInputElement | null>(e.target instanceof HTMLInputElement ? e.target : null)
        if (el) {
            const inputList = document.querySelectorAll('input')
            for (let i = 0; i < inputList.length; i++) {
                if (
                    inputList[i] === el &&
                    inputList.length > i + 1 &&
                    ['text', 'password', 'textarea'].includes(inputList[i + 1].getAttribute('type') ?? '')
                ) {
                    inputList[i + 1].focus()
                    return
                }
            }
            el.blur()
            return
        }
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
// function drawCurvePath(
//     ctx: CanvasRenderingContext2D,
//     start: [number, number],
//     end: [number, number],
//     curvedX: number = 0,
//     curvedY: number = 0
// ): void {
//     // 计算中间控制点
//     let cp = [
//         (start[0] + (end[0] - start[0]) * curvedX) - (start[1] - end[1]) * curvedY,
//         (start[1] + (end[1] - start[1]) * curvedX) - (end[0] - start[0]) * curvedY
//     ];
//     ctx.moveTo(start[0], start[1]);
//     ctx.quadraticCurveTo(
//         cp[0], cp[1],
//         end[0], end[1]
//     );
//     // ctx.stroke()
// }

function newImg(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = document.createElement('img')
        img.src = src
        img.crossOrigin = "anonymous";
        img.onload = () => {
            resolve(img)
        }
    })
}
//
// async function screenshot(img: HTMLImageElement | string, start: [number, number], end: [number, number]) {
//     return await shot(typeof img === 'string' ? img : img.src)
//
//     function shot(src: string): Promise<string> {
//         return new Promise(resolve => {
//             const canvas = document.createElement('canvas')
//             const ctx = canvas.getContext('2d')
//             if (ctx) {
//                 try {
//                     if (start[0] === end[0] || start[1] === end[1]) {
//                         resolve('')
//                         return
//                     }
//                     // 从左往右画
//                     if (start[0] > end[0]) {
//                         [start, end] = [end, start]
//                     }
//                     const width = end[0] - start[0]
//
//                     // 获取图像左上角坐标
//                     if (start[1] > end[1]) {
//                         [start, end] = [[start[0], end[1]], [end[0], start[1]]]
//                     }
//                     const height = end[1] - start[1]
//                     canvas.width = width
//                     canvas.height = height
//                     console.log(start, end, width, height)
//                     const img = new Image()
//                     img.src = src
//                     img.crossOrigin = "anonymous";
//                     img.onload = () => {
//                         ctx.drawImage(img, start[0], start[1], width, height, 0, 0, width, height)
//                         resolve(canvas.toDataURL())
//                     }
//                     img.onerror = (e) => {
//                         resolve('')
//                     }
//                 } catch(e) {
//                     resolve('')
//                 }
//             } else {
//                 resolve('')
//             }
//         })
//     }
// }

async function stretchImg (img: HTMLImageElement | string, requireParam: {width: number} | {height: number}) {

}

// export function drawCircle(
//     ctx: CanvasRenderingContext2D,
//     center: [number, number],
//     radius: number,
//     startAngle: number = 0, endAngle = 360,
// ) {
//     startAngle = startAngle * Math.PI / 180
//     endAngle = endAngle * Math.PI / 180
//     ctx.arc(center[0], center[1], radius, startAngle, endAngle)
// }

// qq粘虫效果
// export function armyWormFactory(size: number, maxMultipleSize = 1) {
//     // 初始环境
//     const defaultSetting = {
//         width: size,
//         height: size
//     }, max = maxMultipleSize * size
//
//     function armyWorm(offsetY: number = 0, canvasEl?: HTMLCanvasElement, ro?: number) {
//
//         const setting = {...defaultSetting}
//         const rate = offsetY / max
//
//         // 这个系数, 形变不会太难看
//         if (offsetY / size > 2.7) {
//             return
//         }
//         // 随便的两个居然弹性形变不变~
//         setting.width = 0.5 * setting.width + (1 - rate) * 0.5 * setting.width
//         setting.height = setting.height + offsetY
//
//         // 上半圆半径
//         const R = setting.width / 2,
//             // 下半圆半径
//
//             // 最少八分之一
//             r = Math.max(R / 4, (size - rate * size * 7 / 8) / 2);
//
//         // 这里用个反比来模拟一下泊松
//         let curved = 0.2 / (R / r)
//
//         const canvas = canvasEl ?? document.createElement('canvas')
//         canvas.width = setting.width
//         canvas.height = setting.height
//         const ctx = canvas.getContext('2d')
//         const ctx2 = canvas.getContext('2d')
//         if (ctx) {
//             const fillStyle_bak = ctx.fillStyle
//             try {
//                 ctx.fillStyle = "#409eff" || "#e7e7e7"
//                 // 上半圆圆心
//                 const center: [number, number] = [R, R]
//                 // 下半圆圆心
//                 const center2: [number, number] = [R, canvas.height - r]
//                 const left: [number, number][] = [
//                         [center[0] - R, center[1]],
//                         [center2[0] - r, center2[1]]
//                     ],
//                     right: [number, number][] = [
//                         [center[0] + R, center[1]],
//                         [center2[0] + r, center2[1]]
//                     ]
//
//                 ctx.beginPath()
//                 // 右边180度就是左边, 从左往右顺时针画圈
//                 drawCircle(ctx, center, R, 180, 360)
//                 // ctx.closePath()
//                 drawCurvePath(ctx, right[0], right[1], 0.2, -curved)
//                 drawCircle(ctx, center2, r, 0, 180)
//                 ctx.moveTo(left[1][0], left[1][1])
//                 drawCurvePath(ctx, left[1], left[0], 0.8, -curved)
//                 // 由于遵循'非零环绕填充规则', 所以多画一次半圆
//                 drawCircle(ctx, center, R, 180, 360)
//                 ctx.fill()
//
//                 if (ctx2) {
//                     // 设置字体
//                     ctx2.font = `${R}px bold PingFang-SC-Bold`;
//                     // 设置颜色
//                     ctx2.fillStyle = "#333";
//                     // 设置水平对齐方式
//                     ctx2.textAlign = "center";
//                     // 设置垂直对齐方式
//                     ctx2.textBaseline = "middle";
//                     // if (ro) {
//                     //     ctx2.translate(R, R)
//                     //     ctx2.rotate(180 * Math.PI / 180)
//                     // }
//                     // 绘制文字（参数：要写的字，x坐标，y坐标）
//                     // console.log(canvas.width)
//                     // console.log(R)
//                     ctx2.translate(R, R)
//                     if (typeof ro === 'number') {
//                         ctx2.rotate(1.5 * Math.PI - ro)
//                     }
//                     ctx2.fillText("a", 0, 0);
//
//                     // ro && console.log(ro / Math.PI * 180)
//                 }
//             } finally {
//                 ctx.fillStyle = fillStyle_bak
//                 if (!canvasEl) {
//                     return canvas.toDataURL();
//                 }
//                 return canvas
//             }
//         }
//         return null
//     }
//
//     return armyWorm
//
// }

/**
 *
 * @param p0
 * @param p1
 * @param p2
 * @param t [0~1]
 */
function quadraticBezier(p0: number, p1: number, p2: number, t: number) {
    let k = 1 - t;
    return k * k * p0 + 2 * t * (1 - t) * p1 + t * t * p2;    // 这个方程就是二次贝赛尔曲线方程
}


export default {
    autoFocusInput,
}