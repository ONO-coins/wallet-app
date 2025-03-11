export function transactionDate(timestamp) {
    const now = new Date();
    const date = new Date(timestamp * 1000);
    if (date.toDateString() === now.toDateString()) return date.toLocaleTimeString('ru-RU');
    return `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`;
}
