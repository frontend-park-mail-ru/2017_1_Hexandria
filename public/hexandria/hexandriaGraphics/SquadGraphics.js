"use strict";

import * as THREE from "three";
import HexUtils from "./UtilsGraphics";

const positionZ = 0.5;
const spriteZ = 1.0;

export default class HexSquad {
    constructor(scene, color, squad) {
        // console.log("HexSquad", color, position);
        this.scene = scene;

        const geometry = new THREE.SphereGeometry(0.25, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color });
        this.squad = new THREE.Mesh(geometry, material);
        scene.add(this.squad);

        this.setSprite(squad);

        this.move(squad.position.x, squad.position.y);
    }

    move(x, y) {
        console.log(x, y);
        const pos = new THREE.Vector3(...HexUtils.getPosition(x, y), positionZ);
        this.squad.position.copy(pos);

        this.sprite.position.set(pos.x, pos.y, spriteZ);
    }

    setSprite(squad) {
        if (this.sprite) {
            this.scene.remove(this.sprite);
        }

        this.sprite = HexUtils.getSprite(` ${squad.count}/${squad.morale} `);
        this.scene.add(this.sprite);
    }
}
