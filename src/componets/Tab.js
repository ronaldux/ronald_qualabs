
const Tab = ({ name, value, checked, onclick }) => {
  return (
    <>
      <input className="tab" id={value} type="radio" name={name} checked={checked} onChange={onclick}/>
      <label htmlFor={value}>
        {value}
      </label>
    </>
  );
};

export default Tab;