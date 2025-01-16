export function snakeToHumanReadable(snakeStr: string) {
    return snakeStr
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function truncate(str: string, maxLength: number = 20) {
    return (str.length > maxLength)
        ? str.slice(0, maxLength - 1) + '...'
        : str;
}

export function formatDateTime(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function convertToLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
}

function pad(num: number): string {
    return String(num).padStart(2, '0');
}