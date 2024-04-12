import Component from "../Component";
import Camera from "../Components/Camera";
import Position from "../Components/Position";
import Vec2 from "../Math/Vec2";
import Update from "../Update";
import Renderer from "./Renderer";

const quadTriangles = new Float32Array(
  [-0.5, -0.5,
    0.5, 0.5,
    0.5, -0.5,

  -0.5, -0.5,
  -0.5, 0.5,
    0.5, 0.5]
);

export type CreateRenderer = (system: RenderingSystem) => Renderer;

export default class RenderingSystem {
  device!: GPUDevice;
  context!: GPUCanvasContext;
  presentationFormat!: GPUTextureFormat;
  vertexBufferLayout!: GPUVertexBufferLayout;
  vertexBuffer!: GPUBuffer;
  worldUniformBuffer!: GPUBuffer;
  worldUniformBufferValues!: Float32Array;
  frameUniformBufferValues!: Float32Array;
  frameUniformBuffer!: GPUBuffer;
  sampler!: GPUSampler;

  width = 800;
  height = 800;
  zoom = 8;


  async init() {
    const canvas = this.initCanvas();

    const adapter = await navigator.gpu?.requestAdapter();
    this.device = await adapter?.requestDevice()!;

    this.context = canvas.getContext('webgpu')! as GPUCanvasContext;
    this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({
      device: this.device,
      format: this.presentationFormat,
    });

    this.createQuadVertexBuffer();
    this.createWorldUniformBuffer();
    this.createFrameUniformBuffer();
    this.createSampler();
    this.createOnScreenControlls();
  }



  initCanvas() {
    const gameDiv = document.getElementById('game')!;
    const canvas = document.createElement('canvas');
    canvas.width = this.width * (window.devicePixelRatio || 1);
    canvas.height = this.height * (window.devicePixelRatio || 1);
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';

    gameDiv.appendChild(canvas);
    return canvas;
  }

  // A vertex buffer with two triangles that make a square
  // Edges are in the range of -0.5 and 0.5
  private createQuadVertexBuffer() {
    this.vertexBufferLayout = {
      arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT, // vec2f * 4 bytes
      attributes: [
        {
          shaderLocation: 0,
          offset: 0,
          format: "float32x2" // vec2f
        }
      ],
      stepMode: 'vertex'
    };

    this.vertexBuffer = this.device.createBuffer({
      size: quadTriangles.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true
    });

    new Float32Array(this.vertexBuffer.getMappedRange()).set(quadTriangles);
    this.vertexBuffer.unmap();
  }

  // Uniform buffer of screen width and height inversions
  private createWorldUniformBuffer() {
    this.worldUniformBufferValues = new Float32Array([
      (this.zoom) / (this.width), (this.zoom) / (this.height)
    ]);
    this.worldUniformBuffer = this.device.createBuffer({
      label: 'world uniform buffer',
      size: this.worldUniformBufferValues.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    this.device.queue.writeBuffer(this.worldUniformBuffer, 0, this.worldUniformBufferValues);
  }

  // Uniform buffer for the camera position
  private createFrameUniformBuffer() {
    // Frame uniform buffer
    this.frameUniformBufferValues = new Float32Array([
      0, 0 // Camera position
    ]);
    this.frameUniformBuffer = this.device.createBuffer({
      label: 'frame uniform buffer',
      size: this.frameUniformBufferValues.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
  }

  // The nearest neighbor sampler shared between pipelines
  private createSampler() {
    this.sampler = this.device.createSampler({
      magFilter: 'nearest',
      minFilter: 'nearest',
    })
  }

  private createOnScreenControlls() {
    const divElement = document.getElementById('on-screen-controls');

    if (!divElement) {
      console.error('Div element not found');
      return;
    }

    this.createOnScreenKey("W", this.emulateKeyPress.bind(this, 'w'), this.emulateKeyUp.bind(this, 'w'), "on-screen-w", divElement);
    this.createOnScreenKey("A", this.emulateKeyPress.bind(this, 'a'), this.emulateKeyUp.bind(this, 'a'), "on-screen-a", divElement);
    this.createOnScreenKey("S", this.emulateKeyPress.bind(this, 's'), this.emulateKeyUp.bind(this, 's'), "on-screen-s", divElement);
    this.createOnScreenKey("D", this.emulateKeyPress.bind(this, 'd'), this.emulateKeyUp.bind(this, 'd'), "on-screen-d", divElement);
    this.createOnScreenKey("SPACE", this.emulateKeyPress.bind(this, ' '), this.emulateKeyUp.bind(this, ' '), "on-screen-space", divElement);
    this.createOnScreenKey("E", this.emulateKeyPress.bind(this, 'e'), this.emulateKeyUp.bind(this, 'e'), "on-screen-e", divElement);
  }


  private emulateKeyPress(key: string) {
    const event = new KeyboardEvent('keydown', {
      key: key,
      keyCode: key.charCodeAt(0), // Get the ASCII code of the key
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  private emulateKeyUp(key: string) {
    const event = new KeyboardEvent('keyup', {
      key: key,
      keyCode: key.charCodeAt(0), // Get the ASCII code of the key
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  private createOnScreenKey(keyText: string, keyDownFunction: EventListener, keyUpFunction: EventListener, keyClassName: string, parentElement: HTMLElement) {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add(keyClassName);
    buttonElement.textContent = keyText;
    buttonElement.addEventListener('mousedown', keyDownFunction);
    buttonElement.addEventListener('mouseup', keyUpFunction);
    buttonElement.addEventListener('touchstart', keyDownFunction);
    buttonElement.addEventListener('touchend', keyUpFunction);

    buttonElement.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    buttonElement.style.userSelect = 'none';
    
    parentElement.appendChild(buttonElement);
  }

  draw(update: Update) {
    // Get a list of renderers that are ready to execute
    const renderers = Array.from(update.data.renderers.values());
    if (renderers.length === 0)
      return;

    let cameraPosition = new Vec2(0, 0);
    const camera = update.single([Camera, Position.NAME]);
    if (camera) {
      const [_, position] = camera.components as [Component, Position];
      cameraPosition = update.resolvePosition(camera.entity, position);
    }

    // Start the GPU stuff.
    const commandEncoder = this.device.createCommandEncoder();
    const renderPassDescriptor: GPURenderPassDescriptor = {
      label: 'renderer pass',
      colorAttachments: [
        {
          view: this.context.getCurrentTexture().createView({ label: 'Color attachment texture view' }),
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

    this.frameUniformBufferValues.set([cameraPosition.x, cameraPosition.y]);
    this.device.queue.writeBuffer(this.frameUniformBuffer, 0, this.frameUniformBufferValues, 0);

    for (const renderer of renderers) {
      renderer.beginFrame(update);
    }

    for (const layer of update.data.layers) {
      for (const renderer of renderers) {
        renderer.drawLayer(passEncoder, layer);
      }
    }

    passEncoder.end();
    this.device.queue.submit([commandEncoder.finish()]);

    for (const renderer of renderers) {
      renderer.endFrame();
    }
  }
}