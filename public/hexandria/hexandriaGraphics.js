import * as THREE from 'three';
// import Stats from 'stats-js';
import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import MapGraphics from './hexandriaGraphics/mapGraphics';
import TownGraphics from './hexandriaGraphics/townGraphics';
import SquadGraphics from './hexandriaGraphics/squadGraphics';
import HexandriaUtils from './hexandriaUtils';

const OrbitControls = require('three-orbit-controls')(THREE);

export default class HexandriaGraphics {
    constructor(game, element) {
        console.log('HexandriaGraphics created');

        this.game = game;
        this.element = element;

        this._scene = null;
        this._id = null;
        this._raycaster = null;
        this._mouseHandler = true;

        this.map = null;
        this.townsMap = null;
        this.squadsMap = null;

        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SQUAD_MOVE, 'squadMove');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SQUAD_UPDATE, 'squadUpdate');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SQUAD_DELETE, 'squadDelete');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.TOWN_CAPTURE, 'townCapture');

        window.onkeypress = function(e) {
            if (e.keyCode === 13) {
                console.log(EVENTS.KEYBOARD.ENTER_PRESSED);
                (new Mediator()).emit(EVENTS.KEYBOARD.ENTER_PRESSED);
            }
        };

        this.initGame();
    }

    destroy() {
        console.log('destroy');

        cancelAnimationFrame(this._id);

        this.map.destroy();

        while (this._scene.children.length > 0) {
            // console.log('deleting...', this._scene.children[0]);
            this._scene.remove(this._scene.children[0]);
        }

        this._scene = null;
        this._id = null;
        this._raycaster = null;
        this._mouseHandler = null;

        this.map = null;
        this.townsMap = null;
        this.squadsMap = null;

        const sel = `${this.element} .game-container`;
        const container = document.querySelector(sel);
        container.innerHTML = '';

        this.game = null;
        this.element = null;
    }

    initTowns() {
        this.townsMap = {};

        HexandriaUtils.forFieldTowns(
            this.game,
            (town) => {
                const newTown = new TownGraphics(this._scene, 0x777777, town);
                this.townsMap[town.name] = newTown;
            },
        );

        // color capitals
        HexandriaUtils.forPlayers(
            this.game,
            (playerObject) => {
                const player = playerObject.player;
                if (this.townsMap[player.capital]) {
                    this.townsMap[player.capital].changeColor(player.color);
                }
            },
        );

        // color towns
        HexandriaUtils.forPlayersTowns(
            this.game,
            (townObject) => {
                if (this.townsMap[townObject.town]) {
                    this.townsMap[townObject.town].changeColor(townObject.player.color);
                }
            },
        );
    }

    initSquads() {
        this.squadsMap = {};

        HexandriaUtils.forPlayers(
            this.game,
            (playerObject) => {
                this.squadsMap[playerObject.player.name] = [];
            },
        );
        HexandriaUtils.forPlayersSquads(
            this.game,
            (squadObject) => {
                const newSquad = new SquadGraphics(this._scene, squadObject.player.color, squadObject.squad);
                this.squadsMap[squadObject.player.name].push(newSquad);
            },
        );
    }

    squadMove(data) {
        this.squadsMap[data.playerName][data.squadIndex].move(data.position.x, data.position.y);
    }

    squadUpdate(data) {
        this.squadsMap[data.playerName][data.squadIndex].setSprite(data.squad.count, data.squad.morale);
    }

    squadDelete(data) {
        this.squadsMap[data.playerName][data.squadIndex].remove();
        this.squadsMap[data.playerName].splice(data.squadIndex, 1);
    }

    townCapture(data) {
        this.townsMap[data.townName].changeColor(data.playerColor);
    }

    initGame() {
        this.initTHREE();

        this.map = new MapGraphics(this._scene, this.game);
        this.initTowns();
        this.initSquads();
    }

    initTHREE () {
        console.log('initTHREE');
        // Graphics variables
        const clock = new THREE.Clock();
        let container,
            camera,
            controls,
            renderer,
            textureLoader,
            mouse,
            time = 0,
            keyQ = false;

        // - Main code -

        initGraphics.call(this);
        initInput();
        animate.call(this);

        // - Functions -

        function initGraphics() {
            console.log('initGraphics', this);

            const sel = `${this.element} .game-container`;
            console.log(sel);
            container = document.querySelector(sel);

            renderer = new THREE.WebGLRenderer();
            // renderer.setClearColor(0xbfd1e5);
            renderer.setClearColor(0xffffff);
            renderer.setPixelRatio(container.devicePixelRatio);
            renderer.setSize(container.clientWidth, container.clientHeight);
            // renderer.setSize(200, 200);
            renderer.shadowMap.enabled = true;

            this._scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.2, 2000);
            camera.position.x = 11;
            camera.position.y = 5;
            camera.position.z = 7;
            camera.up.set(0, 0, 1);

            controls = new OrbitControls(camera, container);
            controls.target.x = 5;
            controls.target.y = 5;
            controls.target.z = 0;

            textureLoader = new THREE.TextureLoader();

            const ambientLight = new THREE.AmbientLight(0x404040);
            this._scene.add(ambientLight);

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
            this._scene.add(light);


            container.innerHTML = '';

            container.appendChild(renderer.domElement);

            /* stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            container.appendChild(stats.domElement);*/

            mouse = new THREE.Vector2();
            this._raycaster = new THREE.Raycaster();

            container.addEventListener('mousemove', onDocumentMouseMove.bind(this), false);
            container.addEventListener('mousedown', onDocumentMouseDown.bind(this), false);

            window.addEventListener('resize', onWindowResize, false);
        }

        function initInput() {
            window.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    // Q
                    case 81:
                        keyQ = true;
                        break;
                    default:
                        // do nothing
                }
            }, false);

            window.addEventListener('keyup', (event) => {
                switch (event.keyCode) {
                    // Q
                    case 81:
                        keyQ = false;
                        break;
                    default:
                        // do nothing
                }
            }, false);
        }

        function mouseCoordinates(event) {
            mouse.x = ((event.clientX - container.offsetLeft) / renderer.domElement.width) * 2 - 1;
            mouse.y = -((event.clientY - container.offsetTop) / renderer.domElement.height) * 2 + 1;
        }

        function onDocumentMouseMove(event) {
            event.preventDefault();

            if (this._mouseHandler) {
                mouseCoordinates(event);

                this._raycaster.setFromCamera(mouse, camera);
                const intersects = this._raycaster.intersectObjects(this.map.fieldGroup.children);

                this.map.handleHighlight(intersects);
            }
        }

        function onDocumentMouseDown(event) {
            event.preventDefault();

            if (this._mouseHandler && event.buttons === 1) {
                mouseCoordinates(event);

                this._raycaster.setFromCamera(mouse, camera);
                const intersects = this._raycaster.intersectObjects(this.map.fieldGroup.children);

                this.map.handleSelect(intersects);
            }
        }

        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        function animate() {
            this._id = requestAnimationFrame(animate.bind(this));

            render.call(this);
            // stats.update();
        }

        function render() {
            const deltaTime = clock.getDelta();

            controls.update(deltaTime);

            renderer.render(this._scene, camera);

            time += deltaTime;
        }
    }
}
