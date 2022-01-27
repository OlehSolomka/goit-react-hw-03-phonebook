import "./styles/base.scss";
import { Component } from "react";
import { nanoid } from "nanoid/non-secure";
import Section from "./components/Section";
import Form from "./components/Form";
import Contactlist from "./components/Contactlist";
import Filter from "./components/Filter";

class App extends Component {
  static defaultProps = {};
  static propTypes = {};

  state = {
    contact: [
      { name: "Oleh Solomka", id: nanoid(), number: "+3805612312333" },
      { name: "Ruslan Solomka", id: nanoid(), number: "+3805612312333" },
      { name: "Lilia Solomka", id: nanoid(), number: "+3805612312333" },
    ],
    filter: "",
  };

  onSubmitData = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const checkedNames = [];

    this.state.contact.forEach((unit) => {
      checkedNames.push(unit.name.toLowerCase());
    });
    if (checkedNames.includes(normalizedName)) {
      alert(`${normalizedName} is already in contacts`);
      return;
    }

    this.setState(({ contact }) => ({
      contact: [...contact, { name, id: nanoid(), number }],
    }));
  };

  onDeleteContact = (contactName) => {
    this.setState((prevState) => ({
      contact: prevState.contact.filter((unit) => unit.name !== contactName),
    }));
  };

  handlerChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  getVIsibleContacts = () => {
    const { contact, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contact.filter((item) =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredItems = this.getVIsibleContacts();

    return (
      <div className="root">
        <h1 className="header">Phonebook</h1>
        <Form onSubmit={this.onSubmitData} />

        <Section title={"Contacts"}>
          <Filter onChange={this.handlerChange} value={filter} />
          <Contactlist
            contacts={filteredItems}
            onDelete={this.onDeleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
