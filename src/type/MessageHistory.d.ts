import {Message} from "./Message";

// 始末时间戳
export type DateRange = [number, number]
export interface MessageHistory {
    messageList: Message[],
    dateRange: DateRange,
}