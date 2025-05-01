// components/InputField.jsx
function InputField({ type = 'text', ...props }) {
    return <input type={type} className="input-field" {...props} />;
  }
  export default InputField;