
    "use strict";

    // const THREE = window.THREE;
    // import THREE from "three";
    import * as THREE from "three";


    export default class TownGame {
        constructor(owner) {
            this.owner = owner;

            const geometry = new THREE.BoxGeometry(0.3, 0.3, 2);
            const material = new THREE.MeshBasicMaterial({ color: owner.color });
            this.object = new THREE.Mesh(geometry, material);
        }
    }