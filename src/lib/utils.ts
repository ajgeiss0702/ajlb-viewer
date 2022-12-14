export function dateString(date: Date = new Date(), seconds = true) {
    const d = date;

    let ap = 'AM';
    let hour: any = d.getHours();
    let min: any = d.getMinutes();
    let sec: any = d.getSeconds();

    if(hour >= 12) {
        ap = 'PM';
        if(hour > 12) {
            hour = hour - 12;
        }
    }
    if(hour == 0) {
        hour = 12;
    }
    if(min < 10) {
        min = "0"+min
    }
    if(sec < 10) {
        sec = "0"+sec
    }

    if(seconds) {
        return hour+":"+min+":"+sec+" "+ap;
    } else {
        return hour+":"+min+" "+ap;
    }
}

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getDate() == b.getDate() &&
        a.getMonth() == b.getMonth() &&
        a.getFullYear() == b.getFullYear()
    );
}

export function isBeforeOrSameDay(a: Date, b: Date): boolean {
    return (
        a.getDate() <= b.getDate() &&
        a.getMonth() <= b.getMonth() &&
        a.getFullYear() <= b.getFullYear()
    );
}

export function isAfterOrSameDay(a: Date, b: Date): boolean {
    return (
        a.getDate() >= b.getDate() &&
        a.getMonth() >= b.getMonth() &&
        a.getFullYear() >= b.getFullYear()
    );
}

export function yesterday() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
}

export function tomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
}

export const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export type ExportData = {
    [key: string]: StatEntry[] | ExportMeta,
    "meta": ExportMeta
}
export type StatEntry = {
    id: string,
    value: number,
    hourly_delta: number,
    hourly_lasttotal: number,
    hourly_timestamp: number
}
export type ExportMeta = {
    version: string,
    datestamp: number,
    taker: {
        uuid: string,
        name: string
    }
}