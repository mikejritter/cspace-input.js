import React, { Component, PropTypes } from 'react';
import get from 'lodash/get';
import labelable from '../enhancers/labelable';
import repeatable from '../enhancers/repeatable';
import styles from '../../styles/cspace-input/CompoundInput.css';

class CompoundInput extends Component {
  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.decorateInputs = this.decorateInputs.bind(this);
  }

  getValue(name, path = this.props.defaultPath) {
    const {
      value,
    } = this.props;

    const context = path ? get(value, path) : value;

    return (context ? context[name] : undefined);
  }

  decorateInputs(children) {
    return React.Children.map(children, (child) => {
      if (!child.type) {
        // Text node. Just return it.
        return child;
      }

      const childPropTypes = child.type.propTypes;
      const overrideProps = {};

      if (childPropTypes) {
        if (childPropTypes.value) {
          overrideProps.value = this.getValue(child.props.name, child.props.path);
        }

        if (childPropTypes.onCommit) {
          overrideProps.onCommit = this.handlecommit;
        }

        if (Object.keys(overrideProps).length > 0) {
          return React.cloneElement(child, overrideProps);
        }
      }

      return React.cloneElement(child, {
        children: this.decorateInputs(child.props.children),
      });
    }, this);
  }

  render() {
    const {
      children,
      name,
    } = this.props;

    return (
      <div
        className={styles.common}
        data-name={name}
      >
        {this.decorateInputs(children)}
      </div>
    );
  }
}

CompoundInput.propTypes = {
  children: PropTypes.node,
  defaultPath: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

CompoundInput.defaultProps = {
  defaultPath: '',
  value: {},
};

export default repeatable(labelable(CompoundInput));
