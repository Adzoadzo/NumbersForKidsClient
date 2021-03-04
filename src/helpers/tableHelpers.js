import moment from 'moment';

export const mergeFields = (field1, field2) => {
    const getValue = (object) => {
        return object[field1].toString() + " " + object[field2].toString();
    }
    return getValue;
}

export const getDeepValue = (pathArray) => {
    const getValue = (obj) => {
        for (let i = 0, path = pathArray, len = path.length; i < len; i++) {
            if (!obj[path[i]]) return 'None';
            obj = obj[path[i]];
        };
        return obj;
    }
    return getValue;
}

export const checkDeepValue = (pathArray) => {
    const getValue = (obj) => {
        for (let i = 0, path = pathArray, len = path.length; i < len; i++) {
            if (!obj[path[i]]) return 'No';
            obj = obj[path[i]];
        };
        return 'Yes';
    }
    return getValue;
}

export const formatTimestamp = (field, separator = ' at ', dateFormat = 'YYYY-MM-DD', timeFormat = 'HH:mm:ss', showDate = true, showTime = true) => {
    return (obj) => {
        const timestamp = obj[field];
        if (!timestamp) return 'No data';

        if (moment(timestamp).local().format('YYYY') === '2000') {
            return "Device has not updated yet";
        }
        const date = moment(timestamp).local().format(dateFormat)
        const time = moment(timestamp).local().format(timeFormat);

        let res = ``;
        if (showDate) res = res.concat(date);
        if (res) res = res.concat(separator)
        if (showTime) res = res.concat(time);

        return res
    }
}


export const parseBoolean = (propName) => {
    return (obj) => obj[propName] ? 'Yes' : 'No'
}