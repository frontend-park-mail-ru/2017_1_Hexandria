import * as THREE from 'three';
import UtilsGraphics from './utilsGraphics';

const positionZ = 0.5;
const spriteZ = 1.0;

export default class SquadGraphics {
    constructor(scene, color, squad) {
        // console.log("HexSquad", color, position);
        this.scene = scene;

        const geometry = new THREE.SphereGeometry(0.25, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color });
        this.squad = new THREE.Mesh(geometry, material);
        scene.add(this.squad);

        this.setSprite(squad);

        this.move(squad.position.x, squad.position.y);
    }

    move(x, y) {
        console.log('SquadGraphics', x, y);
        const pos = new THREE.Vector3(...UtilsGraphics.getPosition(x, y), positionZ);
        this.squad.position.copy(pos);

        this.sprite.position.set(pos.x, pos.y, spriteZ);
    }

    setSprite(squad) {
        const newSprite = UtilsGraphics.getSprite(` ${squad.count}/${squad.morale} `);
        newSprite.position.copy(this.squad.position);
        newSprite.position.z = spriteZ;

        this._removeSprite();

        this.sprite = newSprite;
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