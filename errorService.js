const ERROR_SESSION_KEY = 'ERROR_SESSION_KEY__'

const getSession = () => {
    try {
        return JSON.parse(window.sessionStorage.getItem(ERROR_SESSION_KEY));
    } catch (e) {
        return [];
    }
}
const setSession = (item) => {
    window.sessionStorage.setItem(ERROR_SESSION_KEY, JSON.stringify(item ?? []));
}

export const addErrorLogInfo = (info) => {
    const item = { ...info, time: parseInt(`${ new Date().getTime() / 1000 }`) }
    const errors = getSession();
    const errorList = [item, ...errors];

    if (errorList.some(info => {
        const { url, message, type, detail } = info;
        let isSameRequest = false;
        if (type === 'http' && item.type === 'http') {
            isSameRequest = detail === item.detail;
        }
        return isSameRequest && url === item.url && message === item.message;
    })) {
        return;
    }
    setSession(errorList)
}

export const getErrorInfo = () => {
    return getSession()
}

export const cleanErrorInfo = () => {
    setSession([])
}

export const addHttpErrorInfo = (error) => {
    if (error.response) {
        const errorInfo = {
            type: 'http',
            message: error.message
        }
        const {
            config,
            data = {}
        } = error.response;
        errorInfo.url = config.url;
        errorInfo.name = 'Http Error!';
        errorInfo.file = '-';
        errorInfo.stack = data ? JSON.stringify(data) : '-';
        errorInfo.detail = JSON.stringify({
            params: config?.params ?? decodeURIComponent(config?.data || '') ?? '',
            method: config.method ?? 'get',
            headers: config.headers
        });
        addErrorLogInfo(errorInfo);
    }
}

