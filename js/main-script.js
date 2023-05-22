/* GLOBAL VARIABLES */
var scene, cameraFrontal, cameraLateral, cameraTopo, cameraOrtogonal, cameraPerspectiva, renderer, activeCamera;

/* CREATE SCENE(S) */
function createScene() {
    'use strict';
    scene = new THREE.Scene();

    // Set the background color of the scene
    scene.background = new THREE.Color(0x78c1fa);

    // Add scene elements, such as objects, lights, etc.

    // Robot

    // torso (Cube)
    var torsoGeometry = new THREE.BoxGeometry(300, 150, 150);
    var torsoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    scene.add(torso);

    //abdomen (cube)
    var abdomenGeometry = new THREE.BoxGeometry(100, 150, 150);
    var abdomenMaterial = new THREE.MeshBasicMaterial({ color: 0xff0001 });
    var abdomen = new THREE.Mesh(abdomenGeometry, abdomenMaterial);
    abdomen.position.set(0,-100,0);
    scene.add(abdomen);
}

/* CREATE CAMERA(S) */
function createCameras() {
    'use strict';
    // Frontal camera
    cameraFrontal = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000);
    cameraFrontal.position.set(0, 0, 500);
    cameraFrontal.lookAt(scene.position);

    // Lateral camera
    cameraLateral = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000);
    cameraLateral.position.set(500, 0, 0);
    cameraLateral.lookAt(scene.position);

    // Topo camera
    cameraTopo = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000);
    cameraTopo.position.set(0, 500, 0);
    cameraTopo.lookAt(scene.position);

    // Orthogonal isometric camera
    cameraOrtogonal = new THREE.OrthographicCamera(-500, 500, 500, -500, 0.1, 1000);
    cameraOrtogonal.position.set(500, 500, 500);
    cameraOrtogonal.lookAt(scene.position);

    // Perspective isometric camera
    cameraPerspectiva = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraPerspectiva.position.set(500, 500, 500);
    cameraPerspectiva.lookAt(scene.position);

    // Set the initial active camera
    activeCamera = cameraFrontal;
}

/* SWITCH ACTIVE CAMERA */
function switchCamera(camera) {
    'use strict';
    activeCamera = camera;
}

/* UPDATE */
function update() {
    'use strict';
    // Update scene elements, animations, etc.
}

/* RENDER */
function render() {
    'use strict';
    renderer.render(scene, activeCamera);
}

/* INITIALIZE ANIMATION CYCLE */
function init() {
    'use strict';
    createScene();
    createCameras();

    // Initialize renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Call the animate function to start the animation loop
    animate();
}

/* ANIMATION CYCLE */
function animate() {
    'use strict';
    requestAnimationFrame(animate);

    update();
    render();
}

/* RESIZE WINDOW CALLBACK */
function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update camera aspect ratios if necessary
    cameraFrontal.aspect = window.innerWidth / window.innerHeight;
    cameraFrontal.updateProjectionMatrix();

    cameraLateral.aspect = window.innerWidth / window.innerHeight;
    cameraLateral.updateProjectionMatrix();

    cameraTopo.aspect = window.innerWidth / window.innerHeight;
    cameraTopo.updateProjectionMatrix();

    cameraOrtogonal.aspect = window.innerWidth / window.innerHeight;
    cameraOrtogonal.updateProjectionMatrix();

    cameraPerspectiva.aspect = window.innerWidth / window.innerHeight;
    cameraPerspectiva.updateProjectionMatrix();
}

/* KEY DOWN CALLBACK */
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: // Numeric key 1
            switchCamera(cameraFrontal);
            break;
        case 50: // Numeric key 2
            switchCamera(cameraLateral);
            break;
        case 51: // Numeric key 3
            switchCamera(cameraTopo);
            break;
        case 52: // Numeric key 4
            switchCamera(cameraOrtogonal);
            break;
        case 53: // Numeric key 5
            switchCamera(cameraPerspectiva);
            break;
        default:
            break;
    }
}

/* ADD EVENT LISTENERS */
window.addEventListener('resize', onResize, false);
window.addEventListener('keydown', onKeyDown, false);

// Start the initialization process
init();
