export {default as cn} from './classnames'
export {default as wrapClick} from './wrap-click'
export {default as wrapOnchange} from './wrap-onchange'
// export {default as useUrlState} from './use-url-state'

export function formatDate(date: Date): string {
    const monthNames: string[] = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}