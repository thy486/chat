/**
 * @description from url https://blog.csdn.net/mwqyykl/article/details/102465534
 * username : 用户名 默认为无
 * size ：头像大小 默认为 30
 * color ：字体颜色
 * canvasId ：canvas容器的id
 * */
export function generatorAvatar(username?: string, size?: number, bgColor?: string) {
    //设置头像昵称，如果为null或者为空时，设置为无
    let nickname = !username ? "无" : username;
    //设置头像大小
    let avatarSize = size == void 0 ? 48 : size;

    //设置头像内部文字大小
    let fontSize = avatarSize / 2;

    //设置头像内部字体
    let fontWeight = 'normal';

    //设置头像背景颜色
    let colors = [
        "#31bc9f", "#33cc70", "#4a94db", "#9b5fb6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
        "#f1cb1e", "#e6761b", "#e7363b", "#00bcd4", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ];
    let avatarColor = bgColor ?? colors[Math.floor((Math.random() * colors.length))];

    /*根据id获取canvas
    * 如果为空，则创建新的canvas
    * */
    let canvas = document.createElement('canvas')

    //初始化canvas设置
    canvas.width = avatarSize;
    canvas.height = avatarSize;
    let context = canvas.getContext('2d');
    if (!context) return null

    //头像背景颜色设置
    context.fillStyle = avatarColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    //头像字体颜色设置
    context.fillStyle = '#FFFFFF';
    context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = "middle";
    // console.log(avatarSize / 2 - fontSize / 2);
    // console.log(avatarSize / 2);

    context.fillText(nickname.charAt(0), fontSize, fontSize);
    return canvas.toDataURL("image/png");
}

export function isPngSize(base64: string) {
    return base64.substring(0,22) === 'data:image/png;base64,'
}

export function getPngSize(base64: string): {width: number, height: number} {
    //确认处理的是png格式的数据
    if (isPngSize(base64)) {
        // base64 是用四个字符来表示3个字节
        // 我们只需要截取base64前32个字符(不计开头那22个字符)便可（24 / 3 * 4）
        // 这里的data包含12个字符，9个字节，除去第1个字节，后面8个字节就是我们想要的宽度和高度
        const data = base64.substring(22 + 20, 22 + 32);
        const base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        const nums = [];
        for (const c of data) {
            nums.push(base64Characters.indexOf(c));
        }
        const bytes = [];
        for(let i = 0; i < nums.length; i += 4) {
            bytes.push((nums[i] << 2) + (nums[i+1] >> 4));
            bytes.push(((nums[i+1] & 15) << 4) + (nums[i+2] >> 2));
            bytes.push(((nums[i+2] & 3) << 6) + nums[i+3]);
        }
        const width = (bytes[1] << 24) + (bytes[2] << 16) + (bytes[3] << 8) + bytes[4];
        const height = (bytes[5] << 24) + (bytes[6] << 16) + (bytes[7] << 8) + bytes[8];
        return {
            width,
            height,
        };
    }
    throw Error('unsupported image type');
}

export default {
    generatorAvatar
}