import { VertexBufferObject } from './VertexBufferObject';
import { Shader } from './Shader';

export class Triangle {

  pos = {
    x: -1.5,
    y: 0,
    z: -7
  };
  
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
    this.shader.setPosition( [this.pos.x, this.pos.y, this.pos.z] );
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

  }

}