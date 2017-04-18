"use strict";

import * as THREE from "three";
import Stats from "stats-js";
import Mediator from "../modules/mediator";
import { EVENTS } from "./events";
import MapGame from "./hexandriaGraphics/MapGraphics";
import HexTown from "./hexandriaGraphics/TownGraphics";
import HexSquad from "./hexandriaGraphics/SquadGraphics";

const OrbitControls = require("three-orbit-controls")(THREE);

export default class HexandriaGraphics {
    constructor(game, element) {
        console.log("HexandriaGraphics created");

        this.game = game;
        this.element = element;

        (new Mediator()).subscribe(this, "drawMapEvent", "drawMap");

        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.MOVE, "movePlayer");

        window.onkeypress = function(e) {
            if (e.keyCode === 13) {
                console.log(EVENTS.KEYBOARD.ENTER_PRESSED);
                (new Mediator()).emit(EVENTS.KEYBOARD.ENTER_PRESSED);
            }
        };

        this.gameProcess();
    }

    drawMap(options) {
        console.log("drawMap:", options);
    }

    initTowns() {
        this.towns = [];

        const towns = this.game.field.towns;
        for (const index in towns) {
            if (towns[index]) {
                // console.log(towns[index]);

                this.towns.push(new HexTown(this.scene, 0x777777, towns[index].position));
            }
        }
    }

    initPlayers() {
        this.players = [];
        this.playersMap = {};

        for (const playerName in this.game.players) {
            if (this.game.players[playerName]) {
                const playerColor = this.game.players[playerName].color;
                const playerArmy = this.game.players[playerName].army;

                this.playersMap[playerName] = [];

                // console.log(playerName, playerArmy);
                for (const index in playerArmy) {
                    if (playerArmy[index]) {
                        const squad = playerArmy[index];

                        // console.log(playerName, squad.position);

                        const newPlayer = new HexSquad(this.scene, playerColor, squad.position);
                        this.players.push(newPlayer);
                        this.playersMap[playerName].push(newPlayer);
                    }
                }
            }
        }
    }

    movePlayer(player) {
        console.log("movePlayer", player);
        this.playersMap[player.name][player.index].move(player.position.x, player.position.y);
    }

    gameProcess() {
        this.gameStart();
        this.initTowns();
        this.initPlayers();
    }

    gameStart () {
        // Graphics variables
        let container,
            stats;
        let camera,
            controls,
            scene,
            renderer;
        let textureLoader;
        const clock = new THREE.Clock();
        let mouse,
            raycaster;

        let time = 0;
        let keyQ = false;

        // - Main code -

        initGraphics(this.element);
        initInput();
        createObjects();

        const _map = new MapGame(scene, this.game);

        animate();

        this.scene = scene;
        this.map = _map;

        // - Functions -

        function initGraphics(element) {
            const sel = `${element} .game-container`;
            console.log(sel);
            container = document.querySelector(sel);

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
            camera.position.x = 11;
            camera.position.y = 5;
            camera.position.z = 7;
            camera.up.set(0, 0, 1);

            controls = new OrbitControls(camera);
            controls.target.x = 5;
            controls.target.y = 5;
            controls.target.z = 0;

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
                new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                }));
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
        }

        function createParalellepiped(sx, sy, sz, mass, pos, quat, material) {
            const threeObject = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);

            createRigidBody(threeObject, mass, pos, quat);

            return threeObject;
        }

        function createRigidBody(threeObject, mass, pos, quat) {
            threeObject.position.copy(pos);
            threeObject.quaternion.copy(quat);
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

        function mouseCoordinates(event) {
            mouse.x = ((event.clientX - container.offsetLeft) / renderer.domElement.width) * 2 - 1;
            mouse.y = -((event.clientY - container.offsetTop) / renderer.domElement.height) * 2 + 1;
        }

        function onDocumentMouseMove(event) {
            event.preventDefault();

            mouseCoordinates(event);

            raycaster.setFromCamera(mouse, camera);
            // const intersects = raycaster.intersectObjects(_map.scene.children);
            const intersects = raycaster.intersectObjects(_map.fieldGroup.children);

            _map.handleHighlight(intersects);
        }

        function onDocumentMouseDown(event) {
            event.preventDefault();

            if (event.buttons === 1) {
                mouseCoordinates(event);

                raycaster.setFromCamera(mouse, camera);
                // const intersects = raycaster.intersectObjects(_map.scene.children);
                const intersects = raycaster.intersectObjects(_map.fieldGroup.children);

                _map.handleSelect(intersects);
            }
        }

        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            render();
            stats.update();
        }

        function render() {
            const deltaTime = clock.getDelta();

            controls.update(deltaTime);

            renderer.render(scene, camera);

            time += deltaTime;
        }
    }


}
