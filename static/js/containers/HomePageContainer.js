import React from 'react';
import HomePageReactTitle from '../components/HomePageReactTitle';

/* You also get this warning in v1.x if you write your root component as
   stateless plain function instead of using React.Component. This problem
   is already solved completely in the upcoming v3.x.
   https://github.com/gaearon/react-hot-loader/blob/4978bffbb82a2508cf5d4ef2eee8b9b9101284ad/docs/Troubleshooting.md */
// eslint-disable-next-line react/prefer-stateless-function
export default class HomePageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onBlur={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
