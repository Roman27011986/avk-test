export enum EKeyCode {
    Enter = 'Enter'
};

export enum EQueryKeys {
    Posts = 'posts',
    Post = 'post',
    Comments = 'comments',
    PostImg = 'postImg'
};

export enum EQueryParams {
    Page = 'page'
};

export interface IImgData {
    img: {
        src: string;
        height: number;
        width: number;
    },
    base64: string
};