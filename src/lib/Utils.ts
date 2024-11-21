import type { IsoDateString } from "./pocketbase-types";


export function getTime(date: IsoDateString){

    const [datePart, timePart] = date.replace('Z', '').split(' ');

    const [hours, minutes, seconds] = timePart.split(':');
    const [secondPart, milliseconds] = seconds.split('.').map(Number);


    const currentHour = Number(hours)+1;
    
    const timeFormat = currentHour + ":" + minutes
    return timeFormat;
}
