
"use strict";

import * as THREE from 'three';
import HexUtils from "./hexUtils";


const positionZ = 0.25 + 0.5;

export default class HexTown {
    constructor(scene, color, position) {
        const geometry = new THREE.BoxGeometry(0.25, 0.25, 1.0);
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.town = new THREE.Mesh(geometry, material);

        scene.add(this.town);

        this.move(position.x, position.y);
    }

    move(x, y) {
        const pos = new THREE.Vector3(...HexUtils.getPosition(x, y), positionZ);
        this.town.position.copy(pos);
    }
}
