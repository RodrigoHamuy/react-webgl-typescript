import * as React from 'react';

import { Shader } from './Shader';
import { Triangle } from './Triangle';
import { Square } from './Square';
import { Slider } from './Slider';

class Canvas extends React.Component {
  
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  shader: Shader;

  triangle: Triangle;
  square: Square;

  state = {
    trianglePos: 0
  };

  constructor(props: {}) {

    super(props);

  }

  componentDidMount() {

    this.gl = this.canvas.getContext('webgl') as WebGLRenderingContext;
    
    this.shader = new Shader( this.gl, this.canvas );    
    this.triangle = new Triangle( this.gl, this.shader );
    this.square = new Square( this.gl, this.shader );

    this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    this.gl.enable( this.gl.DEPTH_TEST );

    this.drawScene();

  }

  drawScene() {

    let gl = this.gl;
    let canvas = this.canvas;

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.clear( gl.DEPTH_BUFFER_BIT );

    this.triangle.pos.x = this.state.trianglePos * 0.1;
    
    this.triangle.draw();
    this.square.draw();

    window.requestAnimationFrame( () => {
      this.drawScene();
    } );

  }

  onSliderChange(val: Number) {
    this.setState({
      trianglePos: val
    });
  }

  render() {

    let myFunc = this.onSliderChange.bind(this);

    return (
      <div>
        <canvas
          width={640}
          height={425}
          ref={canvas => this.canvas = canvas as HTMLCanvasElement}
        />
        <Slider onSliderChange={myFunc}/>
      </div>
    );

  }

}

export default Canvas;