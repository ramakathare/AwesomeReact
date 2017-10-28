import * as React from 'react';
import * as PropTypes from 'prop-types';
import { defaults, mergeOptions } from '../defaults';

/* Export notification container */
export default class extends React.Component<{ options?: any }, {}> {
    static propTypes = {
        options: PropTypes.object
    };

    static defaultProps = {
        options: {}
    }

    componentWillMount() {
        mergeOptions(this.props.options);
    }

    render() {
        return <div id={defaults.wrapperId} />;
    }
}