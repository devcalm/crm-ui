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

    const pad = (num: number) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}