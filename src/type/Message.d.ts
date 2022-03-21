// export enum MessageType {
//     text,
//     image,
// }

interface ImageText{
    href: '',
    text?: string
}

export interface MessageMap {
    text?: string,
    image?: ImageText[],
}

export type MessageType = keyof MessageMap

export enum MessageStatus {
    Pending,
    Success,
    Fail,
    Received,
}

export interface Message {
    // 这里只需要用户的头像和昵称
    avatar: string,
    nickname: string,

    // 是不是自己
    isSelf: boolean,

    // 发送时间
    sendDate?: string,
    // 发送时间的时间戳
    timestamp: number,
    message: MessageMap,

    status: MessageStatus,
}