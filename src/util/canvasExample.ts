/*
这里封装一些基于canvasUtil的一些操作
 */
import {CanvasUtil, drawCircle, drawCurvePath} from "./canvasUtil";

export function armyWormFactory(size: number, maxMultipleSize = 1) {
    // 初始环境
    const defaultSetting = {
            width: size,
            height: size
        }, max = maxMultipleSize * size

    function armyWorm(offsetY: number = 0, canvasEl: HTMLCanvasElement, ro?: number) {

        const setting = {...defaultSetting}
        const rate = offsetY / max

        // 这个系数, 形变不会太难看
        if (offsetY / size > 2.7) {
            return
        }
        // 随便的两个居然弹性形变不变~
        setting.width = 0.5 * setting.width + (1 - rate) * 0.5 * setting.width
        setting.height = setting.height + offsetY

        // 上半圆半径
        const R = setting.width / 2,
            // 下半圆半径

            // 最少八分之一
            r = Math.max(R / 4, (size - rate * size * 7 / 8) / 2);

        // 这里用个反比来模拟一下泊松
        let curved = 0.2 / (R / r)

        const canvas = canvasEl ?? document.createElement('canvas')
        canvas.width = setting.width
        canvas.height = setting.height
        const ctx = canvas.getContext('2d')
        const ctx2 = canvas.getContext('2d')
        if (ctx) {
            const fillStyle_bak = ctx.fillStyle
            try {
                ctx.fillStyle = "#409eff" || "#e7e7e7"
                // 上半圆圆心
                const center: [number, number] = [R, R]
                // 下半圆圆心
                const center2: [number, number] = [R, canvas.height - r]
                const left: [number, number][] = [
                        [center[0] - R, center[1]],
                        [center2[0] - r, center2[1]]
                    ],
                    right: [number, number][] = [
                        [center[0] + R, center[1]],
                        [center2[0] + r, center2[1]]
                    ]

                ctx.beginPath()
                // 右边180度就是左边, 从左往右顺时针画圈
                drawCircle(ctx, center, R, 180, 360)
                // ctx.closePath()
                drawCurvePath(ctx, right[0], right[1], 0.2, -curved)
                drawCircle(ctx, center2, r, 0, 180)
                ctx.moveTo(left[1][0], left[1][1])
                drawCurvePath(ctx, left[1], left[0], 0.8, -curved)
                // 由于遵循'非零环绕填充规则', 所以多画一次半圆
                drawCircle(ctx, center, R, 180, 360)
                ctx.fill()

                if (ctx2) {
                    // 设置字体
                    ctx2.font = `${R}px bold PingFang-SC-Bold`;
                    // 设置颜色
                    ctx2.fillStyle = "#333";
                    // 设置水平对齐方式
                    ctx2.textAlign = "center";
                    // 设置垂直对齐方式
                    ctx2.textBaseline = "middle";
                    // if (ro) {
                    //     ctx2.translate(R, R)
                    //     ctx2.rotate(180 * Math.PI / 180)
                    // }
                    // 绘制文字（参数：要写的字，x坐标，y坐标）
                    // console.log(canvas.width)
                    // console.log(R)
                    ctx2.translate(R, R)
                    if (typeof ro === 'number') {
                        ctx2.rotate(1.5 * Math.PI - ro)
                    }
                    ctx2.fillText("a", 0, 0);

                    // ro && console.log(ro / Math.PI * 180)
                }
            } finally {
                ctx.fillStyle = fillStyle_bak
                if (!canvasEl) {
                    return canvas.toDataURL();
                }
                return canvas
            }
        }
        return null
    }

    return armyWorm

}

// export async function getImgSize(src: string) {
//     return (await new CanvasUtil().newImg(src)).src
// }