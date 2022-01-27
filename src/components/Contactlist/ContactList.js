import "./contactList.scss";

const Contactlist = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(({ name, id, number }) => {
        return (
          <li key={id}>
            {name} {number}
            <button
              type="button"
              onClick={() => {
                onDelete(name);
              }}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Contactlist;
