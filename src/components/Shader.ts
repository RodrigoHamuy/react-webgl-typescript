import  { mat4 } from 'gl-matrix';

export class Shader {

  private pMatrix: mat4;  
  private vertexPositionAttribute: number;
  private shaderProgram: WebGLProgram;
  private mvMatrixUniform: WebGLUniformLocation;
  private pMatrixUniform: WebGLUniformLocation;
  private gl: WebGLRenderingContext;

  constructor( gl: WebGLRenderingContext, canvas: HTMLCanvasElement ) {

    this.gl = gl;

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

    this.pMatrix = mat4.create();
    mat4.perspective(this.pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
    this.gl.uniformMatrix4fv( this.pMatrixUniform, false, this.pMatrix );

  }

  setPosition( pos: number[] ) {

    let mvMatrix = mat4.create();
    
    mat4.translate( mvMatrix, mvMatrix, pos );

    this.gl.vertexAttribPointer( 
      this.vertexPositionAttribute, 
      3, 
      this.gl.FLOAT, 
      false, 0, 0
    );

    this.gl.uniformMatrix4fv( this.mvMatrixUniform, false, mvMatrix );

  }

  private createShader( source: string, type: number ): WebGLShader {

    let shader = this.gl.createShader(type);
    this.gl.shaderSource( shader, source );
    this.gl.compileShader( shader );
    return shader as WebGLShader;

  }

}