import { getStandardDateTime } from "./timeutil"
import { Request } from "express"

export function toString(obj, tabCount = 2) {
    let str = ''
    let item
    for (let key in obj) {
        item = obj[key]
        str += '\n'
        for (let i = 0; i < tabCount; i++) {
            str += '\t'
        }
        str += `${key}:`
        if (item instanceof Object) {
            str += toString(item, tabCount + 1)
        } else {
            str += ` ${item}`
        }
    }
    return str
}

export function formatReq(req: Request, status, res, user) {
    let logStr = getStandardDateTime(new Date())
    logStr += `\n\t${req.method} ${req.ip} ${req.path} ${status} `
    logStr += `\n\tQuery:`
    logStr += `${toString(req.query, 2)}`
    logStr += `\n\tHeader:`
    logStr += `${toString(req.headers, 2)}`
    logStr += `\n\tAuth:`
    if (user) {
        logStr += `${toString(user ? user : {}, 2)}`
    } else {
        logStr += `${toString('no login', 2)}`
    }

    if (req.method !== 'GET') {
        logStr += `\n\tBody:`
        if (req.body instanceof Object) {
            logStr += `${toString(req.body, 2)}`
        } else {
            logStr += `\n\t\t${req.body}`
        }
    }
    logStr += `\n\tResponse:`
    logStr += `${toString(res, 2)}`

    return logStr
}


// log :


// info: 2019-07-25 18:04:36
//     POST /v1.0/standard 200
//     Query:
//         search: keyword
//     Header:
//         cache-control: no-cache
//         postman-token: f4103067-4b07-447d-9fab-f09a75b6ddda
//         content-type: application/json
//         user-agent: PostmanRuntime/3.0.11-hotfix.2
//         accept: */*
//         host: localhost:4000
//         accept-encoding: gzip, deflate
//         content-length: 209
//         connection: keep-alive
//     Body:
//         appId: XXX
//         data:
//             userId: 123
//             requestId: 456
//         timestamp: 0


