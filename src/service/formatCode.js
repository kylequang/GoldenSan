export const formatPrice = (price) => {
    return price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const formatNameService = (string) => {

    if (string.length > 14) {
        var first = string.substring(0, 15);
        var end = string.substring(15, 25);
        var cutString = first + "\n" + end + '...';
        return cutString;
    } else {
        return string
    }
}

export const formatDateTime = (date, time) => {
    return `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};

export const formatTime = (time) => {
    return `${time.getHours()}:${time.getMinutes()}`;
}
export const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const formatTimeMoment = (date) => {
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}