import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pathPropType } from '../helpers/pathHelpers';
import styles from '../../styles/cspace-input/LineInput.css';

const propTypes = {
  embedded: PropTypes.bool,
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  api: PropTypes.func,
};

/**
 * A text input that accepts and is able to display only a single line of text. If a value prop is
 * supplied that contains a newline character, the behavior is unspecified; newline characters may
 * be stripped, replaced with other characters, or retained but not displayed. If this presents a
 * problem, use TextInput or MultilineInput.
 */
export default class LineInput extends Component {
  constructor() {
    super();

    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount() {
    const {
      api,
    } = this.props;

    if (api) {
      api({
        focus: this.focus.bind(this),
      });
    }
  }

  componentWillUnmount() {
    const {
      api,
    } = this.props;

    if (api) {
      api(null);
    }
  }

  focus() {
    this.domNode.focus();
  }

  handleRef(ref) {
    this.domNode = ref;
  }

  render() {
    const {
      embedded,
      name,
      readOnly,
      value,
      /* eslint-disable no-unused-vars */
      parentPath,
      subpath,
      api,
      /* eslint-enable no-unused-vars */
      ...remainingProps
    } = this.props;

    const className = embedded ? styles.embedded : styles.normal;
    const normalizedValue = (value === null || typeof value === 'undefined') ? '' : value;

    return (
      <input
        {...remainingProps}
        className={className}
        disabled={readOnly}
        name={name}
        readOnly={!remainingProps.onChange}
        ref={this.handleRef}
        type="text"
        value={normalizedValue}
      />
    );
  }
}

LineInput.propTypes = propTypes;
