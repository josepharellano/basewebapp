import { Graphics } from '@pixi/graphics';
import { Renderer, BatchRenderer, BufferResource, BaseTexture, Texture, Geometry, Shader } from '@pixi/core';
import { TickerPlugin } from '@pixi/ticker';
import  { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import { Text } from '@pixi/text';
import { EventSystem } from '@pixi/events';
import { AppLoaderPlugin } from '@pixi/loaders';
import { DRAW_MODES, Mesh, Sprite } from 'pixi.js';
import { createNoiseMap } from './procgen';

let height = window.innerHeight;
let width = window.innerWidth;

// let vertices:Array<number> = new Array(height * width * 2);

// for( let y = 0 ; y < height; y++){
//     let yOffset = y * width*2;
//     for(let x = 0 ; x < width; x++){
//         let xOffset = x*2 + yOffset;
//         vertices[xOffset] = x + .5;
//         vertices[xOffset + 1] = y +.5;
//     }
// }

// console.log(vertices);

const createNewPGMap = () => {
    const stage = new Container();


    let t0 = performance.now();
    // let map = createNoiseMap();
    let t1 = performance.now();
    let rndPerfInfo = `${t1-t0} to Generate ${window.innerHeight * window.innerWidth} Pixels`;

    t0 = performance.now();
    t1 = performance.now();
    let drawPerfInfo = `${t1-t0} to Generate Texture`;

    
    // let colorValues =  Uint32Array.from(map);
    // let u8 = new Uint8Array(colorValues.buffer);
    // let br = new BufferResource(colorValues, {width: window.innerWidth, height: window.innerHeight});
    // let bt = new BaseTexture(br);
    // let texture = Texture.fromBuffer(u8,window.innerWidth,window.innerHeight);
    // let sprite = new Sprite(texture);
    // stage.addChild(sprite);
    //Geometry stuff
    let procGenGeo = new Geometry();
    
    // procGenGeo.addAttribute('colors', colorValues,4);
    // procGenGeo.addAttribute('positions', [0, 0, 100, 0, 100, 100, 0, 100], 2);
    // procGenGeo.addAttribute('uvs', [0,0,1,0,1,1,0,1],2);
    // procGenGeo.addIndex([0,0,0,1,1,1,2,2,2,3,3,3]);

    
    
 
    const shader = Shader.from(`
    precision mediump float;
    attribute vec2 aVertexPosition;

    varying vec4 v_color;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    void main() {
        gl_PointSize = 1.0;
        gl_Position =vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy,0.0,1.0);
    }`,

    `precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        } 
    `);
    console.log(shader.uniforms);
    console.log(procGenGeo);
    const mesh = new Mesh(procGenGeo,shader);
    mesh.drawMode = DRAW_MODES.POINTS;
    stage.addChild(mesh);


    
    const info = new Text('')
    info.text = `${rndPerfInfo} \n${drawPerfInfo}`
    info.style.fill = 0xffffff;
    stage.addChild(info);
    // app.stage = stage;
}



document.addEventListener('keydown', (event) => {
    const {key,code} = event;
    if(code === 'Space'){
        console.log("Generate");
        createNewPGMap();
    }
})
