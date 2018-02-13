import * as React from 'react';

class Canvas extends React.Component {

  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;

  constructor(props: {}) {

    super(props);

  }

  componentDidMount() {

    this.gl = this.canvas.getContext('webgl') as WebGLRenderingContext;

    this.gl.clearColor(0, 0, 0, 1);

    this.gl.clear( this.gl.COLOR_BUFFER_BIT );

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