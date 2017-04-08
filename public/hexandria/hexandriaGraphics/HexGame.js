"use strict";

import * as THREE from "three";
import HexUtils from "./hexUtils";

const _highlightedColor = 0xf08080;
const _selectedSquadColor = 0xff0000;
const _selectedAreaColor = 0xffff00;
const _grassColor = 0x80f080;

export default class HexGame extends THREE.Mesh {

    constructor(scene, color, x, y, z) {
        const geometry = HexUtils.getHexGeometry();

        super(geometry, new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide }));
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
        const _fieldGrass = 0x80f080;
        const _fieldWater = 0x8080ff;
        const _fieldRock = 0x808080;
        this.material.color.set(color);
    }

    highlight() {
        if (!this.selectedArea && !this.selectedSquad) {
            this.highlighted = true;
            this.material.emissive.setHex(_highlightedColor);
        }
    }

    unhighlight() {
        if (!this.selectedArea && !this.selectedSquad) {
            this.highlighted = false;
            this.material.emissive.setHex(null);
        }
    }

    selectSquad() {
        console.log("SELECT");
        this.selectedSquad = true;
        this.material.emissive.setHex(_selectedSquadColor);
    }

    selectArea() {
        console.log("SELECT");
        this.selectedArea = true;
        this.material.emissive.setHex(_selectedAreaColor);
    }

    unselect() {
        console.log("UNSELECT");
        this.selected = false;
        this.material.emissive.setHex(this.currentHex);
    }

    unselectSquad() {
        console.log(this.material.emissive);
        this.selectedSquad = false;
        this.material.emissive.setHex(null);
    }

    unselectArea() {
        this.selectedArea = false;
        this.material.emissive.setHex(null);
    }

    removeUnit() {
        this.hasUnit = false;
        this.scene.remove(this.unit.object);
        this.unit = null;
    }

    moveUnit(destinationHex) {
    }
}
