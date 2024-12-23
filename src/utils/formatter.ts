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