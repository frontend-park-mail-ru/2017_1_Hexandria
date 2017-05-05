import * as THREE from 'three';
import UtilsGraphics from './utilsGraphics';

const positionZ = 0.25 + 0.5;

export default class TownGraphics {
    constructor(scene, color, town) {
        const geometry = new THREE.BoxGeometry(0.25, 0.25, 1.0);
        const material = new THREE.MeshBasicMaterial({ color });
        this.town = new THREE.Mesh(geometry, material);
        this.town.name = town.name;

        scene.add(this.town);

        this.move(town.position.x, town.position.y);
    }

    move(x, y) {
        const pos = new THREE.Vector3(...UtilsGraphics.getPosition(x, y), positionZ);
        this.town.position.copy(pos);
    }

    changeColor(color) {
        this.town.material.color.setHex(color);
    }
}
