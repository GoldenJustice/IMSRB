import { getToastStore, type ToastSettings, type ToastStore } from "@skeletonlabs/skeleton";
import type { IsoDateString } from "./pocketbase-types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
};

export function getTime(date: IsoDateString){

    const [datePart, timePart] = date.replace('Z', '').split(' ');

    const [hours, minutes, seconds] = timePart.split(':');
    const [secondPart, milliseconds] = seconds.split('.').map(Number);


    const currentHour = Number(hours)+1;
    
    const timeFormat = currentHour + ":" + minutes
    return timeFormat;
}



export function notificatie(store: ToastStore,message: string, background?: string, duration?: number, hideDismiss?: boolean){
    const timeins = duration || 5;
    const timeinms = timeins*1000;

    const toast: ToastSettings = {
    message,
    hideDismiss: hideDismiss || true,
    timeout: timeinms,
    background: background || 'variant-ghost-warning',
    
    };

    store.trigger(toast);
    
}

