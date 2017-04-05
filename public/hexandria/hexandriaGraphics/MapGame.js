;(function() {
    "use strict";

    const HexGame = window.HexGame;

    const _fieldGrass = 0x80f080;
    const _fieldWater = 0x8080ff;
    const _fieldRock = 0x808080;

    class MapGame {

        constructor(scene, game) {
            this.scene = scene;

            this.sizeX = game.field.size.x;
            this.sizeY = game.field.size.y;
            this.field = [...Array(this.sizeX).keys()].map(i => Array(this.sizeY));
            this.fieldMap = {};
            this.fieldGroup = new THREE.Group();

            this._highlighted = null;
            this._selected = [];
            this.unitSelected = null;

            for (let i = 0; i < this.sizeX; i++) {
                for (let j = 0; j < this.sizeY; j++) {
                    /*this.field[i][j] = new HexGame(this.scene, _fieldGrass, i, j, 0.2);
                    // this.scene.add(this.field[i][j]);
                    this.fieldGroup.add(this.field[i][j]);*/

                    const newHex = new HexGame(this.scene, _fieldGrass, i, j, 0.2);
                    this.field[i][j] = newHex;
                    this.fieldMap[newHex] = {
                        x: i,
                        y: j
                    };
                    this.fieldGroup.add(newHex);
                }
            }
            this.scene.add(this.fieldGroup);

            (new Mediator()).subscribe(this, EVENTS.GRAPHICS.HIGHLIGHT, "onhighlight");
        }

        find(obj) {
            /*for (let i = 0; i < this.sizeX; i++) {
                for (let j = 0; j < this.sizeY; j++) {
                    if (this.field[i][j] === obj) {
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

        onhighlight(position) {
            console.log("onhighlight", position);


            if(this.__h) {
                console.log("unh", this.__h);
                this.field[this.__h.x][this.__h.y].unhighlight__();
            }

            if(position) {
                this.__h = position;
                this.field[this.__h.x][this.__h.y].highlight__();
            }
        }

        handleSelect(intersects) {
            console.log("handleSelect", intersects);
            if (intersects.length > 0) {
                const hex = intersects[0].object;

                console.log(hex, hex.x, hex.y);
                (new Mediator()).emit(
                    EVENTS.LOGIC.SELECT,
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
                (new Mediator()).emit(EVENTS.LOGIC.SELECT);

                // out of map
                if (this._selected.length > 0) {
                    this._selected.forEach(el => el.unselect());
                    this._selected = [];
                }
            }
        }

        createCapital(owner, x, y) {
            this.field[x][y].createCapital(owner);
        }

        createUnit(owner, x, y) {
            this.field[x][y].createUnit(owner);
        }

        selectUnit(hex) {
            this.unitSelected = hex;
            for (let i = hex.x - 1; (i <= hex.x + 1) && (i >= 0) && (i <= this.sizeX); i++) {
                this.field[i][hex.y].select();
                this._selected.push(this.field[i][hex.y]);
            }
            for (
                let i = hex.x - Math.floor(hex.y % 2);
                (i <= hex.x - Math.floor(hex.y % 2) + 1) && (i >= 0) && (i <= this.sizeX);
                i++
            ) {
                this.field[i][hex.y + 1].select();
                this._selected.push(this.field[i][hex.y + 1]);
                this.field[i][hex.y - 1].select();
                this._selected.push(this.field[i][hex.y - 1]);
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
