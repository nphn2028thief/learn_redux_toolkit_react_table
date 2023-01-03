export interface ILoginInfo {
    id: number | string;
    email: string;
    password: string;
}

export interface IRegisterInfo extends ILoginInfo {
    fullname: string;
    username: string;
    confirmPassword: string;
}
