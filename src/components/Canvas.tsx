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

    this.initGL();
    this.shader = new Shader( this.gl, this.canvas );
    this.initBuffers();

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
    
    this.triangle.draw();
    this.square.draw();

  }

  initBuffers() {
    
    this.triangle = new Triangle( this.gl, this.shader );
    this.square = new Square( this.gl, this.shader );

  }

  initGL() {

    this.gl = this.canvas.getContext('webgl') as WebGLRenderingContext;
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

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