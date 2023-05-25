/* GLOBAL VARIABLES */
var scene, 
cameraFrontal, cameraLateral, cameraTopo, cameraOrtogonal, cameraPerspectiva, 
renderer, 
activeCamera;

var materials = []; // Array to store materials

var fullhead = new THREE.Object3D();
var feet = new THREE.Object3D();
var bottom = new THREE.Object3D();

var head_movement = 0 ;
var feet_movement = 0;
var bottom_movement = 0;

/* CREATE SCENE(S) */
function createScene() {
    'use strict';
    scene = new THREE.Scene();

    // Set the background color of the scene
    scene.background = new THREE.Color(0x78d6ff);

    // ------------------------ROBOT-----------------------------------
    var robot = new THREE.Object3D();

    var blueMaterial = new THREE.MeshBasicMaterial({ color: 0xbcff1f });
    var redMaterial = new THREE.MeshBasicMaterial({ color: 0xff1fad});
    var whiteMaterial = new THREE.MeshBasicMaterial({ color: 0x1f8bff });
    var blackMaterial = new THREE.MeshBasicMaterial({ color: 0xffa51f });
    materials.push(blueMaterial); // Add material to materials array
    materials.push(redMaterial); // Add material to materials array
    materials.push(whiteMaterial); // Add material to materials array
    materials.push(blackMaterial); // Add material to materials array

    // ---- PARTE DE CIMA ----
    var top = new THREE.Object3D();
    
    //head (cube)
    var headGeometry = new THREE.BoxGeometry(8, 8, 8);
    var head = new THREE.Mesh(headGeometry, blueMaterial);
    head.position.set(0,4,0);
    fullhead.add(head);

    //antenas (cylinder)
    var antenasGeometry = new THREE.CylinderGeometry(1,1,7);
    var antenasR = new THREE.Mesh(antenasGeometry, redMaterial);
    var antenasL = new THREE.Mesh(antenasGeometry, redMaterial);
    antenasR.position.set(-5,6.5,0);
    antenasL.position.set(5,6.5,0);
    fullhead.add(antenasR);
    fullhead.add(antenasL);

    //Right olho (cube)
    var olhoGeometry = new THREE.BoxGeometry(2,1,0.5);
    var olhoR = new THREE.Mesh(olhoGeometry, redMaterial);
    var olhoL = new THREE.Mesh(olhoGeometry, redMaterial);
    olhoR.position.set(-2,4,4.25);
    olhoL.position.set(2,4,4.25);
    fullhead.add(olhoR);
    fullhead.add(olhoL);

    fullhead.position.set(0,7.49,0);

    top.add(fullhead);

    // ---- TRONCO ----

    // tronco (cube)
    var troncoGeometry = new THREE.BoxGeometry(30, 15, 15);
    var tronco = new THREE.Mesh(troncoGeometry, redMaterial);
    top.add(tronco);

    //abdomen (cube)
    var abdomenGeometry = new THREE.BoxGeometry(10, 10, 15); //largura altura profundidade
    var abdomen = new THREE.Mesh(abdomenGeometry, blueMaterial);
    abdomen.position.set(0,-12.5,0);
    top.add(abdomen);

    // ---- BRAÇOS ----
    var fullArmR = new THREE.Object3D();
    var fullArmL = new THREE.Object3D();

    //Right arm(cube)
    var armGeometry = new THREE.BoxGeometry(10, 15, 7.5);
    var armR = new THREE.Mesh(armGeometry, blueMaterial);
    armR.position.set(-20,0,-3.75); 
    fullArmR.add(armR);

    //Right forearm (cube)
    var forearmGeometry = new THREE.BoxGeometry(10, 10, 15);
    var forearmR = new THREE.Mesh(forearmGeometry, redMaterial);
    forearmR.position.set(-20,-12.5,0);
    fullArmR.add(forearmR)

    //Right tuboEscape (cylinder)
    var tuboEscapeGeometry = new THREE.CylinderGeometry(2.5, 2.5, 15);
    var tuboEscapeR = new THREE.Mesh(tuboEscapeGeometry, redMaterial);
    tuboEscapeR.position.set(-27.5,7.5,-3.75);
    fullArmR.add(tuboEscapeR);


    //Left arm (cube)
    var armL = new THREE.Mesh(armGeometry, blueMaterial);
    armL.position.set(20,0,-3.75); 
    fullArmL.add(armL);

    //Left forearm (cube)
    var forearmL = new THREE.Mesh(forearmGeometry, redMaterial);
    forearmL.position.set(20,-12.5,0);
    fullArmL.add(forearmL);

    //Left tuboEscape (cylinder)
    var tuboEscapeL = new THREE.Mesh(tuboEscapeGeometry, redMaterial);
    tuboEscapeL.position.set(27.5,7.5,-3.75);
    fullArmL.add(tuboEscapeL);


    //ADD TO TOP
    top.add(fullArmR);
    top.add(fullArmL);
    //TOP COMPLETE

    
    // ---- PARTE DE BAIXO ---
    var fullWaist = new THREE.Object3D();

    //waist (cube)
    var waistGeometry = new THREE.BoxGeometry(30, 10, 7);
    var waist = new THREE.Mesh(waistGeometry, blueMaterial);
    waist.position.set(0,-22.5,0);
    fullWaist.add(waist);

    //Right wheel (cylinder)
    var wheelGeometry = new THREE.CylinderGeometry(5, 5, 5, 10);
    var wheelR = new THREE.Mesh(wheelGeometry, blackMaterial);
    wheelR.rotation.z = Math.PI / 2;
    wheelR.position.set(-17.5,-22.5,0);
    fullWaist.add(wheelR);

    //Left wheel (cylinder)
    var wheelL = new THREE.Mesh(wheelGeometry, blackMaterial);
    wheelL.rotation.z = Math.PI / 2;
    wheelL.position.set(17.5,-22.5,0);
    fullWaist.add(wheelL);


    // ---- PERNAS ----
    var fullLeg = new THREE.Object3D();

    //Right coxa (cube)
    var coxaGeometry = new THREE.BoxGeometry(5, 20, 5);
    var coxaR = new THREE.Mesh(coxaGeometry, redMaterial);
    coxaR.position.set(-10,-37.5,0);
    fullLeg.add(coxaR);

    //Right perna (cube)
    var pernaGeometry = new THREE.BoxGeometry(10, 25, 7.5);
    var pernaR = new THREE.Mesh(pernaGeometry, blueMaterial);
    pernaR.position.set(-10,-60,0);
    fullLeg.add(pernaR);

    //Right legWheelTopR (cylinder)
    var legWheelTopR = new THREE.Mesh(wheelGeometry, blackMaterial);
    legWheelTopR.rotation.z = Math.PI / 2;
    legWheelTopR.position.set(-17.5,-52.5,0);
    fullWaist.add(legWheelTopR);

    //Right legWheelBottomR (cylinder)
    var legWheelBottomR = new THREE.Mesh(wheelGeometry, blackMaterial);
    legWheelBottomR.rotation.z = Math.PI / 2;
    legWheelBottomR.position.set(-17.5,-65,0);
    fullWaist.add(legWheelBottomR);



    //Left coxa (cube)
    var coxaL = new THREE.Mesh(coxaGeometry, redMaterial);
    coxaL.position.set(10,-37.5,0);
    fullLeg.add(coxaL);

    //Left perna (cube)
    var pernaL = new THREE.Mesh(pernaGeometry, blueMaterial);
    pernaL.position.set(10,-60,0);
    fullLeg.add(pernaL);

    //Left legWheelTopL (cylinder)
    var legWheelTopL = new THREE.Mesh(wheelGeometry, blackMaterial);
    legWheelTopL.rotation.z = Math.PI / 2;
    legWheelTopL.position.set(17.5,-52.5,0);
    fullWaist.add(legWheelTopL);

    //Left legWheelBottomL (cylinder)
    var legWheelBottomL = new THREE.Mesh(wheelGeometry, blackMaterial);
    legWheelBottomL.rotation.z = Math.PI / 2;
    legWheelBottomL.position.set(17.5,-65,0);
    fullWaist.add(legWheelBottomL);



    // ---- PES ----

    //Right foot (cube)
    var footGeometry = new THREE.BoxGeometry(10, 2.5, 7.5);
    var footR = new THREE.Mesh(footGeometry, redMaterial);
    footR.position.set(-10,-71.25,7.5);

    //Left foot (cube)
    var footL = new THREE.Mesh(footGeometry, redMaterial);
    footL.position.set(10,-71.25,7.5);

    feet.add(footR);
    feet.add(footL);
    
    fullLeg.add(feet);
    //ADD TO BOTTOM
    bottom.add(fullWaist);
    bottom.add(fullLeg);
    //BOTTOM COMPLETE

    robot.add(top);
    robot.add(bottom);


    // ------------------------REBOQUE-----------------------------------
    var reboque = new THREE.Object3D();

    // ---- CONTENTOR ----
    var contentorGeometry = new THREE.BoxGeometry(30, 40, 80);
    var contentor = new THREE.Mesh(contentorGeometry, whiteMaterial);
    contentor.position.set(0,-2.5,-80);
    reboque.add(contentor);

    // ---- RODAS ----
    var wheel1_reboque = new THREE.Mesh(wheelGeometry, blackMaterial);
    wheel1_reboque.position.set(17.5,-22.5,-50);
    wheel1_reboque.rotation.z = Math.PI / 2;
    reboque.add(wheel1_reboque);

    var wheel2_reboque = new THREE.Mesh(wheelGeometry, blackMaterial);
    wheel2_reboque.position.set(17.5,-22.5,-100);
    wheel2_reboque.rotation.z = Math.PI / 2;
    reboque.add(wheel2_reboque);

    var wheel3_reboque = new THREE.Mesh(wheelGeometry, blackMaterial);
    wheel3_reboque.position.set(-17.5,-22.5,-50);
    wheel3_reboque.rotation.z = Math.PI / 2;
    reboque.add(wheel3_reboque);

    var wheel4_reboque = new THREE.Mesh(wheelGeometry, blackMaterial);
    wheel4_reboque.position.set(-17.5,-22.5,-100);
    wheel4_reboque.rotation.z = Math.PI / 2;
    reboque.add(wheel4_reboque);

    // ---- PEÇA DE LIGAÇÃO ----
    var pecaligacaoGeometry = new THREE.BoxGeometry(10, 5, 10);
    var pecaligacao = new THREE.Mesh(pecaligacaoGeometry, redMaterial);
    pecaligacao.position.set(0,-20,-35);
    reboque.add(pecaligacao);
    
    // ----------- POSICIONAR ROBOT E REBOQUE ----------------
    robot.position.z += 70;
    reboque.position.z += 27.5;
    scene.add(robot);
    scene.add(reboque);
}

/* CREATE CAMERA(S) */
function createCameras() {
    'use strict';

    var viewSize = 200; // Adjust this value based on the size of your scene
    var aspectRatio = window.innerWidth / window.innerHeight;

    // Frontal camera 
    cameraFrontal = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, -1000, 1000);
    cameraFrontal.position.set(0, 0, 50);
    cameraFrontal.lookAt(scene.position);

    // Lateral camera
    cameraLateral = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, -1000, 1000);
    cameraLateral.position.set(50, 0, 0);
    cameraLateral.lookAt(scene.position);

    // Topo camera
    cameraTopo = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, -1000, 1000);
    cameraTopo.position.set(0, 50, 0);
    cameraTopo.lookAt(scene.position);

    // Orthogonal isometric camera
    cameraOrtogonal = new THREE.OrthographicCamera((-aspectRatio * viewSize) / 2, (aspectRatio * viewSize) / 2, viewSize / 2, -viewSize / 2, -1000, 1000);
    cameraOrtogonal.position.set(50, 50, 50);
    cameraOrtogonal.lookAt(scene.position);

    // Perspective isometric camera
    cameraPerspectiva = new THREE.PerspectiveCamera(70,aspectRatio, 1, 1000);
    cameraPerspectiva.position.set(100, 100, 100);
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
    update_robot();
}

function update_robot(){
    var min_head=0;
    var max_head=Math.PI;
    var min_feet=-0.01;
    var max_feet=Math.PI + 0.01;
    var min_bottom=-0.01;
    var max_bottom=Math.PI/2 + 0.01;

    if ( fullhead.rotation.x + head_movement <= max_head && fullhead.rotation.x  + head_movement>= min_head){
        fullhead.rotation.x = fullhead.rotation.x + head_movement ; 
    }

    if ( feet.rotation.x + feet_movement <= max_feet && feet.rotation.x  + feet_movement>= min_feet){
        feet.rotation.x = feet.rotation.x + feet_movement ; 
    }

    if ( bottom.rotation.x + bottom_movement <= max_bottom && bottom.rotation.x  + bottom_movement>= min_bottom){
        bottom.rotation.x = bottom.rotation.x + bottom_movement ; 
    }
}

/* RENDER */
function render() {
    'use strict';
    renderer.render(scene, activeCamera);
}

/* INITIALIZE ANIMATION CYCLE */
function init() {
    'use strict';
    // Initialize renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();

    render();
    // Call the animate function to start the animation loop
    
    /* ADD EVENT LISTENERS */
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

/* ANIMATION CYCLE */
function animate() {
    'use strict';
    update();
    render();
    requestAnimationFrame(animate);
}

/* RESIZE WINDOW CALLBACK */
function onResize() {
    'use strict';
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
        case 82: // key R
            head_movement = Math.PI / 100;
            break;
        case 70: // key F 
            head_movement = -Math.PI / 100;
            break;
        case 81: // key Q
            feet_movement = Math.PI / 100;
            break;
        case 65: // key A
            feet_movement = -Math.PI / 100;
            break;
        case 87: // key W
            bottom_movement = Math.PI / 100;
            break;
        case 83: // key S
            bottom_movement = -Math.PI / 100;
            break;
        default:
            break;
    }
}

/* KEY UP CALLBACK */
function onKeyUp(e) {
    'use strict';
    switch (e.keyCode) {
        case 82: // key R
            head_movement = 0;
            break;
        case 70: // key F 
            head_movement = 0;
            break;
        case 81: // key Q
            feet_movement = 0;
            break;
        case 65: // key A
            feet_movement = 0;
            break;
        case 87: // key W
            bottom_movement = 0;
            break;
        case 83: // key S
            bottom_movement = 0;
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


// Start the initialization process
init();
