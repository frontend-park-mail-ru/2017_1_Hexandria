"use strict";

class TownGame {
    constructor(owner) {
        this.owner = owner;

        let geometry = new THREE.BoxGeometry(0.3, 0.3, 2);
        let material = new THREE.MeshBasicMaterial({ color: owner.color });
        this.object = new THREE.Mesh(geometry, material);
    }
}