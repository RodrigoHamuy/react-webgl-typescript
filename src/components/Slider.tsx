import * as React from 'react';

export class Slider extends React.Component {

  state = {
    value: 0,
  };

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    
    let value = parseInt(event.currentTarget.value, undefined);

    this.setState({ value: value });

  }

  render () {

    return (
      <div>
        <input type="range" min="-100" max="100" value={this.state.value} onChange={e => this.onChange(e)} />
        {this.state.value}
      </div>
    );

  }

}