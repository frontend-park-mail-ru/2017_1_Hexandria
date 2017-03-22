"use strict";

const _hexagonDiameter = 1;
const _hexagonAlpha = _hexagonDiameter / 4.0;
const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;
const _fieldGrass = 0x80f080;
const _fieldWater = 0x8080ff;
const _fieldRock = 0x808080;

class MapGame {

    constructor(scene, sizeX, sizeY) {
        this.scene = scene;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.fields = [...Array(sizeX).keys()].map(i => Array(sizeY));
        this._highlighted = null;
        this._selected = null;

        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                console.log("BEFORE=============");
                this.fields[i][j] = new HexGame(this.scene, _fieldGrass, 0.2, i, j);
                console.log(this.fields[i][j]);
                this.scene.add(this.fields[i][j]);
            }
        }
    }

    find(obj) {
        for (let i = 0; i < this.sizeX; i++) {
            for (let j = 0; j < this.sizeY; j++) {
                if (this.fields[i][j] === obj) {
                    return true;
                }
            }
        }
        return false;
    }

    handleHighlight(intersects) {
        if (intersects.length > 1) {
            const obj = intersects[intersects.length - 2].object;
            if (obj !== this._highlighted) { //  && obj != _selected
                if (obj !== this._selected) {
                    if (this._highlighted) {
                        this._highlighted.unhighlight();
                        this._highlighted = null;
                    }
                    if (this.find(obj)) {
                        obj.highlight();
                        this._highlighted = obj;
                    }
                } else if (this._highlighted) {
                    this._highlighted.unhighlight();
                    this._highlighted = null;
                }
            }
        } else {
            if (this._highlighted) {
                this._highlighted.unhighlight();
                this._highlighted = null;
            }
            this._highlighted = null;
        }
    }

    handleSelect(intersects) {
        console.log(intersects);
        if (intersects.length > 1) {
            const obj = intersects[intersects.length - 2].object;
            if (obj !== this._selected) {
                if (obj === this._highlighted) {
                    console.log("SELECT");
                    if (this._selected) {
                        this._selected.unselect();
                        this._highlighted = this._selected;
                        this._selected = null;
                    }

                    obj.select();
                    this._selected = obj;
                    if (obj.hasUnit()) {
                        obj.removeUnit();
                    } else {
                        obj.createUnit();
                    }
                } else {
                    // out of map
                    console.log("error: selected but not highlighted");
                }
            } else {
                // if second click on the selected
                console.log("UNSELECT");
                this._selected.removeUnit();
                this._selected.unselect();
                this._highlighted = this._selected;
                this._selected = null;

                obj.highlight();
            }
        } else {
            if (this._selected) {
                this._selected.removeUnit();
                this._selected.unselect();
                this._highlighted = this._selected;
                this._selected = null;
            }
            this._selected = null;
        }
    }
}