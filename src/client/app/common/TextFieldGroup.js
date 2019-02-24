import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
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
  autoComplete
}) => {
  let emptyValue = value == "" ? "" : " is-focus";

  return (
    <div className="form-group">
      <div
        className={
          error ? "from-input error " + emptyValue : "from-input " + emptyValue
        }
      >
        <i className={icon} />
        <label className="label">{label}</label>
        <input
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
        />
        {/* {prefix ?
        <NumberFormat thousandSeparator={true} prefix={prefix} />:""} */}
      </div>
      {error && <label className="invalid-feedback">{error}</label>}
    </div>
  );
};

TextFieldGroup.propTypes = {
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

TextFieldGroup.defaultProps = {
  type: "text",
  autoComplete: "off"
};

export default TextFieldGroup;
