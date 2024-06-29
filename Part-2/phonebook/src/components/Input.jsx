const Input = ({required, text, placeholder, value, onChange }) => {
  return (
    <div>
      {text}{" "}
      <input required={required} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
