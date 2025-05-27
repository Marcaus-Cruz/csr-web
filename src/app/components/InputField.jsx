export default function InputField(props) {
  const {
    text = "label",
    value = "",
    onChange,
    placeholder = "placeholder",
  } = props;

  return (
    <div className="input-container">
      <label>{text}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
