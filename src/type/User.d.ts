export enum UserStatus {
    Offline,
    Online,
    Stealth, // 隐身
    Active, // q我吧,
    Busy,
    Emo,
}

export interface User {
    userid: number,
    username: string,
    nickname: string,
    avatar: string,
    status: UserStatus,
}

export interface Friend extends User {

}

export enum Permission {
    max
}

// 群主
export interface Lord extends User {
    permission: Permission
}

// 群成员
export interface GroupMember extends User {
    permission: Permission
}

// 管理员
export interface Administrator extends GroupMember {
}

// 群组
export interface Group {
    groupId: number,
    groupName: string,
    groupAvatar: string,

    members: GroupMember[]
    administrator: Administrator[],
    lord: Lord,
}

// 频道
export interface Channel {
    lord: Lord,
    // 没有权限，但是可以发频道消息
    masters: User[],
    members: User[],
}
