"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var copyOwnPropertiesFrom = exports.copyOwnPropertiesFrom = function copyOwnPropertiesFrom(target, source) {
    Object.getOwnPropertyNames(source).forEach(function (propKey) {
        var desc = Object.getOwnPropertyDescriptor(source, propKey);
        Object.defineProperty(target, propKey, desc);
    });
    return target;
};