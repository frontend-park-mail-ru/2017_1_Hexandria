
    "use strict";

    // const THREE = window.THREE;
    // const UnitGame = window.UnitGame;
    // const CapitalGame = window.CapitalGame;
    //
    // const HexUtils = window.HexUtils;
	// import THREELib from "three-js";
	// var THREE = THREELib();
    import * as THREE from 'three';
	import CapitalGame from "./CapitalGame";
	import UnitGame from "./UnitGame";
	import HexUtils from "./hexUtils";

	const _highlightedColor = 0xf08080;
    const _selectedColor = 0x80f000;

    export default class HexGame extends THREE.Mesh {

        constructor(scene, color, x, y, z) {
            // const geometry = new THREE.ShapeBufferGeometry(HexUtils.getHexShape());
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
        }

        colorize(color) {
            const _fieldGrass = 0x80f080;
            const _fieldWater = 0x8080ff;
            const _fieldRock = 0x808080;
            this.material.color.set(color);
        }

        highlight() {
            this.highlighted = true;
            this.currentHex = this.material.emissive.getHex();
            this.material.emissive.setHex(_highlightedColor);
        }

        unhighlight() {
            this.highlighted = false;
            this.material.emissive.setHex(this.currentHex);
        }

        select() {
            console.log("SELECT");
            this.selected = true;
            this.material.emissive.setHex(_selectedColor);
        }

        unselect() {
            console.log("UNSELECT");
            this.selected = false;
            this.material.emissive.setHex(this.currentHex);
        }

        createUnit(owner) {
            this.hasUnit = true;
            this.unit = new UnitGame(owner);
            this.unit.object.position.copy(this.position);
            this.scene.add(this.unit.object);
        }

        createCapital(owner) {
            this.hasCapital = true;
            this.capital = new CapitalGame(owner);
            this.capital.object.position.copy(this.position);
            this.scene.add(this.capital.object);
        }

        removeUnit() {
            this.hasUnit = false;
            this.scene.remove(this.unit.object);
            this.unit = null;
        }

        moveUnit(destinationHex) {

        }
    }
