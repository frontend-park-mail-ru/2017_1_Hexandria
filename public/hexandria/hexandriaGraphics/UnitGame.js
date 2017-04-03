
    "use strict";

    // const THREE = window.THREE;
    // import THREE from "three";
    import * as THREE from "three";

    export default class UnitGame {
        constructor(owner) {
            this.owner = owner;

            const geometry = new THREE.SphereGeometry(0.3, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: owner.color });
            this.object = new THREE.Mesh(geometry, material);
        }
    }
