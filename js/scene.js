/* Create canvas and add to page. */
document.addEventListener('DOMContentLoaded', function() {
  //create canvas element and set the id
  var three_canvas = document.createElement("CANVAS");
  three_canvas.setAttribute("id", "render_wp_three_js");

  //get the primary div - <main id="primary" class="site-main">
  let primary_div = document.getElementById('primary');
  let container = document.getElementById('landing-page-header-container');

  //insert the canvas in <main id="primary" class="site-main">
  primary_div.appendChild(three_canvas);

}, false);

/* The 3D scene */
document.addEventListener('DOMContentLoaded', function() {
  // Create an empty scene
  var scene = new THREE.Scene();

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera (3, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.y = 160;
  camera.position.z = 400;
  camera.lookAt (new THREE.Vector3(0,0,0));

  var pointLight = new THREE.PointLight( 0xffffff, 1 );
  pointLight.position.set( 25, 50, 25 );
  scene.add( pointLight );

  // Create cube01
  var geometry = new THREE.SphereGeometry( 5, 1, 1 );
  //var material = new THREE.MeshBasicMaterial( {color: "#666666"} );
  var material = new THREE.MeshStandardMaterial( {
      color: 0xff0051,
      shading: THREE.FlatShading, // default is THREE.SmoothShading
      metalness: 0,
      roughness: 1
  } );
  var cube01 = new THREE.Mesh( geometry, material );
  cube01.position.set (0, 0, 0);
  scene.add( cube01 );

  // Create wireframe for cube01
  var material = new THREE.MeshBasicMaterial( { color: "#000000",wireframe:true,transparent:true } );
  var cube02 = new THREE.Mesh( geometry, material );
  cube02.position.set (0, 0, 0);
  scene.add( cube02 );

  /* RENDERING */


  // Select the canvas from the document
  //var canvReference = document.getElementById( "render_wp_three_js_new" );

  // Create a renderer with Antialiasing
  // Then pass it to the renderer constructor
  var renderer = new THREE.WebGLRenderer({
      antialias:true,
      canvas: render_wp_three_js
  });

  renderer.setClearColor("#0b0a08");                          // Configure renderer clear color
  renderer.setSize( window.innerWidth, window.innerHeight );  // Configure renderer size


  // Render Loop
  var render = function () {
    //Update Orbit Controls
    //controls.update();

    requestAnimationFrame( render );

    cube01.rotation.x += 0.01;
    cube01.rotation.y += 0.01;

    cube02.rotation.x = cube01.rotation.x
    cube02.rotation.y = cube01.rotation.y

    // Render the scene
    renderer.render(scene, camera);
  };

  render();



/*
 * RESIZING WINDOW
 *
 * @see https://stackoverflow.com/questions/32119012/get-canvas-to-dynamically-resize-when-browser-window-is-resized/32119353
 * @see https://threejs.org/docs/#manual/en/introduction/FAQ
 */

    // remember these initial values
  var tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
  var windowHeight = window.innerHeight;

  // Event Listeners
  // -----------------------------------------------------------------------------
  window.addEventListener( 'resize', onWindowResize, false );

  function onWindowResize( event ) {

    camera.aspect = window.innerWidth / window.innerHeight;
    
    // adjust the FOV
    camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
    
    camera.updateProjectionMatrix();
    camera.lookAt( scene.position );

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
    
}

}, false);








