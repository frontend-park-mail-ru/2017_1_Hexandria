"use strict";

const GameStart = function () {
    console.log("call game()");

    // Graphics variables
    let container,
        stats;
    let camera,
        controls,
        scene,
        renderer;
    let textureLoader;
    const clock = new THREE.Clock();
    let game;
    let mouse,
        raycaster;
    let intersects,
        INTERSECTED;

    let time = 0;
    let keyQ = false;

    // - Main code -

    init();
    animate();


    // - Functions -

    function init() {
        initGraphics();

        createObjects();

        initInput();
    }

    function initGraphics() {
        container = document.querySelector(".game-container");

        renderer = new THREE.WebGLRenderer();
        // renderer.setClearColor(0xbfd1e5);
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(container.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        // renderer.setSize(200, 200);
        renderer.shadowMap.enabled = true;

        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();

        // camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);
        camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.2, 2000);

        camera.position.x = -7;
        camera.position.y = 5;
        camera.position.z = 8;
        camera.up.set(0, 0, 1);

        controls = new THREE.OrbitControls(camera);
        controls.target.y = 2;

        textureLoader = new THREE.TextureLoader();

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(-10, 10, 10);
        light.castShadow = true;
        const d = 10;
        light.shadow.camera.left = -d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = -d;
        light.shadow.camera.near = 2;
        light.shadow.camera.far = 50;
        light.shadow.mapSize.x = 1024;
        light.shadow.mapSize.y = 1024;
        scene.add(light);


        container.innerHTML = "";

        container.appendChild(renderer.domElement);

        stats = new Stats();
        stats.domElement.style.position = "absolute";
        stats.domElement.style.top = "0px";
        container.appendChild(stats.domElement);


        mouse = new THREE.Vector2();
        raycaster = new THREE.Raycaster();

        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("mousedown", onDocumentMouseDown, false);

        window.addEventListener("resize", onWindowResize, false);
    }

    function createObjects() {
        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();

        pos.set(0, 0, -0.5);
        quat.set(0, 0, 0, 1);
        const ground = createParalellepiped(40, 40, 1, 0, pos, quat,
            new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
        ground.castShadow = true;
        ground.receiveShadow = true;
        textureLoader.load("textures/grid.png", (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(40, 40);
            ground.material.map = texture;
            ground.material.needsUpdate = true;
        });
        scene.add(ground);

        // let axisHelper = new THREE.AxisHelper(1);
        // pos.set(0.0, 0.0, 0.01);
        // axisHelper.position.copy(pos);
        // scene.add(axisHelper);

        game = new Hexandria(scene);
        game.setMap(5, 10);
    }

    function createParalellepiped(sx, sy, sz, mass, pos, quat, material) {
        const threeObject = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);

        createRigidBody(threeObject, mass, pos, quat);

        return threeObject;
    }

    function createRigidBody(threeObject, mass, pos, quat) {
        threeObject.position.copy(pos);
        threeObject.quaternion.copy(quat);

        scene.add(threeObject);
    }

    function initInput() {
        window.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                // Q
            case 81:
                keyQ = true;
                break;
            }
        }, false);

        window.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                // Q
            case 81:
                keyQ = false;
                break;
            }
        }, false);
    }

    function mouseCoordinates() {
        mouse.x = ((event.clientX - container.offsetLeft) / renderer.domElement.width) * 2 - 1;
        mouse.y = -((event.clientY - container.offsetTop) / renderer.domElement.height) * 2 + 1;
    }

    function onDocumentMouseMove(event) {
        event.preventDefault();

        mouseCoordinates();

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        game.handleHighlight(intersects);
    }

    function onDocumentMouseDown(event) {
        event.preventDefault();

        if (event.buttons === 1) {
            mouseCoordinates();

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);

            game.handleSelect(intersects);
        }
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();


        console.log(container.clientWidth);
        console.log(container.clientHeight);
        console.log();

        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        render();
        stats.update();
    }

    function render() {
        const deltaTime = clock.getDelta();

        game.setRandomColor();

        controls.update(deltaTime);

        renderer.render(scene, camera);

        time += deltaTime;
    }
};

