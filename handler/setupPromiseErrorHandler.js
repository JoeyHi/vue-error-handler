import { addErrorLogInfo } from '../errorService';

export const setupPromiseErrorHandler = () => {
    window.addEventListener(
        'unhandledrejection',
        function (event) {
            addErrorLogInfo({
                type: 'promise',
                name: 'Promise Error!',
                file: '-',
                detail: '-',
                url: window.location.href,
                stack: '-',
                message: event.reason
            })
        },
        true
    )
}