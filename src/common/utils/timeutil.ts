import * as moment from "moment";

export function getStandardDateTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}