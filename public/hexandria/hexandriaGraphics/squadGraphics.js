import * as THREE from 'three';
import UtilsGraphics from './utilsGraphics';

const positionZ = 0.2;
const spriteZ = 1.4;

export default class SquadGraphics {
    constructor(scene, color, squad, hasTown) {
        this.scene = scene;

        this.options = {
            color,
        };
        this.squad = UtilsGraphics.loadObj('/models/knight.obj', this.options);
        this.squad.scale.set(0.4, 0.4, 0.4);
        this.squad.rotateX(Math.PI / 2.0);
        this.squad.rotateY(Math.PI / 2.0);

        this.setSprite(squad.count, squad.morale);

        this.move(squad.position, hasTown);
        scene.add(this.squad);
    }

    move(coordinates, hasTown) {
        let pos;
        if (hasTown) {
            pos = new THREE.Vector3(...UtilsGraphics.getPositionForSquad(coordinates.x, coordinates.y), positionZ);
        } else {
            pos = new THREE.Vector3(...UtilsGraphics.getPosition(coordinates.x, coordinates.y), positionZ);
        }
        this.squad.position.copy(pos);

        this.sprite.position.set(pos.x, pos.y, spriteZ);
    }

    setSprite(count, morale) {
        const newSprite = UtilsGraphics.getSprite(` ${count} `);
        newSprite.position.copy(this.squad.position);
        newSprite.position.z = spriteZ;

        this._removeSprite();

        this.sprite = newSprite;
        this.sprite.name = 'squad sprite';
        this.scene.add(this.sprite);
    }

    remove() {
        this._removeSprite();
        this._removeSquad();
    }

    _removeSquad() {
        if (this.squad) {
            this.scene.remove(this.squad);
        }
    }

    _removeSprite() {
        if (this.sprite) {
            this.scene.remove(this.sprite);
        }
    }
}
