import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  className,
  maxLength,
  minLength,
  icon,
  type,
  onChange,
  disabled,
  autoComplete,
  format,
  mask,
  prefix
}) => {
  return (
    <div className="form-group">
      <div
        className={
          value
            ? "from-input is-focus"
            : "from-input" && error
            ? "from-input error"
            : "from-input"
        }
      >
        <i className={icon} />
        <label className="label">{label}</label>
        <NumberFormat
          name={name}
          type={type}
          className={className}
          placeholder={placeholder}
          icon={icon}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={autoComplete}
          format={format}
          mask={mask}
          prefix={prefix}
        />
        {/* {prefix ?
        <NumberFormat thousandSeparator={true} prefix={prefix} />:""} */}
      </div>
      {error && <label className="invalid-feedback">{error}</label>}
    </div>
  );
};

NumberFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

NumberFieldGroup.defaultProps = {
  type: "text",
  autoComplete: "off"
};

export default NumberFieldGroup;
