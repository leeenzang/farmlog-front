// components/InputField.jsx

import './InputField.css';

function InputField({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  disabled = false,
  name,
  id,
  className = '',
  ...rest
}) {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={id || name}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`input-field ${className}`}
        {...rest}
      />
    </div>
  );
}

export default InputField;