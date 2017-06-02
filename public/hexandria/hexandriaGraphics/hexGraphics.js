import * as THREE from 'three';
import UtilsGraphics from './utilsGraphics';

const _highlightedColor = 0xf08080;
const _selectedSquadColor = 0xff0000;
const _selectedAreaColor = 0xffff00;

export default class HexGraphics extends THREE.Mesh {
    constructor(color, x, y, z) {
        const geometry = UtilsGraphics.getHexGeometry();

        super(geometry, new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide }));
        this.position.set(...UtilsGraphics.getPosition(x, y), z);
        this.rotation.set(0, 0, 0);
        this.scale.set(1, 1, 1);

        this.name = 'hex';

        this.x = x;
        this.y = y;
        this.highlighted = false;
        this.selected = false;

        this.selectedSquad = false;
        this.selectedArea = false;

        this.emissive = this.material.emissive.getHex();
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
