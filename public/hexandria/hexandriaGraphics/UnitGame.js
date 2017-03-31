;(function() {
    "use strict";

    class UnitGame {
        constructor(owner) {
            this.owner = owner;

            const geometry = new THREE.SphereGeometry(0.3, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: owner.color });
            this.object = new THREE.Mesh(geometry, material);
        }
    }

    window.UnitGame = UnitGame;
})();
