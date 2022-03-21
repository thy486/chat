/**
 * @非零环绕填充规则: 如果想知道某一区域是否被填充，就从这一区域画一条直线向外，在与其他线的交点处，如果其他线是顺时针方向画的，就+1，逆时针则-1，如果最后总和为0，则不会填充，非零则填充。
 */
import {TMEvent} from "../type/Dom";
import {start} from "repl";


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

interface EventInfo {
    clientXStart: number,
    clientYStart: number,
    clientXEnd: number,
    clientYEnd: number,
    lastClientX: number,
    lastClientY: number,
    lastMoveTm: number,
    scrollTop: number,
    moveList: [number, number, number][],
}

type HandelStartFunc = (startX: number, startY: number, event?: Event) => void
type HandelMoveFunc = (moveX: number, moveY: number, event?: Event) => boolean | undefined | void
type HandelEndFunc = (info: EventInfo, event?: Event) => any | Promise<any>

enum ScrollStatus {
    Initial,
    Started,
    Waiting,
}

export class BetterScroll {
    el: HTMLElement;
    info: EventInfo;
    status: ScrollStatus

    handelStart: HandelStartFunc;
    handelMove: HandelMoveFunc;
    handelEnd: HandelEndFunc;
    CompatibleMouse?: boolean;
    overFlowHeight: number

    constructor(el: HTMLElement, {
        handelStart = () => {
        },
        handelMove = () => {
        },
        handelEnd = () => {
        },
        CompatibleMouse = undefined
    }: {
        handelStart?: HandelStartFunc,
        handelMove?: HandelMoveFunc,
        handelEnd?: HandelEndFunc,
        CompatibleMouse?: boolean
    }) {
        this.el = el

        el.ontouchstart = this.start.bind(this)
        el.onmousedown = this.start.bind(this)

        this.handelStart = handelStart
        this.handelMove = handelMove
        this.handelEnd = handelEnd
        this.CompatibleMouse = CompatibleMouse
        this.info = {
            scrollTop: 0,
            lastClientX: 0,
            lastClientY: 0,
            lastMoveTm: 0,
            clientXStart: 0,
            clientXEnd: 0,
            clientYStart: 0,
            clientYEnd: 0,
            moveList: [],
        }
        this.status = ScrollStatus.Initial
        this.overFlowHeight = 0
    }

    start(e: Event) {
        if (this.status === ScrollStatus.Initial) {
            this.info.moveList = []
            this.info.lastMoveTm = Date.now()
            this.info.scrollTop = this.el.scrollTop
            try {
                if (e instanceof TouchEvent) {
                    const touch = e.touches[0]
                    this.info.clientXStart = this.info.lastClientX = touch.clientX
                    this.info.clientYStart = this.info.lastClientY = touch.clientY
                    document.ontouchmove = this.move.bind(this)
                    document.ontouchend = this.end.bind(this)
                    this.handelStart(touch.clientX, touch.clientY, e)
                    return;
                } else if (e instanceof MouseEvent) {
                    this.info.clientXStart = this.info.lastClientX = e.clientX
                    this.info.clientYStart = this.info.lastClientY = e.clientY
                    document.onmousemove = this.move.bind(this)
                    document.onmouseup = this.end.bind(this)
                    this.handelStart(e.clientX, e.clientY, e)
                    return;
                }
            } finally {
                this.status = ScrollStatus.Started
            }
            this.status = ScrollStatus.Initial
            console.log(`不支持的event类型: `)
            console.log(e)
            this.handelStart(-1, -1, e)
        }
    }

    move(e: TMEvent) {
        if (this.status === ScrollStatus.Started) {
            const curTm = Date.now()
            const clientX = getClientX(e), clientY = getClientY(e)

            const moveX = clientX - this.info.lastClientX, moveY = clientY - this.info.lastClientY,
                moveTm = curTm - this.info.lastMoveTm

            this.info.scrollTop -= moveY
            if (e instanceof MouseEvent) {
                if (this.CompatibleMouse) {
                    this.el.scrollTo(0, this.info.scrollTop)
                }
            }

            this.info.moveList.push([moveX, moveY, moveTm])
            this.info.lastClientX = clientX
            this.info.lastClientY = clientY
            this.info.lastMoveTm = curTm
            if (this.handelMove(moveX, moveY, e) === false) {
                this.end(e)
            }
        }
    }

    async end(e: TMEvent) {
        if (this.status === ScrollStatus.Started) {
            if (e instanceof MouseEvent) {
                this.info.clientXEnd = e.clientX
                this.info.clientYEnd = e.clientY

                this.el.onmousemove = null
                this.el.onmouseup = null
                BetterScroll.#mouseEnd()
            } else {
                const touch = e.touches[0]
                this.info.clientXEnd = touch.clientX
                this.info.clientYEnd = touch.clientY
                BetterScroll.#touchEnd()
            }
            await this.handelEnd(this.info, e)
            this.setStatus(ScrollStatus.Initial)
        }
    }

    setStatus(status: ScrollStatus) {
        this.status = status
    }

    static #mouseEnd() {
        document.onmousemove = null
        document.onmouseup = null
    }

    static #touchEnd() {
        document.ontouchmove = null
        document.ontouchend = null
    }
}

export const getClientX = (t: TMEvent) => {
    return t instanceof MouseEvent ? t.clientX : t.touches[0].clientX
}

export const getClientX2 = (t: any) => {
    return t.touches ? t.touches[0].clientX : t.clientX
}

export const getClientY = (t: TMEvent) => {
    return t instanceof MouseEvent ? t.clientY : t.touches[0].clientY
}

export const getClientY2 = (t: any) => {
    return t.touches ? t.touches[0].clientY : t.clientY
}

export const tranFloat = (t: number) => {
    return parseFloat(t.toFixed(2))
}

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