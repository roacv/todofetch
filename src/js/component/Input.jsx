import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, className, placeholder, onChange, onKeyDown, onKeyUp, value }) => {
  return (
    <input type={type} className={className} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
  )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
}

export default Input