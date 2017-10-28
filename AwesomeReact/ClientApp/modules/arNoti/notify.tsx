import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Toast from './components/Toast';
import Container from './components/Container';
import { defaults } from './defaults';

/* Render React component */
function renderToast(text, type, timeout, color) {
    let target = document.getElementById(defaults.wrapperId);
    var ele = <Toast text={text} timeout={timeout} type={type} color={color} />;
    ReactDOM.render(ele, target);
}

/* Unmount React component */
function hide() {
    let target = document.getElementById(defaults.wrapperId);
    ReactDOM.unmountComponentAtNode(target as HTMLElement);
}


/**
 * Show Animated Toast Message
 * Returns true if the toast was shown, or false if show failed due to an existing notification
 *
 * @param  {String|Node} text    Text/Node to be displayed inside the toast.
 * @param  {Object}      options Display options for notification (See example below)
 *
 * [Options example]
 * {
 *   type:    {String} [success/error/info]
 *   timeout: {Int}    [timeout in ms]
 *   style:   {Object} [JS representation of CSS]
 * }
 */
function show(text?: any, type?: any, timeout?: any, color?: any) {
    if (document) {
        var ele = document.getElementById(defaults.wrapperId);
        if (ele)
            if (!ele.hasChildNodes()) {
                // Use default timeout if not set.
                let renderTimeout = timeout || defaults.timeout;

                // Render Component with Props.
                renderToast(text, type, renderTimeout, color);

                if (renderTimeout === -1) {
                    return false;
                }

                // Unmount react component after the animation finished.
                setTimeout(function () {
                    hide();
                }, renderTimeout + defaults.animationDuration);

                return true;
            }
    }

    return false;
}

/**
 * Add to Animated Toast Message Queue
 * Display immediately if no queue
 * @param  {Number} initialRecallDelay   If the call to show fails because of an existing
 *                                       notification, how long to wait until we retry (ms)
 * @param  {Number} recallDelayIncrement Each time a successive call fails, the recall delay
 *                                       will be incremented by this (ms)
 * @return {[type]}                      [description]
 */
function createShowQueue(initialRecallDelay = 500, recallDelayIncrement = 500) {
    // Array to hold queued messages
    let msgs = [] as any[];

    // Is the showNotify function in progress - used so we can call showNotify when a
    // message is added to an empty queue.
    let isNotifying = false;

    let currentRecallDelay = initialRecallDelay;

    // Retrieve the next message from the queue and try to show it
    let showNotify = () => {
        // If there are no messages in the queue
        if (msgs.length === 0) {
            isNotifying = false;
            return;
        }

        isNotifying = true;

        const current = msgs.pop() as any;

        // show will now return true if it is able to send the message,
        // or false if there is an existing message
        if (current) {
            if (show(current.text, current.type, current.timeout, current.color)) {
                currentRecallDelay = initialRecallDelay;
                if (current.timeout > 0) {
                    setTimeout(() => showNotify(), current.timeout + defaults.animationDuration);
                }
            } else {
                // If message show failed, re-add the current message to the front of the queue
                msgs.unshift(current);
                setTimeout(() => showNotify(), currentRecallDelay);
                currentRecallDelay += recallDelayIncrement;
            }
        }
    };

    return (text, type = '', timeout = defaults.timeout, color) => {
        var item = { text, type, timeout, color };
        msgs.push(item);
        if (!isNotifying) {
            showNotify();
        }
    };
}

/* Export notification functions */
export let notify = {
    show,
    hide,
    createShowQueue
};

export default Container;