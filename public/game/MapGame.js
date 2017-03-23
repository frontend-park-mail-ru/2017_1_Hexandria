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
        this._selected = [];
        this.unitSelected = null;

        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                this.fields[i][j] = new HexGame(this.scene, _fieldGrass, i, j, 0.2);
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
                if (this._highlighted) {
                    if(this._selected.indexOf(this._highlighted) == -1) {
                        this._highlighted.unhighlight();
                    }
                    this._highlighted = null;
                }
                if (this.find(obj)) {
                    if(this._selected.indexOf(obj) == -1) {
                        obj.highlight();
                    }
                    this._highlighted = obj;
                }
            }
        } else {
            if (this._highlighted) {
                if(this._selected.indexOf(this._highlighted) == -1) {
                    this._highlighted.unhighlight();
                }
                this._highlighted = null;
            }
            this._highlighted = null;
        }
    }

    handleSelect(intersects) {
        console.log(intersects);
        if (intersects.length > 1) {
            const hex = intersects[intersects.length - 2].object;
            if (this._selected.indexOf(hex) == -1) {
                // choose unit
                if(hex.hasUnit) {
                    this.selectUnit(hex);
                }
            } else {
                if(hex.hasUnit) {
                    this.deselectUnit(hex);
                } else {
                    this.moveUnit(this.unitSelected, hex);
                }
            }
        } else {
            console.log("out of map");
            if (this._selected.length > 0) {
                this._selected.forEach(el => el.unselect() );
                this._selected = [];
            }
        }
    }

    createCapital(owner, x, y) {
        this.fields[x][y].createCapital(owner);
    }

    createUnit(owner, x, y) {
        this.fields[x][y].createUnit(owner);
    }

    selectUnit(hex) {
        this.unitSelected = hex;
        for(let i = hex.x - 1; (i <= hex.x + 1) && (i >= 0) && (i <= this.sizeX); i++) {
            this.fields[i][hex.y].select();
            this._selected.push(this.fields[i][hex.y]);
        }
        for(
            let i = hex.x - Math.floor(hex.y % 2);
            (i <= hex.x - Math.floor(hex.y % 2) + 1) && (i >= 0) && (i <= this.sizeX);
            i++
        ) {
            this.fields[i][hex.y + 1].select();
            this._selected.push(this.fields[i][hex.y + 1]);
            this.fields[i][hex.y - 1].select();
            this._selected.push(this.fields[i][hex.y - 1]);
        }
        // for(let i = hex.x - 1; (i <= hex.x + 1) && (i < this.sizeX) && (i >= 0); i++) {
        //     for(let j = hex.y - 1; (j <= hex.y + 1) && (j < this.sizeY) && (j >= 0); j++ ){
        //         this.fields[i][j].select();
        //         this._selected.push(this.fields[i][j]);
        //     }
        // }
    }

    deselectUnit(hex) {
        this._selected.forEach(el => el.unselect() );
        this._selected = [];
        this._highlighted = hex;
        this.unitSelected = null;
        hex.highlight();
    }

    moveUnit(fromHex, toHex) {
        this.deselectUnit(fromHex);
        toHex.createUnit(fromHex.unit.owner);
        fromHex.removeUnit();
        fromHex.unhighlight();
        toHex.highlight();
    }
}