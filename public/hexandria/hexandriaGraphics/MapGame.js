;(function() {
    "use strict";

    const HexGame = window.HexGame;

    const _fieldGrass = 0x80f080;
    const _fieldWater = 0x8080ff;
    const _fieldRock = 0x808080;

    class MapGame {

        constructor(scene, sizeX, sizeY, game) {
            this.fieldGroup = new THREE.Group();
            this.fieldMap = {};

            this.scene = scene;
            this.sizeX = sizeX;
            this.sizeY = sizeY;
            this.fields = [...Array(sizeX).keys()].map(i => Array(sizeY));
            this._highlighted = null;
            this._selected = [];
            this.unitSelected = null;

            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
                    /*this.fields[i][j] = new HexGame(this.scene, _fieldGrass, i, j, 0.2);
                    // this.scene.add(this.fields[i][j]);
                    this.fieldGroup.add(this.fields[i][j]);*/

                    const newHex = new HexGame(this.scene, _fieldGrass, i, j, 0.2);
                    this.fields[i][j] = newHex;
                    this.fieldMap[newHex] = {
                        x:i,
                        y:j
                    };
                    this.fieldGroup.add(newHex);
                }
            }
            this.scene.add(this.fieldGroup);
        }

        find(obj) {
            /*for (let i = 0; i < this.sizeX; i++) {
                for (let j = 0; j < this.sizeY; j++) {
                    if (this.fields[i][j] === obj) {
                        return true;
                    }
                }
            }
            return false;*/
            return !!this.fieldMap[obj];
        }

        handleHighlight(intersects) {
            if (intersects.length > 0) {
                const obj = intersects[0].object;
                if (obj !== this._highlighted) { //  && obj != _selected
                    if (this._highlighted) {
                        if (this._selected.indexOf(this._highlighted) === -1) {
                            this._highlighted.unhighlight();
                        }
                        this._highlighted = null;
                    }
                    if (this.find(obj)) {
                        if (this._selected.indexOf(obj) === -1) {
                            obj.highlight();
                        }
                        this._highlighted = obj;
                        // console.log(obj.x, obj.y);
                    }
                }
            } else {
                if (this._highlighted) {
                    if (this._selected.indexOf(this._highlighted) === -1) {
                        this._highlighted.unhighlight();
                    }
                    this._highlighted = null;
                }
                this._highlighted = null;
            }
        }

        handleSelect(intersects) {
            console.log("handleSelect", intersects);
            if (intersects.length > 0) {
                const hex = intersects[0].object;

                console.log(hex, hex.x, hex.y);
                (new Mediator()).emit(
                    EVENTS.GRAPHICS.SELECT_FIELD,
                    {
                        x: hex.x,
                        y: hex.y
                    }
                );

                if (this._selected.indexOf(hex) === -1) {
                    // choose unit
                    if (hex.hasUnit) {
                        this.selectUnit(hex);
                    }
                } else if (hex.hasUnit) {
                    this.deselectUnit(hex);
                } else {
                    this.moveUnit(this.unitSelected, hex);
                }
            } else {
                // out of map
                if (this._selected.length > 0) {
                    this._selected.forEach(el => el.unselect());
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
            for (let i = hex.x - 1; (i <= hex.x + 1) && (i >= 0) && (i <= this.sizeX); i++) {
                this.fields[i][hex.y].select();
                this._selected.push(this.fields[i][hex.y]);
            }
            for (
                let i = hex.x - Math.floor(hex.y % 2);
                (i <= hex.x - Math.floor(hex.y % 2) + 1) && (i >= 0) && (i <= this.sizeX);
                i++
            ) {
                this.fields[i][hex.y + 1].select();
                this._selected.push(this.fields[i][hex.y + 1]);
                this.fields[i][hex.y - 1].select();
                this._selected.push(this.fields[i][hex.y - 1]);
            }
        }

        deselectUnit(hex) {
            this._selected.forEach(el => el.unselect());
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

    window.MapGame = MapGame;
})();
