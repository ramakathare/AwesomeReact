import * as assign from 'object-assign';

interface IIndexable {
    [key: string]: any,
}

let defaults = {
    wrapperId: 'notification-wrapper',
    animationDuration: 300,
    timeout: 2500,
    zIndex: 1000,
    colors: {
        "error": {
            color: "#FFFFFF",
            backgroundColor: '#E85742'
        },
        "success": {
            color: "#FFFFFF",
            backgroundColor: '#55CA92'
        },
        "warning": {
            color: "#333333",
            backgroundColor: '#F5E273'
        },
        "info": {
            color: "#FFFFFF",
            backgroundColor: '#4990E2'
        }
    } as IIndexable
};

let mergeOptions = function(options:any) {
    defaults = assign(defaults, options);
}

export { defaults, mergeOptions };
