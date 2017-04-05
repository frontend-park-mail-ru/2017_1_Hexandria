"use strict";

import * as THREE from "three";

const _hexagonDiameter = 1;
const _hexagonAlpha = _hexagonDiameter / 4.0;
const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;

export default class HexUtils {
    static getPosition(x, y) {
        let posX = (2 * _hexagonBeta + 0.01) * x;
        let posY = (3 * _hexagonAlpha + 0.01) * y;
        if (y % 2 === 0) {
            posX += _hexagonBeta + 0.01;
        }

        return [posX, posY];
    }

    static getHexShape() {
        const _hexagonShape = new THREE.Shape();
        _hexagonShape.moveTo(0.0, 2.0 * _hexagonAlpha);
        _hexagonShape.lineTo(_hexagonBeta, _hexagonAlpha);
        _hexagonShape.lineTo(_hexagonBeta, -_hexagonAlpha);
        _hexagonShape.lineTo(0.0, -2.0 * _hexagonAlpha);
        _hexagonShape.lineTo(-_hexagonBeta, -_hexagonAlpha);
        _hexagonShape.lineTo(-_hexagonBeta, _hexagonAlpha);
        _hexagonShape.lineTo(0.0, 2.0 * _hexagonAlpha);
        return _hexagonShape;
    }

    static getHexGeometry() {
        return new THREE.ShapeBufferGeometry(HexUtils.getHexShape());
    }
}
