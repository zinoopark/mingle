export const stringToColorCode = (str: string) => {

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }


    let colorCode = '#' + ('000000' + (hash & 0xFFFFFF).toString(16)).slice(-6);

    return colorCode;
}