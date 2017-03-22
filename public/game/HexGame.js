"use strict";

const _highlightedColor = 0xf08080;
const _selectedColor = 0x80f080;

class HexGame extends THREE.Mesh {

    constructor(scene, color, z, i, j) {
        const _hexagonDiameter = 1;
        const _hexagonAlpha = _hexagonDiameter / 4.0;
        const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;
        const _hexagonShape = new THREE.Shape();
        let x = (2 * _hexagonBeta + 0.01) * i;
        let y = (3 * _hexagonAlpha + 0.01) * j;
        if(j % 2 === 0) {
            x += _hexagonBeta + 0.01;
        }
        _hexagonShape.moveTo(0.0, 2.0 * _hexagonAlpha);
        _hexagonShape.lineTo(_hexagonBeta, _hexagonAlpha);
        _hexagonShape.lineTo(_hexagonBeta, -_hexagonAlpha);
        _hexagonShape.lineTo(0.0, -2.0 * _hexagonAlpha);
        _hexagonShape.lineTo(-_hexagonBeta, -_hexagonAlpha);
        _hexagonShape.lineTo(-_hexagonBeta, _hexagonAlpha);
        _hexagonShape.lineTo(0.0, 2.0 * _hexagonAlpha);

        const geometry = new THREE.ShapeBufferGeometry(_hexagonShape);
        super(geometry, new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide }));
        this.position.set(x, y, z);
        this.rotation.set(0, 0, 0);
        this.scale.set(1, 1, 1);

        this.x = i;
        this.y = j;
        this.highlighted = false;
        this.selected = false;
        this.unit = null;
        this.scene = scene;
    }

    colorize(color) {
        const _fieldGrass = 0x80f080;
        const _fieldWater = 0x8080ff;
        const _fieldRock = 0x808080;
        this.material.color.set(color);
    }

    highlight() {
        this.highlighted = true;
        this.currentHex = this.material.emissive.getHex();
        this.material.emissive.setHex(_highlightedColor);
    }

    unhighlight() {
        this.highlighted = false;
        this.material.emissive.setHex(this.currentHex);
    }

    select() {
        this.selected = true;
        // this.currentHex = _highlighted.currentHex;
        this.material.emissive.setHex(_selectedColor);
    }

    unselect() {
        this.selected = false;
        // this.material.emissive.setHex(_selected.currentHex);
    }

    createUnit() {
        const geometry = new THREE.SphereGeometry(0.3, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.unit = new THREE.Mesh(geometry, material);
        this.unit.position.copy(this.position);
        this.scene.add(this.unit);
    }

    removeUnit() {
        this.scene.remove(this.unit);
        this.unit = null;
    }

    hasUnit() {
        return !!this.unit;
    }

    moveUnit(destinationHex) {

    }
}