import * as React from 'react';

interface SliderProps {

  onSliderChange(params: number): void;

}

export class Slider extends React.Component<SliderProps> {

  state = {
    value: 0,
  };

  constructor(props: SliderProps) {

    super(props);

  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {

    let value = parseInt(event.currentTarget.value, undefined);

    this.setState({ value: value });
    this.props.onSliderChange( value );

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