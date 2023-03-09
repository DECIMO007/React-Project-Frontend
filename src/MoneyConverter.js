import React from "react";
import axios from "axios";



class MoneyConverter extends React.Component {
  state = {
    value: '1',
    currency1: 'INR',
    currency2: 'USD',
    convertedValue: '82',
    conversions: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { value, currency1, currency2 } = this.state;
      const response = await axios.post('http://localhost:3500/money-converter', { value, currency1, currency2 });
      const { convertedValue } = response.data;

      this.setState((prevState) => ({
        ...prevState,
        convertedValue,
        conversions: [
          {
            id: prevState.conversions.length + 1,
            value: prevState.value,
            currency1: prevState.currency1,
            currency2: prevState.currency2,
            convertedValue,
          },
          ...prevState.conversions,
        ].slice(0, 10),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:3500/money-converter');
      const conversions = response.data;

      this.setState({ conversions });
    } catch (error) {
      console.error(error);
    }
  }

  handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/money-converter/${id}`);

      this.setState((prevState) => ({
        ...prevState,
        conversions: prevState.conversions.filter((conversion) => conversion.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { value, currency1, currency2, convertedValue, conversions} = this.state;

    return (
      <div className="App">
        <h1>Money Converter</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter Value:
            <input type="number" name="value" value={value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Currency 1:
            <select name="currency1" value={currency1} onChange={this.handleChange}>
              <option value="INR">Rupee</option>
              <option value="USD">Dollar</option>
              <option value="GBP">Pound</option>
              <option value="UAE">Dirham</option>
            </select>
          </label>
          <br />
          <h3>TO</h3>
          <label>
            Currency 2:
            <select name="currency2" value={currency2} onChange={this.handleChange}>
              <option value="INR">Rupee</option>
              <option value="USD">Dollar</option>
              <option value="GBP">Pound</option>
              <option value="UAE">Dirham</option>
            </select>
          </label>
          <br />
           <button type="submit">Convert</button>
        </form>
        {convertedValue && (
          <div>
            <p>Converted Value: {convertedValue}</p>
          </div>
        )}
        <h2>Conversion History</h2>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Currency 1</th>
              <th>Currency 2</th>
              <th>Converted Value</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((conversion) => (
              <tr key={conversion.id}>
                <td>{conversion.value}</td>
                <td>{conversion.currency1}</td>
                <td>{conversion.currency2}</td>
                <td>{conversion.convertedValue}</td>
                <button onClick={() => this.handleDelete(conversion.id)}>Delete</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}


export default MoneyConverter;