import * as React from 'react';
// import * as THREE from 'three';
import  { mat4 } from 'gl-matrix';

class Canvas extends React.Component {

  mvMatrixUniform: WebGLUniformLocation;
  pMatrixUniform: WebGLUniformLocation;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;

  mvMatrix = mat4.create();
  pMatrix = mat4.create();
  triangleVertexPositionBuffer: WebGLBuffer;
  triangleVertexPositionBufferItemSize: number;
  triangleVertexPositionBufferNumItems: number;

  squareVertexPositionBuffer: WebGLBuffer;
  squareVertexPositionBufferItemSize: number;
  squareVertexPositionBufferNumItems: number;

  shaderProgram: WebGLProgram;

  vertexPositionAttribute: number;

  constructor(props: {}) {

    super(props);

  }

  componentDidMount() {

    this.initGL();
    this.initShader();
    this.initBuffers();

    this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    this.gl.enable( this.gl.DEPTH_TEST );

    this.drawScene();

  }

  setMatrixUniforms() {

    this.gl.uniformMatrix4fv(this.pMatrixUniform, false, this.pMatrix);
    this.gl.uniformMatrix4fv(this.mvMatrixUniform, false, this.mvMatrix);

  }

  drawScene() {

    let gl = this.gl;
    let canvas = this.canvas;
    let mvMatrix = this.mvMatrix;
    let pMatrix = this.pMatrix;

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.clear( gl.DEPTH_BUFFER_BIT );

    mat4.perspective( pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0) ;

    mat4.identity( mvMatrix );

    mat4.translate( mvMatrix, mvMatrix, [-1.5, 0.0, -7.0] );

    gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);

    gl.vertexAttribPointer( 
      this.vertexPositionAttribute, 
      this.triangleVertexPositionBufferItemSize, 
      gl.FLOAT, 
      false, 0, 0
    );

    this.setMatrixUniforms();
    
    gl.drawArrays(gl.TRIANGLES, 0, this.triangleVertexPositionBufferNumItems);

    mat4.translate(mvMatrix, mvMatrix, [3.0, 0.0, 0.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);

    gl.vertexAttribPointer(
      this.vertexPositionAttribute, 
      this.squareVertexPositionBufferItemSize, 
      gl.FLOAT, false, 0, 0
    );

    this.setMatrixUniforms();

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexPositionBufferNumItems);

  }

  initBuffers() {

    let gl = this.gl;

    this.triangleVertexPositionBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer( gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer );
    let vertices = [
      0.0, 1.0, 0.0,
      -1.0, -1.0, 0.0,
      1.0, -1.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    this.triangleVertexPositionBufferItemSize = 3;
    this.triangleVertexPositionBufferNumItems = 3;

    this.squareVertexPositionBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
    vertices = [
      1.0, 1.0, 0.0,
      -1.0, 1.0, 0.0,
      1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    this.squareVertexPositionBufferItemSize = 3;
    this.squareVertexPositionBufferNumItems = 4;

  }

  createShader( source: string, type: number ): WebGLShader {

    let shader = this.gl.createShader(type);
    this.gl.shaderSource( shader, source );
    this.gl.compileShader( shader );
    return shader as WebGLShader;

  }

  initShader() {

    let fragShaderSource = `
      precision mediump float;
      void main(void) {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `;

    let vertShaderSource = `
      attribute vec3 aVertexPosition;
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;
      void main(void) {
          gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      }
    `;

    let fragmentShader = this.createShader( fragShaderSource, this.gl.FRAGMENT_SHADER );
    let vertexShader = this.createShader( vertShaderSource, this.gl.VERTEX_SHADER );

    this.shaderProgram = this.gl.createProgram() as WebGLProgram;

    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);

    this.gl.useProgram(this.shaderProgram);

    this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
    this.gl.enableVertexAttribArray(this.vertexPositionAttribute);

    this.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uPMatrix') as WebGLUniformLocation;
    this.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uMVMatrix') as WebGLUniformLocation;

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