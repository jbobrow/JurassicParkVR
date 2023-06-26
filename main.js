import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'
import { VertexNormalsHelper } from '/node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js';

// Ribbon like this: https://jsfiddle.net/prisoner849/zgd8nc9p/

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Parameters for the double helix
const radius = 0.8;
const height = 6;
const spacing = 2.5;
const twist = 0.2;
const numCylinders = 16;
const cylinderColors = ['#5577BB', '#99BB88', '#CCAA77', '#66CCEE']; // Randomized colors
const helixRadius = height / 2;
const helixHeight = numCylinders * spacing;
const numRotations = twist * numCylinders;
const cylinderEdges = 12;
const minKink = 0.05;
const maxKink = 0.1;

const group = new THREE.Group();
scene.add(group);

// Create cylinders and position them in a double helix
const cylinders = [];
for (let i = 0; i < numCylinders; i++) {
    const angle = (i / numCylinders) * Math.PI * numRotations;

    // Calculate positions for the two strands of the helix
    const x1 = Math.cos(angle) * helixRadius;
    const y1 = Math.sin(angle) * helixRadius;
    const z1 = i * spacing - helixHeight / 2;

    const x2 = Math.cos(angle + Math.PI) * helixRadius;
    const y2 = Math.sin(angle + Math.PI) * helixRadius;
    const z2 = i * spacing - helixHeight / 2;

    // Create and position cylinders for the two strands
    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, cylinderEdges);

    const cylinder1 = new THREE.Mesh(cylinderGeometry);
    cylinder1.position.set(x1, y1, z1);
    const color1 = cylinderColors[Math.floor(Math.random() * cylinderColors.length)];
    cylinder1.material = new THREE.MeshStandardMaterial({
        color: color1
    });
    group.add(cylinder1);
    cylinders.push(cylinder1);

    const cylinder2 = new THREE.Mesh(cylinderGeometry);
    cylinder2.position.set(x2, y2, z2);
    const color2 = cylinderColors[Math.floor(Math.random() * cylinderColors.length)];
    cylinder2.material = new THREE.MeshStandardMaterial({
        color: color2
    });
    group.add(cylinder2);
    cylinders.push(cylinder2);

    // Compute rotation to align cylinders with the z-axis
    const rotationAngle1 = Math.atan2(y1, x1) + Math.PI / 2;
    const rotationAngle2 = Math.atan2(y2, x2) + Math.PI / 2;

    // Apply rotation to the cylinders
    cylinder1.rotation.z = rotationAngle1 + getRandomArbitrary(minKink, maxKink);
    cylinder2.rotation.z = rotationAngle2 - getRandomArbitrary(minKink, maxKink);
}

// Create the double helix geometry
const numSegPerCyl = 30;
const numSegments = numSegPerCyl * numCylinders; // Number of segments in each ribbon
const helixLength = spacing * numCylinders;
const ribbonThickness = 0.1; // Thickness of the ribbon
const ribbonWidth = 2; // Width of the ribbon

const helixGeometry = createRibbonGeometry();

function createRibbonGeometry() {
    const ribbonShape = new THREE.Shape();

    ribbonShape.moveTo(-ribbonWidth / 2, 0);
    ribbonShape.lineTo(ribbonWidth / 2, 0);
    ribbonShape.lineTo(ribbonWidth / 2, ribbonThickness);
    ribbonShape.lineTo(-ribbonWidth / 2, ribbonThickness);
    ribbonShape.lineTo(-ribbonWidth / 2, 0);

    const extrudeSettings = {
        steps: numSegments,
        depth: 1,
        bevelEnabled: false,
        extrudePath: createExtrudePath(),
        extrudeMaterial: 0,
        frames: [new THREE.Matrix4().makeRotationY(Math.PI / 2)] // Rotate 90 degrees around the Z-axis
    };

    return new THREE.ExtrudeBufferGeometry(ribbonShape, extrudeSettings);
}

function createExtrudePath() {
    const extrudePath = new THREE.CatmullRomCurve3();

    const points = [];
    // const normals = []; // Store the normals for each segment

    for (let i = -numSegPerCyl; i <= numSegments; i++) {
        const t = (i / numSegments) * Math.PI * numRotations;

        const x = 2 * helixRadius * Math.cos(t);
        const y = 2 * helixRadius * Math.sin(t);
        const z = (i / numSegments) * helixLength - helixLength / 2;

        // const normal = new THREE.Vector3(-x, y, 0).normalize(); // Compute the normal vector

        points.push(new THREE.Vector3(x, y, z));
        // normals.push(normal);
    }

    extrudePath.points = points;

    // bend it!
    // const rbnStepLength = 0.1;
    // const rbnRadius = helixRadius * 2;
    // extrudePath.points.forEach(v => {
    //   let angle = -v.z;
    //   let shift = (v.z / (Math.PI * 2)) * rbnStepLength + v.y;
  
    //   v.x = Math.cos(angle) * rbnRadius;
    //   v.y = Math.sin(angle) * rbnRadius;
    //   //v.z = shift;
    // });


    // extrudePath.normals = normals;
    return extrudePath;
}

const Material1 = new THREE.MeshStandardMaterial({
    color: 0xAACC88,
    side: THREE.DoubleSide,
    wireframe: false
});
const Material2 = new THREE.MeshStandardMaterial({
    color: 0x66AA88,
    side: THREE.DoubleSide,
    wireframe: false
});

const Ribbon1 = new THREE.Mesh(helixGeometry, Material1);
const Ribbon2 = new THREE.Mesh(helixGeometry, Material2);

group.add(Ribbon1);
group.add(Ribbon2);

// show the normals
// const vnh = new VertexNormalsHelper( Ribbon1, 0.5 );
// scene.add( vnh );

// Rotate the ribbons
Ribbon1.rotation.z = 0;
Ribbon2.rotation.z = Math.PI;

// Rotate the group
group.rotation.x = Math.PI/3;
group.rotation.y =3*Math.PI/4;
group.rotation.z = Math.PI/4;
// Position the group
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 0;

// Create a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Create an ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Set camera position
camera.position.z = 30;

// Set the background color
renderer.setClearColor(0x225566);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); // Update the controls
}

animate();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}