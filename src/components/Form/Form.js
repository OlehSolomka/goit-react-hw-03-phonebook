import { Component } from "react/cjs/react.production.min";
import "./form.scss";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  reset = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  handlerChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handlerSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className="form">
        <form onSubmit={this.handlerSubmit}>
          <label className="form__label">
            Name:
            <input
              placeholder="Enter your name"
              value={name}
              type="text"
              name="name"
              onChange={this.handlerChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label className="form__label">
            Tel:
            <input
              placeholder="enter your phone number"
              value={number}
              type="tel"
              name="number"
              onChange={this.handlerChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}

export default Form;
