export function debounce(callback: () => void, delay: number, timer: React.MutableRefObject<NodeJS.Timeout | null>) {
    if (timer.current) {
        clearTimeout(timer.current);
    }
    timer.current = setTimeout(callback, delay);
}