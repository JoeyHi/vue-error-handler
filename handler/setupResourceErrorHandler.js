import { addErrorLogInfo } from '../errorService';
export const setupResourceErrorHandler = () => {
    window.addEventListener(
        'error',
        function (event) {
            const target = event.target ? event.target : event.srcElement;
            if (target === window) return;
            addErrorLogInfo({
                type: 'resource',
                name: 'Resource Error!',
                file: (event.target || {}).currentSrc,
                detail: JSON.stringify({
                    tagName: target.localName,
                    html: target.outerHTML,
                    type: event.type
                }),
                url: window.location.href,
                stack: 'resource is not found!',
                message: (event.target || {}).localName + ' is load error'
            })
        },
        true
    )
}