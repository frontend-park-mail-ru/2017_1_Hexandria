"use strict";

const _hexagonDiameter = 1;
const _hexagonAlpha = _hexagonDiameter / 4.0;
const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;

class MapGame {

    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.fields = [[]];

        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                this.fields[i][j] = new HexGame(_fieldGrass, posX, posY, 0.2, i, j);
                _scene.add(_field[i][j]);
            }
        }
    }
}