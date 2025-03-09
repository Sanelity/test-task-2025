import dayjs from "dayjs";

export function getTodayDate(){
    let now = dayjs();

    return now.year() + "-" + (now.month()+1) + "-" + now.date();
}



export function isValidDate(string_date){
    return dayjs(string_date, 'YYYY-MM-DD', true).isValid();
}

export function tryParseDate(string_date){
    let date = dayjs(string_date, 'YYYY-MM-DD', true);
    return date.year() + "-" + (date.month()+1) + "-" + date.date();
}