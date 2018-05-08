export const copyOwnPropertiesFrom = (target, source) => {
    Object.getOwnPropertyNames(source)
    .forEach(function(propKey) {
        const desc = Object.getOwnPropertyDescriptor(source, propKey);
        Object.defineProperty(target, propKey, desc);
    });
    return target;
};
