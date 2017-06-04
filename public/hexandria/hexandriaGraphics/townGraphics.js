import * as THREE from 'three';
import UtilsGraphics from './utilsGraphics';

require('three-obj-loader')(THREE);

export default class TownGraphics {
    constructor(scene, color, town, isCapital) {
        this.positionZ = 0.25 + 0.15;
        this.options = {
            color,
        };


        if (isCapital) {
            this.town = UtilsGraphics.loadObj('/models/capital.obj', this.options);
            this.town.scale.set(0.5, 0.5, 0.5);
            this.town.rotateX(Math.PI / 2.0);
        } else {
            this.town = UtilsGraphics.loadObj('/models/tower.obj', this.options);
            this.town.scale.set(0.0015, 0.0015, 0.0015);
            this.positionZ = this.positionZ - 0.2;
            this.town.rotateX(Math.PI / 2.0);
        }
        this.move(town.position.x, town.position.y);
        scene.add(this.town);
    }

    move(x, y) {
        const pos = new THREE.Vector3(...UtilsGraphics.getPositionForTown(x, y), this.positionZ);
        this.town.position.copy(pos);
    }

    changeColor(color) {
        this.options.color = color;
        if (this.town.__loaded) {
            UtilsGraphics.changeColor(this.town, this.options.color);
        }
    }
}
