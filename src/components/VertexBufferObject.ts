export class VboProperties {
    vertices: number[];
    gl: WebGLRenderingContext;
}

export class VertexBufferObject {

    private id: WebGLBuffer;
    private vertices: number[];
    private gl: WebGLRenderingContext;

    constructor( props: VboProperties ) {

        this.vertices = props.vertices;
        this.gl = props.gl;

        this.id = this.gl.createBuffer() as WebGLBuffer;
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.id );
        this.gl.bufferData( 
            this.gl.ARRAY_BUFFER, 
            new Float32Array( this.vertices ),
            this.gl.STATIC_DRAW
        );

    }

    bind() {

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.id );

    }

}