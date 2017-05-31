import * as THREE from 'three';
import Mediator from '../modules/mediator';
import { EVENTS } from './events';
import MapGraphics from './hexandriaGraphics/mapGraphics';
import TownGraphics from './hexandriaGraphics/townGraphics';
import SquadGraphics from './hexandriaGraphics/squadGraphics';
import UtilsGraphics from './hexandriaGraphics/utilsGraphics';
import HexandriaUtils from './hexandriaUtils';

import OrbitControlsModule from './hexandriaGraphics/orbitControls';

const OrbitControls = OrbitControlsModule(THREE);

export default class HexandriaGraphics {
    constructor(game) {
        console.log('HexandriaGraphics');

        this.__move = (e) => { this.onDocumentMouseMove(e); };
        this.__down = (e) => { this.onDocumentMouseDown(e); };
        this.__resize = (e) => { this.onWindowResize(e); };

        this.game = null;

        this.selector = '#game .threejs-container';
        console.log(this.selector);

        this._clock = null;
        this._container = null;
        this._camera = null;
        this._controls = null;
        this._renderer = null;
        this._mouse = null;

        this._scene = null;
        this._id = null;
        this._raycaster = null;
        this._mouseHandler = true;

        this.map = null;
        this.townsMap = null;
        this.squadsMap = null;

        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SQUAD_MOVE, 'squadMove');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SQUAD_CREATE, 'squadCreate');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SQUAD_UPDATE, 'squadUpdate');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SQUAD_DELETE, 'squadDelete');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.TOWN_CAPTURE, 'townCapture');
    }

    destroy() {
        cancelAnimationFrame(this._id);

        if (this.game) {
            this.map.destroy();

            while (this._scene.children.length > 0) {
                this._scene.remove(this._scene.children[0]);
            }

            this._container.removeEventListener('mousemove', this.__move, false);
            this._container.removeEventListener('mousedown', this.__down, false);
            window.removeEventListener('resize', this.__resize, false);
            this._container.innerHTML = '';

            this.game = null;

            this._clock = null;
            this._container = null;
            this._camera = null;
            this._controls = null;
            this._renderer = null;
            this._mouse = null;

            this._scene = null;
            this._id = null;
            this._raycaster = null;
            // this._mouseHandler = null;

            this.map = null;
            this.townsMap = null;
            this.squadsMap = null;
        }
    }

    initTowns() {
        this.townsMap = {};

        HexandriaUtils.forFieldTowns(
            this.game,
            (town) => {
                const isCapital = this.game.players.find((p) => {
                    return p.capital === town.name;
                });

                this.townsMap[town.name] = new TownGraphics(this._scene, 0x777777, town, isCapital);
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
                // const newSquad = new SquadGraphics(this._scene, squadObject.player.color, squadObject.squad);
                // this.squadsMap[squadObject.player.name].push(newSquad);

                const createData = {
                    name: squadObject.player.name,
                    color: squadObject.player.color,
                    squad: squadObject.squad,
                };
                (new Mediator()).emit(EVENTS.GRAPHICS.SQUAD_CREATE, createData);
            },
        );
    }

    hasTownCheck(position) {
        return this.game.field.towns.find(function(t) {
            return t.position.x === position.x &&
                t.position.y === position.y;
        });
    }

    squadMove(data) {
        const hasTown = this.hasTownCheck(data.position);

        this.squadsMap[data.playerName][data.squadIndex].move(data.position, hasTown);
    }

    squadCreate(data) {
        const hasTown = this.hasTownCheck(data.squad.position);

        const newSquad = new SquadGraphics(this._scene, data.color, data.squad, hasTown);
        this.squadsMap[data.name].push(newSquad);
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

    initGame(game) {
        console.log('initGame:', game);
        this.game = game;

        this._clock = new THREE.Clock();
        this.initGraphics();

        this.map = new MapGraphics(this._scene, this.game);
        this.initTowns();
        this.initSquads();

        this.animate();
    }

    initGraphics() {
        console.log('initGraphics', this);

        this._container = document.querySelector(this.selector);

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setClearColor(0xffffff);
        this._renderer.setPixelRatio(this._container.devicePixelRatio);

        this._renderer.setSize(window.innerWidth, window.innerHeight);

        this._renderer.shadowMap.enabled = true; // TODO

        this._scene = new THREE.Scene();


        const [borderXmin, borderYmin] = UtilsGraphics.getPosition(0, 0);
        const [borderXmax, borderYmax] = UtilsGraphics.getPosition(this.game.field.size.x - 1, this.game.field.size.y - 1);

        this._camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);
        this._camera.position.x = 11;
        this._camera.position.y = (borderYmin + borderYmax) / 2.0;
        this._camera.position.z = 5;
        this._camera.up.set(0, 0, 1);

        const options = {
            minDistance: 5,
            maxDistance: 20,
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.5,

            border: true,
            borderXmin,
            borderXmax,
            borderYmin,
            borderYmax,
            borderZ: 0.0,
        };
        this._controls = new OrbitControls(this._camera, this._container, options);
        this._controls.target.x = 5;
        this._controls.target.y = this._camera.position.y;
        this._controls.target.z = 0;

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

        this._container.innerHTML = '';
        this._container.appendChild(this._renderer.domElement);

        this._mouse = new THREE.Vector2();
        this._raycaster = new THREE.Raycaster();

        this._container.addEventListener('mousemove', this.__move, false);
        this._container.addEventListener('mousedown', this.__down, false);
        window.addEventListener('resize', this.__resize, false);
    }

    mouseCoordinates(event) {
        this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onDocumentMouseMove(event) {
        event.preventDefault();

        if (this._mouseHandler) {
            this.mouseCoordinates(event);

            this._raycaster.setFromCamera(this._mouse, this._camera);
            const intersects = this._raycaster.intersectObjects(this.map.fieldGroup.children);

            this.map.handleHighlight(intersects);
        }
    }

    onDocumentMouseDown(event) {
        event.preventDefault();

        if (this._mouseHandler && event.buttons === 1) {
            this.mouseCoordinates(event);

            this._raycaster.setFromCamera(this._mouse, this._camera);
            const intersects = this._raycaster.intersectObjects(this.map.fieldGroup.children);

            this.map.handleSelect(intersects);
        }
    }

    onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        this._id = requestAnimationFrame(() => { this.animate(); });

        this.render();
    }

    render() {
        const deltaTime = this._clock.getDelta();

        this._controls.update(deltaTime);

        this._renderer.render(this._scene, this._camera);
    }
}
