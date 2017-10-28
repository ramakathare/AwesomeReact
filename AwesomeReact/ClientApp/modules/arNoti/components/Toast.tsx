import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as assign from 'object-assign';
import { defaults } from '../defaults';
import { Stylesheet } from '../stylesheet';
import { CSSProperties } from 'react';

interface IToast {
    [key: string]: any
    type?: any,
    color?: any,
    timeout?: any
}

interface IToastState {
    containerStyle: CSSProperties,
}

/* React Notification Component */
export default class Toast extends React.Component<IToast, IToastState> {
    static propTypes = {
        text: PropTypes.oneOfType([
            PropTypes.string, PropTypes.element
        ]),
        timeout: PropTypes.number,
        type: PropTypes.string,
        color: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ])
    };

    state = {
        containerStyle: Stylesheet.styles.container
    };

    getToastStyle() {
        let { type, color } = this.props;
        let { styles } = Stylesheet;
        let contentStyle = {};

        /* If type is set, merge toast action styles with base */
        switch (type) {
            case 'success':
            case 'error':
            case 'warning':
            case 'info':
                contentStyle = assign({}, styles.content, defaults.colors[type]);
                break;
            case 'custom':
                const customStyle = {
                    backgroundColor: color.background,
                    color: color.text
                };
                contentStyle = assign({}, styles.content, customStyle);
                break;
            default:
                contentStyle = assign({}, styles.content);
                break;
        }

        return contentStyle;
    }

    animateState() {
        let { styles } = Stylesheet;

        // Show
        setTimeout(() => {
            this.updateStyle(styles.show);
        }, 100); // wait 100ms after the component is called to animate toast.

        // Timeout -1 displays toast as a persistent notification
        if (this.props.timeout === -1) {
            return;
        }

        // Hide after timeout
        setTimeout(() => {
            this.updateStyle(styles.hide);
        }, this.props.timeout);
    }

    // Updates the style of the container with styles for a state (hide/show).
    // This triggers animations.
    updateStyle(stateStyle: any) {
        let { styles } = Stylesheet;

        this.setState({ containerStyle: assign({}, styles.container, stateStyle) });
    }

    componentDidMount() {
        this.animateState();
    }

    render() {

        let { text } = this.props;
        let { containerStyle } = this.state;

        return <div className="toast-notification" style={this.state.containerStyle}>
            <span style={this.getToastStyle()}>{text}</span>
        </div>
    }
}