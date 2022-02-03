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
    contact: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contact");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contact: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contact;
    const prevContacts = prevState.contact;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contact", JSON.stringify(nextContacts));
    }
  }
  onSubmitData = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const checkedName = this.state.contact.find(
      (element) => element.name.toLowerCase() === normalizedName
    );
    if (checkedName) {
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
