import * as THREE from 'three';
import UtilsGraphics from './utilsGraphics';

const _highlightedColor = 0xf08080;
const _selectedSquadColor = 0xff0000;
const _selectedAreaColor = 0xffff00;
const _grassColor = 0x80f080;

export default class HexGraphics extends THREE.Mesh {
    constructor(color, x, y, z) {
        const geometry = UtilsGraphics.getHexGeometry();

        const texture = new THREE.TextureLoader().load('textures/grass.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        super(geometry, new THREE.MeshPhongMaterial({
            color,
            side: THREE.DoubleSide,
            map: texture,
        }));
        this.position.set(...UtilsGraphics.getPosition(x, y), z);
        this.rotation.set(0, 0, 0);
        this.scale.set(1, 1, 1);

        this.name = 'hex';

        this.x = x;
        this.y = y;
        this.highlighted = false;
        this.selected = false;
        this.hasCapital = false;
        this.hasTown = false;
        this.color = color;
        this.hasUnit = false;

        this.selectedSquad = false;
        this.selectedArea = false;

        this.emissive = this.material.emissive.getHex();
    }

    colorize(color) {
        const _fieldGrass = 0x80f080;
        const _fieldWater = 0x8080ff;
        const _fieldRock = 0x808080;
        this.material.color.set(color);
    }

    highlight() {
        if (!this.selectedArea && !this.selectedSquad) {
            this.highlighted = true;
            this.material.emissive.setHex(_highlightedColor);
        }
    }

    unhighlight() {
        if (!this.selectedArea && !this.selectedSquad) {
            this.highlighted = false;
            this.material.emissive.setHex(null);
        }
    }

    selectSquad() {
        console.log('selectSquad');
        this.selectedSquad = true;
        this.material.emissive.setHex(_selectedSquadColor);
    }

    unselectSquad() {
        console.log('unselectSquad', this.material.emissive);
        this.selectedSquad = false;
        this.material.emissive.setHex(null);
    }

    selectArea() {
        console.log('selectArea');
        this.selectedArea = true;
        this.material.emissive.setHex(_selectedAreaColor);
    }

    unselectArea() {
        console.log('unselectArea');
        this.selectedArea = false;
        this.material.emissive.setHex(null);
    }
}
