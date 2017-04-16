import * as THREE from 'three';
import HexGraphics from './hexGraphics';
import Mediator from '../../modules/mediator';
import { EVENTS } from '../events';

const _fieldGrass = 0x80f080;
const _fieldWater = 0x8080ff;
const _fieldRock = 0x808080;

export default class MapGraphics {

    constructor(scene, game) {
        this.scene = scene;

        this.sizeX = game.field.size.x;
        this.sizeY = game.field.size.y;
        this.field = [...Array(this.sizeX).keys()].map(() => Array(this.sizeY));
        this.fieldMap = {};
        this.fieldGroup = new THREE.Group();

        this._highlighted = null;
        this._selected = [];
        this.unitSelected = null;

        this._selectedSquad = null;
        this._selectedArea = [];

        for (let i = 0; i < this.sizeX; i++) {
            for (let j = 0; j < this.sizeY; j++) {
                const newHex = new HexGraphics(this.scene, _fieldGrass, i, j, 0.2);
                this.field[i][j] = newHex;
                this.fieldMap[newHex] = {
                    x: i,
                    y: j,
                };
                this.fieldGroup.add(newHex);
            }
        }
        this.scene.add(this.fieldGroup);

        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.SELECT_UNIT, 'onSelectSquad');
        (new Mediator()).subscribe(this, EVENTS.GRAPHICS.UNSELECT_ALL, 'onUnselectAll');
    }

    find(obj) {
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

    onSelectSquad(squadPosition) {
        const areaPositions = this.selectSquadArea(squadPosition);

        // unhighlight selected squad & area
        this.onUnselectAll();

        this._selectedSquad = squadPosition;
        this.field[squadPosition.x][squadPosition.y].selectSquad();

        this._selectedArea = [];
        areaPositions.forEach((position) => {
            this._selectedArea.push(position);
            this.field[position.x][position.y].selectArea();
        });
    }

    onUnselectAll() {
        if (this._selectedSquad) {
            this.field[this._selectedSquad.x][this._selectedSquad.y].unselectSquad();
            this.selectSquadArea(this._selectedSquad).forEach((position) => {
                // console.log(position);
                this.field[position.x][position.y].unselectArea();
                // console.log(this.field[position.x][position.y]);
            });
        }
    }

    selectSquadArea(position) {
        let result = [];
        result.push({ x: position.x - 1, y: position.y });
        result.push({ x: position.x + 1, y: position.y });
        if (position.y % 2 === 1) {
            result.push({ x: position.x - 1, y: position.y - 1 });
            result.push({ x: position.x, y: position.y - 1 });
            result.push({ x: position.x - 1, y: position.y + 1 });
            result.push({ x: position.x, y: position.y + 1 });
        } else {
            result.push({ x: position.x + 1, y: position.y - 1 });
            result.push({ x: position.x, y: position.y - 1 });
            result.push({ x: position.x + 1, y: position.y + 1 });
            result.push({ x: position.x, y: position.y + 1 });
        }
        result = result.filter(element => element.x >= 0 && element.x < this.sizeX && element.y >= 0 && element.y < this.sizeY);
        return result;
    }

    handleSelect(intersects) {
        console.log('handleSelect', intersects);
        if (intersects.length > 0) {
            const hex = intersects[0].object;

            console.log(hex, hex.x, hex.y);
            (new Mediator()).emit(
                EVENTS.LOGIC.SELECT,
                {
                    x: hex.x,
                    y: hex.y,
                },
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
            this.field[i][hex.y].selectArea();
            this._selected.push(this.field[i][hex.y]);
        }
        for (
            let i = hex.x - Math.floor(hex.y % 2);
            (i <= hex.x - Math.floor(hex.y % 2) + 1) && (i >= 0) && (i <= this.sizeX);
            i++
        ) {
            /* this.field[i][hex.y + 1].select();
             this._selected.push(this.field[i][hex.y + 1]);
             this.field[i][hex.y - 1].select();*/

            this.field[i][hex.y + 1].selectArea();
            this._selected.push(this.field[i][hex.y + 1]);
            this.field[i][hex.y - 1].selectArea();
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
