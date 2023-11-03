import * as CryptoJS from 'crypto-js';

let secretKey = process.env["login-key"] ?? "0123456789";

export function encrypt(data: object): string {
    var json = JSON.stringify(data);
    return CryptoJS.AES.encrypt(json, secretKey).toString();
};

export function decrypt(text: string): object {
    try {
        var json = CryptoJS.AES.decrypt(text, secretKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(json);
    }
    catch {
        return null;
    }
};

export function canEdit(user: string): boolean {
    var admins = ["said", "ingrid", "xxxx"];
    return admins.includes(user?.toLowerCase());
}

export function checkUserAdmin(token: string): object {
    if (!token || token === '') {
        throw Error('No authorization token'); 
    }
    var userInfo = decrypt(token);
    if (!userInfo) {
        throw Error(`${token} Invalid authorization token`);
    }
    if (canEdit((<any>userInfo).name)) {
        throw Error(`${(<any>userInfo).name} not authorized`);
    }
    return userInfo;
};
