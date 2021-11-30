import * as crypto from 'crypto'
const PasswordSalt = '2021';


export function getSaltPassword(password): string {
    var saltPassword = password + ':' + PasswordSalt;
    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    var resultPassword = md5.update(saltPassword).digest('hex');
    return resultPassword;
}
