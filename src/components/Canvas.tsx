import * as React from 'react';

import { Shader } from './Shader';
import { Triangle } from './Triangle';
import { Square } from './Square';

class Canvas extends React.Component {
  
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  shader: Shader;

  triangle: Triangle;
  square: Square;

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

    this.triangle.pos.x += 0.01;
    
    this.triangle.draw();
    this.square.draw();

    window.requestAnimationFrame( () => {
      this.drawScene();
    } );

  }

  render() {

    return (
      <canvas
        width={640}
        height={425}
        ref={canvas => this.canvas = canvas as HTMLCanvasElement}
      />
    );

  }

}

export default Canvas;