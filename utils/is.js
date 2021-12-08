export const is = (val, type) => {
    return toString.call(val) === `[object ${ type }]`;
}

export function isString(val) {
    return is(val, 'String');
}