import { isString } from '../utils/is';
import { isDevMode } from '../utils/dev';
import { addErrorLogInfo } from '../errorService';
import { processStackMessage } from '../utils';

function formatComponentName(vm) {
    if (vm.$root === vm) {
        return {
            name: 'root',
            path: 'root'
        }
    }
    const options = vm.$options;
    if (!options) {
        return {
            name: 'anonymous',
            path: 'anonymous'
        }
    }
    const name = options.name || options._componentTag;

    return {
        name,
        path: options.__file
    }
}

export function vueErrorHandler(err, vm, info) {
    if (isString(err)) return;
    const { name, path } = formatComponentName(vm);
    if (isDevMode()) {
        console.error(err);
    }
    addErrorLogInfo({
        type: 'vue',
        name,
        file: path,
        message: err.message ?? err,
        stack: processStackMessage(err),
        detail: info,
        url: window.location.href
    })
}