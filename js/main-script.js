/* GLOBAL VARIABLES */
var scene, 
cameraFrontal, cameraLateral, cameraTopo, cameraOrtogonal, cameraPerspectiva, 
renderer, 
activeCamera;

var materials = []; // Array to store materials

/* CREATE SCENE(S) */
function createScene() {
    'use strict';
    scene = new THREE.Scene();

    // Set the background color of the scene
    scene.background = new THREE.Color(0x78d6ff);

    // ------------------------ROBOT-----------------------------------
    var top, bottom;
    var blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    materials.push(blueMaterial); // Add material to materials array
    materials.push(redMaterial); // Add material to materials array

    // ---- PARTE DE CIMA ----
    var top = new THREE.Object3D();

    // ---- CABEÇA ----
    var fullhead = new THREE.Object3D();

    //head (cube)
    var headGeometry = new THREE.BoxGeometry(80, 80, 80);
    var head = new THREE.Mesh(headGeometry, blueMaterial);
    head.position.set(0,125,0);
    fullhead.add(head);

    //antenas (cylinder)
    var antenasGeometry = new THREE.CylinderGeometry(10,10,70);
    var antenas1 = new THREE.Mesh(antenasGeometry, redMaterial);
    var antenas2 = new THREE.Mesh(antenasGeometry, redMaterial);
    antenas1.position.set(50,140,0);
    antenas2.position.set(-50,140,0);
    fullhead.add(antenas1);
    fullhead.add(antenas2);

    top.add(fullhead);

    // ---- TRONCO ----

    // tronco (cube)
    var troncoGeometry = new THREE.BoxGeometry(300, 150, 150);
    var tronco = new THREE.Mesh(troncoGeometry, redMaterial);
    top.add(tronco);

    //abdomen (cube)
    var abdomenGeometry = new THREE.BoxGeometry(150, 100, 150); //largura altura profundidade
    var abdomen = new THREE.Mesh(abdomenGeometry, blueMaterial);
    abdomen.position.set(0,-125,0);
    top.add(abdomen);

    // ---- BRAÇOS ----
    var fullArm1 = new THREE.Object3D();
    var fullArm2 = new THREE.Object3D();

    //arm1 (cube)
    var armGeometry = new THREE.BoxGeometry(100, 150, 100);
    var arm1 = new THREE.Mesh(armGeometry, blueMaterial);
    arm1.position.set(-200,0,-25);
    fullArm1.add(arm1);

    //arm2 (cube)
    var arm2 = new THREE.Mesh(armGeometry, blueMaterial);
    arm2.position.set(200,0,-25); 
    fullArm2.add(arm2);

    //forearm1 (cube)
    var forearmGeometry = new THREE.BoxGeometry(100, 100, 150);
    var forearm1 = new THREE.Mesh(forearmGeometry, redMaterial);
    forearm1.position.set(-200,-125,0);
    fullArm1.add(forearm1)

    //forearm2 (cube)
    var forearm2 = new THREE.Mesh(forearmGeometry, redMaterial);
    forearm2.position.set(200,-125,0);
    fullArm2.add(forearm2);

    //tuboEscape1 (cylinder)
    var tuboEscapeGeometry = new THREE.CylinderGeometry(50, 50, 100);
    var tuboEscape1 = new THREE.Mesh(tuboEscapeGeometry, blueMaterial);
    tuboEscape1.position.set(-300,-125,-25);
    fullArm1.add(tuboEscape1);

    //tuboEscape2 (cylinder)
    var tuboEscapeGeometry = new THREE.CylinderGeometry(50, 50, 100);
    var tuboEscape2 = new THREE.Mesh(tuboEscapeGeometry, blueMaterial);
    tuboEscape2.position.set(300,-125,-25);
    fullArm2.add(tuboEscape2);

    //ADD TO TOP
    top.add(fullArm1);
    top.add(fullArm2);
    //TOP COMPLETE

    
    // ---- PARTE DE BAIXO ---
    var fullWaist = new THREE.Object3D();

    //waist (cube)
    var waistGeometry = new THREE.BoxGeometry(300, 100, 100);
    var waist = new THREE.Mesh(waistGeometry, blueMaterial);
    waist.position.set(0,-225,0);
    fullWaist.add(waist);

    //wheel1 (cylinder)
    var wheelGeometry = new THREE.CylinderGeometry(50, 50, 50);
    var wheel1 = new THREE.Mesh(wheelGeometry, redMaterial);
    wheel1.rotation.z += 77;
    wheel1.position.set(-175,-225,0);
    fullWaist.add(wheel1);

    //wheel2 (cylinder)
    var wheel2 = new THREE.Mesh(wheelGeometry, redMaterial);
    wheel2.rotation.z += 77;
    wheel2.position.set(175,-225,0);
    fullWaist.add(wheel2);

    // ---- PERNAS ----
    var fullLeg1 = new THREE.Object3D();
    var fullLeg2 = new THREE.Object3D();

    //coxa1 (cube)
    var coxaGeometry = new THREE.BoxGeometry(50, 200, 50);
    var coxa1 = new THREE.Mesh(coxaGeometry, redMaterial);
    coxa1.position.set(-100,-375,0);
    fullLeg1.add(coxa1);

    //coxa2 (cube)
    var coxa2 = new THREE.Mesh(coxaGeometry, redMaterial);
    coxa2.position.set(100,-375,0);
    fullLeg2.add(coxa2);

    //perna1 (cube)
    var pernaGeometry = new THREE.BoxGeometry(100, 200, 100);
    var perna1 = new THREE.Mesh(pernaGeometry, blueMaterial);
    perna1.position.set(-100,-575,0);
    fullLeg1.add(perna1);

    //perna2 (cube)
    var perna2 = new THREE.Mesh(pernaGeometry, blueMaterial);
    perna2.position.set(100,-575,0);
    fullLeg2.add(perna2);

    // ---- PES ----

    //foot1 (cube)
    var footGeometry = new THREE.BoxGeometry(150, 25, 125);
    var foot1 = new THREE.Mesh(footGeometry, redMaterial);
    foot1.position.set(100,-687.5,12.5);
    fullLeg1.add(foot1);
    //foot2 (cube)
    var foot2 = new THREE.Mesh(footGeometry, redMaterial);
    foot2.position.set(-100,-687.5,12.5);
    fullLeg2.add(foot2);

    //ADD TO BOTTOM
    var bottom = new THREE.Object3D();
    bottom.add(fullWaist);
    bottom.add(fullLeg1);
    bottom.add(fullLeg2);
    //BOTTOM COMPLETE

   //add hierarchies (ou la como se escreve)
    scene.add(top);
    scene.add(bottom);



    // ------------------------REBOQUE-----------------------------------
    //var weel_reboque;
    //var peca_ligacao;
    /*
    var contentorGeometry = new THREE.BoxGeometry(500, 500, 1000);
    var contentorMaterial = new THREE.MeshBasicMaterial({ color: 0x0a4e6b });
    var contentor = new THREE.Mesh(contentorGeometry, contentorMaterial);
    contentor.position.set(0,-75,-700);

    var reboque = new THREE.Object3D();
    reboque.add(contentor);
    scene.add(reboque);
    */

}

/* CREATE CAMERA(S) */
function createCameras() {
    'use strict';

    var viewSize = 2000 // Adjust this value based on the size of your scene
    var aspectRatio = window.innerWidth / window.innerHeight;

    // Frontal camera 
    cameraFrontal = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, 0.1, 1000);
    cameraFrontal.position.set(0, 0, 500);
    cameraFrontal.lookAt(scene.position);

    // Lateral camera
    cameraLateral = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, 0.1, 1000);
    cameraLateral.position.set(500, 0, 0);
    cameraLateral.lookAt(scene.position);

    // Topo camera
    cameraTopo = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, 0.1, 1000);
    cameraTopo.position.set(0, 500, 0);
    cameraTopo.lookAt(scene.position);

    // Orthogonal isometric camera
    cameraOrtogonal = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, 0.1, 1000);
    cameraOrtogonal.position.set(500, 500, 500);
    cameraOrtogonal.lookAt(scene.position);

    // Perspective isometric camera
    cameraPerspectiva = new THREE.PerspectiveCamera(45,aspectRatio, 0.1, 1000);
    cameraPerspectiva.position.set(500, 500, 500);
    cameraPerspectiva.lookAt(scene.position);

    // Set the initial active camera
    activeCamera = cameraFrontal;
}

/* SWITCH ACTIVE CAMERA */
function switchCamera(camera) {
    'use strict';
    activeCamera = camera;
    activeCamera.updateProjectionMatrix();
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
        case 54: // Numeric key 6
            toggleWireframe();
            break;
        default:
            break;
    }
}

function toggleWireframe() {
    for (var i = 0; i < materials.length; i++) {
        var material = materials[i];
        material.wireframe = !material.wireframe;
    }
}

/* ADD EVENT LISTENERS */
window.addEventListener('resize', onResize, false);
window.addEventListener('keydown', onKeyDown, false);

// Start the initialization process
init();
