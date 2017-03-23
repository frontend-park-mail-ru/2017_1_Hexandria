"use strict";

class UnitGame {
    constructor(owner) {
        this.owner = owner;

        let geometry = new THREE.SphereGeometry(0.3, 32, 32);
        let material = new THREE.MeshBasicMaterial({ color: owner.color });
        this.object = new THREE.Mesh(geometry, material);
    }
}