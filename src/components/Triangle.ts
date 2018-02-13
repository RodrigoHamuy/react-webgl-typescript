import { VertexBufferObject } from './VertexBufferObject';
import { Shader } from './Shader';

export class Triangle {
  
  private gl: WebGLRenderingContext;
  private shader: Shader;
  private vbo: VertexBufferObject;

  constructor(gl: WebGLRenderingContext, shader: Shader) {

    this.shader = shader;
    this.gl = gl;

    let vertices = [
      0.0, 1.0, 0.0,
      -1.0, -1.0, 0.0,
      1.0, -1.0, 0.0
    ];

    this.vbo = new VertexBufferObject({
      vertices: vertices,
      gl: gl,
    });

  }

  draw() {
    
    this.vbo.bind();
    this.shader.setPosition( [-1.5, 0.0, -7.0] );
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

  }

}