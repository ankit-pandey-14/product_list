export const debounce = (callback, deplay) => {
    let timer;
    return function (...args) {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback(...args);
        }, deplay)
    }
};


export const removeFalsyValuesFromObject = (obj) => {
    const resultObj = JSON.parse(JSON.stringify(obj));

    for(let key in resultObj) {
        if(obj[key] === undefined || obj[key] === '') {
            delete resultObj[key];
        }
    }

    return resultObj;
}