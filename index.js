// Based on this tutorial: https://gamedevelopment.tutsplus.com/tutorials/a-beginners-guide-to-coding-graphics-shaders-part-2--cms-24111

/** Set up Three.js **/
// First we initialize the scene and our camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// We create the WebGL renderer and add it to the document
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/** Configure our shader **/
// Prepare the texture
THREE.ImageUtils.crossOrigin = ''; // Allows us to load an external image
const tex = THREE.ImageUtils.loadTexture( 'https://media.giphy.com/media/oYtVHSxngR3lC/giphy.gif' );

// Get the shader code
const fragmentShader = document.getElementById('fragShader').innerHTML;

// Configure the uniforms
const startTime = Date.now();
const uniforms = {
  resolution: {
    type: 'v2',
    value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  time: {
    type: 'f',
    value: 0.,
  },
  texture: {
    type: 't',
    value: tex,
  },
};

/** Set up the scene **/
const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.ShaderMaterial( {fragmentShader, uniforms} );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( cube );
cube.position.z = -1.25; // Shift the cube back so we can see it

/** Start animating **/
const render = () => {
  // Update time uniform.
  uniforms.time.value = Date.now() - startTime;

  // Animate the scene.
  cube.rotation.y += 0.05;
  requestAnimationFrame( render );
  renderer.render( scene, camera );
};

render();

// Listen for resize event to update resolution uniforms.
window.onresize = function(event){
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.x = window.innerWidth;
  uniforms.resolution.value.y = window.innerHeight;
}
