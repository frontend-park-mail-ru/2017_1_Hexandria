;(function() {
    "use strict";

    const THREE = window.THREE;
    const HexUtils = window.HexUtils;

    const positionZ = 0.5;

    class HexSquad {
        constructor(scene, color, position) {
            // console.log("HexSquad", color, position);

            const geometry = new THREE.SphereGeometry(0.25, 16, 16);
            const material = new THREE.MeshBasicMaterial({ color: color });
            this.squad = new THREE.Mesh(geometry, material);

            scene.add(this.squad);

            this.move(position.x, position.y);
        }

        move(x, y) {
            console.log(x,y);
            const pos = new THREE.Vector3(...HexUtils.getPosition(x, y), positionZ);
            this.squad.position.copy(pos);
        }
    }

    window.HexSquad = HexSquad;
})();
