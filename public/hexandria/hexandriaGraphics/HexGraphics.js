"use strict";

import * as THREE from "three";
import HexUtils from "./UtilsGraphics";

const _highlightedColor = 0xf08080;
const _selectedSquadColor = 0x660000;
const _selectedAreaColor = 0x333300;

const STANDART_EMISSION = "rgb(30, 30, 0)";
const HIGHLIGHTED_SIMPLE_EMISSION = "rgb(150, 150, 150)";
const HIGHLIGHTED_AREA_EMISSION = "rgb(150, 150, 0)";
const HIGHLIGHTED_SQUAD_EMISSION = "rgb(150, 0, 0)";

export default class HexGame extends THREE.Mesh {

    constructor(scene, color, x, y, z) {
        const geometry = HexUtils.getHexGeometry();

        let texture = new THREE.TextureLoader().load('textures/grass.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        super(geometry, new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            map: texture,
            emissive: STANDART_EMISSION,
        }));
        this.position.set(...HexUtils.getPosition(x, y), z);
        this.rotation.set(0, 0, 0);
        this.scale.set(1, 1, 1);

        this.x = x;
        this.y = y;
        this.highlighted = false;
        this.selected = false;
        this.hasCapital = false;
        this.hasTown = false;
        this.color = color;
        this.hasUnit = false;
        this.scene = scene;

        this.selectedSquad = false;
        this.selectedArea = false;

        this.emissive = this.material.emissive.getHex();
    }

    colorize(color) {
        this.material.color.set(color);
    }

    highlight() {
        if (!this.selectedArea && !this.selectedSquad) {
            this.highlighted = true;
            this.material.emissive.set(HIGHLIGHTED_SIMPLE_EMISSION);
        }
    }

    unhighlight() {
        if (!this.selectedArea && !this.selectedSquad) {
            this.highlighted = false;
            this.material.emissive.set(STANDART_EMISSION);
        }
    }

    selectSquad() {
        this.selectedSquad = true;
        this.material.emissive.set(HIGHLIGHTED_SQUAD_EMISSION);
    }

    selectArea() {
        this.selectedArea = true;
        this.material.emissive.set(HIGHLIGHTED_AREA_EMISSION);
    }

    unselect() {
        this.selected = false;
        this.material.emissive.set(STANDART_EMISSION);
    }

    unselectSquad() {
        this.selectedSquad = false;
        this.material.emissive.set(STANDART_EMISSION);
    }

    unselectArea() {
        this.selectedArea = false;
        this.material.emissive.set(STANDART_EMISSION);
    }

    removeUnit() {
        this.hasUnit = false;
        this.scene.remove(this.unit.object);
        this.unit = null;
    }

    moveUnit(destinationHex) {
    }
}
