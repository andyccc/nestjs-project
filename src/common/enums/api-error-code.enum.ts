export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = 1, // 成功
    FAILED = 0, // 失败

    USER_ID_INVALID = 10001,// 用户id无效
    USER_ACCOUNT_REGISTERED = 1002,// 用户账号已注册
    USER_ACCOUNT_OR_PASSWORD_INVALID = 10003,// 用户名或者密码无效
    USER_PASSWORD_TWICE_NOT_SAME = 10004,// 用户密码两次不一致

    PARAM_IS_MISSING = 20000,// 参数丢失


}