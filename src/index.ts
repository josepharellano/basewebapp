
import { Delaunay } from 'd3-delaunay';
import { Scene, OrthographicCamera, WebGLRenderer, BufferGeometry, BufferAttribute, MeshBasicMaterial, Mesh, BoxGeometry, PerspectiveCamera, Points, Color, PointsMaterial } from 'three';

let width = window.innerWidth;
let height = window.innerHeight;

const camera = new OrthographicCamera(0,2,2,0,1,10)
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();



const renderScene = () => {
    const geometry = new BufferGeometry();
    const vertices = new Float32Array( [
         -1.0, -1.0,  -1.0,
         1.0, -1.0,  -1.0,
         1.0,  1.0,  -1.0,
    
         1.0,  1.0,  -1.0,
        -1.0,  1.0,  -1.0,
        -1.0, -1.0,  -1.0
    ] );

    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    const material = new MeshBasicMaterial( {color: 0xffffff});
    const mesh = new Mesh( geometry, material);
    mesh.position.set(0,0,0);

    scene.add(mesh);

    renderer.render(scene, camera);

    
    

    



}

renderScene();




document.addEventListener('keydown', (event) => {
    const {key,code} = event;
    if(code === 'Space'){
        console.log("Generate");
        renderScene();
    }
});


