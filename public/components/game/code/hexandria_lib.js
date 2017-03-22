"use strict";

const HexandriaLib = (function () {
    return {
        generateMesh (shape, color, x, y, z, rx, ry, rz, s) {
            const geometry = new THREE.ShapeBufferGeometry(shape);
            // let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
            const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide }));
            mesh.position.set(x, y, z);
            mesh.rotation.set(rx, ry, rz);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            return mesh;
        },

        test () {
            return "test";
        },
    };
})();
