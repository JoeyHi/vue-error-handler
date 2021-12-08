import { vueErrorHandler } from './handler/vueErrorHandler';
import { scriptErrorHandler } from './handler/scriptErrorHandler';
import { setupPromiseErrorHandler } from './handler/setupPromiseErrorHandler';
import { setupResourceErrorHandler } from './handler/setupResourceErrorHandler';
export { addHttpErrorInfo, cleanErrorInfo, getErrorInfo } from './errorService';

export const setupErrorHandler = (app) => {

    // Vue exception monitoring;
    app.config.errorHandler = vueErrorHandler

    // script error
    window.onerror = scriptErrorHandler

    // promise exception
    setupPromiseErrorHandler()

    // static resource exception
    setupResourceErrorHandler()
}
