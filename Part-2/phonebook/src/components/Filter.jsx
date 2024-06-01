import Input from "./Input";

const Filter = ({ text, value, onChange }) => {
  return (
    <Input text={text} value={value} onChange={onChange} />
  );
};

export default Filter;
