import "./filter.scss";

const Filter = ({ value, onChange }) => {
  return (
    <>
      <input
        value={value}
        type="text"
        name="filter"
        onChange={onChange}
      ></input>
    </>
  );
};

export default Filter;
