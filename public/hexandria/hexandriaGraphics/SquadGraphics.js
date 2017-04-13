"use strict";

import * as THREE from "three";
import HexUtils from "./UtilsGraphics";

const positionZ = 0.5;
const z_sprite = 1.0;

export default class HexSquad {
    constructor(scene, color, position) {
        // console.log("HexSquad", color, position);

        const geometry = new THREE.SphereGeometry(0.25, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color });
        this.squad = new THREE.Mesh(geometry, material);
        scene.add(this.squad);

        this.sprite = HexUtils.getSprite(" squad ");
        scene.add(this.sprite);

        this.move(position.x, position.y);
    }

    move(x, y) {
        console.log(x, y);
        const pos = new THREE.Vector3(...HexUtils.getPosition(x, y), positionZ);
        this.squad.position.copy(pos);

        this.sprite.position.set(pos.x, pos.y, z_sprite);
    }
}
