import { isDevMode } from '../utils/dev';
import { addErrorLogInfo } from '../errorService';


export const scriptErrorHandler = (
    event,
    source,
    lineno,
    colno,
    error
) => {
    if (event === 'Script error.' && !source) {
        return false;
    }
    if (isDevMode()) console.error(error);
    const errorInfo = {};
    colno = colno || (window.event && window.event.errorCharacter) || 0;
    errorInfo.message = event;
    errorInfo.stack = error?.stack ? error.stack : ''
    const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script';
    addErrorLogInfo({
        type: 'script',
        name,
        file: source,
        detail: `lineno:${lineno},colno:${colno}`,
        url: window.location.href,
        ...errorInfo
    })
    return true;
}