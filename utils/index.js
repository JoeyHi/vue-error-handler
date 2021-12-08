export const processStackMessage = (error) => {
    if (!error.stack) return '';
    let stack = error.stack
        .replace(/\n/gi, '')
        .replace(/\bat\b/gi, '@')
        .split('@')
        .slice(0, 9)
        .map((v) => v.replace(/^\s*|\s*$/g, ''))
        .join(' <- ')
        .replace(/\?[^:]+/gi, '')
    const message = error.toString();
    if (stack.indexOf(message) < 0) {
        stack = message + '@' + stack;
    }
    return stack;
}