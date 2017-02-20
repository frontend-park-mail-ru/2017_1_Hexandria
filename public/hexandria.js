'use strict';

const HexandriaLib = (function () {
    return {
        generateMesh: function (shape, color, x, y, z, rx, ry, rz, s) {
            let geometry = new THREE.ShapeBufferGeometry(shape);
            // let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
            let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
            mesh.position.set(x, y, z);
            mesh.rotation.set(rx, ry, rz);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            return mesh;
        },

        test: function () {
            return 'test';
        }
    };
})();


const Hexandria = function (scene) {
    // public
    this.testVariable = 0;

    this.testFunction = function () {
        console.log('testFunction');
    };

    this.setMap = function (sizeX, sizeY) {
        _fieldX = sizeX;
        _fieldY = sizeY;
        console.log("setMap: " + _fieldX + " " + _fieldY);

        let posX;
        let posY;
        for (let i = 0; i < _fieldX; i++) {
            _field[i] = [];
            for (let j = 0; j < _fieldY; j++) {
                posX = (2 * _hexagonBeta + 0.01) * i;
                posY = (3 * _hexagonAlpha + 0.01) * j;
                if (j % 2 == 0) {
                    posX += _hexagonBeta + 0.01;
                }

                _field[i][j] = new Hex(_fieldGrass, posX, posY, 0.2, i, j);

                _scene.add(_field[i][j]);
            }
        }
        _field[0][0].colorize(_fieldWater);
    };

    this.setRandomColor = function () {
        _field[0][0].colorize(_fieldWater);
        _field[1][0].colorize(_fieldRock);
    };

    this.handleHighlight = function (intersects) {
        if (intersects.length > 1) {
            let obj = intersects[intersects.length - 2].object;
            if (obj != _highlighted) { //  && obj != _selected
                if (obj != _selected) {
                    if (_highlighted) {
                        _highlighted.unhighlight();
                        // this.unhighlightHex(_highlighted);
                    }
                    if (_find(obj)) {
                        obj.highlight();
                        // this.highlightHex(obj);
                    }
                } else {
                    if (_highlighted) {
                        // _highlighted.material.emissive.setHex(0xf00000);
                        _highlighted.unhighlight();
                        // this.unhighlightHex(_highlighted);
                    }
                }
            }
        } else {
            if (_highlighted) {
                _highlighted.unhighlight();
                // this.unhighlightHex(_highlighted);
            }
            _highlighted = null;
        }
    };

    this.handleSelect = function (intersects) {
        console.log(intersects);
        if (intersects.length > 1) {
            let obj = intersects[intersects.length - 2].object;
            if (obj != _selected) {
                if (obj == _highlighted) {
                    console.log("SELECT");
                    if (_selected) {
                        // _selected.removeUnit();
                        _selected.unselect();
                    }

                    obj.select();
                    if(obj.hasUnit()) {
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
                _selected.removeUnit();
                _selected.unselect();

                obj.highlight();
            }
        } else {
            if (_selected) {
                _selected.removeUnit();
                _selected.unselect();
            }
            _selected = null;
        }
    };


    // internals
    let _self = this;
    let _scene = scene;

    const _fieldGrass = 0x80f080;
    const _fieldWater = 0x8080ff;
    const _fieldRock = 0x808080;
    let _field = [];
    let _fieldX;
    let _fieldY;

    let _highlightedColor = 0xf08080;
    let _selectedColor = 0x80f080;
    let _highlighted = null;
    let _selected = null;


    const _hexagonDiameter = 1;
    const _hexagonAlpha = _hexagonDiameter / 4.0;
    const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;
    let _hexagonShape = new THREE.Shape();
    _hexagonShape.moveTo(0.0, 2.0 * _hexagonAlpha);
    _hexagonShape.lineTo(_hexagonBeta, _hexagonAlpha);
    _hexagonShape.lineTo(_hexagonBeta, -_hexagonAlpha);
    _hexagonShape.lineTo(0.0, -2.0 * _hexagonAlpha);
    _hexagonShape.lineTo(-_hexagonBeta, -_hexagonAlpha);
    _hexagonShape.lineTo(-_hexagonBeta, _hexagonAlpha);
    _hexagonShape.lineTo(0.0, 2.0 * _hexagonAlpha);

    function getHexagon(color, x, y, z) {
        return HexandriaLib.generateMesh(_hexagonShape, color, x, y, z, 0, 0, 0, 1);
    }

    function _find(obj) {
        for (let i = 0; i < _fieldX; i++) {
            for (let j = 0; j < _fieldY; j++) {
                if (_field[i][j] == obj) {
                    return true;
                }
            }
        }
        return false;
    }

    class Hex extends THREE.Mesh {

        constructor(color, x, y, z, i, j) {
            const _hexagonDiameter = 1;
            const _hexagonAlpha = _hexagonDiameter / 4.0;
            const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;
            let _hexagonShape = new THREE.Shape();
            _hexagonShape.moveTo(0.0, 2.0 * _hexagonAlpha);
            _hexagonShape.lineTo(_hexagonBeta, _hexagonAlpha);
            _hexagonShape.lineTo(_hexagonBeta, -_hexagonAlpha);
            _hexagonShape.lineTo(0.0, -2.0 * _hexagonAlpha);
            _hexagonShape.lineTo(-_hexagonBeta, -_hexagonAlpha);
            _hexagonShape.lineTo(-_hexagonBeta, _hexagonAlpha);
            _hexagonShape.lineTo(0.0, 2.0 * _hexagonAlpha);

            let geometry = new THREE.ShapeBufferGeometry(_hexagonShape);
            // let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
            super(geometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
            this.position.set(x, y, z);
            this.rotation.set(0, 0, 0);
            this.scale.set(1, 1, 1);

            this.x = i;
            this.y = j;
            this.highlighted = false;
            this.selected = false;
            this.unit = null;
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
            _highlighted = this;
            // for i in [this.x - 3, this.x + 3] {
            //     for j in [this.y - 3, this.y + 3] {
            //         scene[i][j].highlight();
            //     }
            // }
        }

        unhighlight() {
            this.highlighted = false;
            this.material.emissive.setHex(this.currentHex);
            _highlighted = null;
        }

        select() {
            this.selected = true;
            _selected = this;
            this.currentHex = _highlighted.currentHex;
            this.material.emissive.setHex(_selectedColor);
            _highlighted = null;
        }

        unselect() {
            this.selected = false;
            this.material.emissive.setHex(_selected.currentHex);
            _selected = null;
        }

        createUnit() {
            var geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            this.unit = new THREE.Mesh( geometry, material );
            this.unit.position.copy(this.position);
            scene.add( this.unit );
        }

        removeUnit() {
            scene.remove(this.unit);
            this.unit = null;
        }

        hasUnit() {
            return !!this.unit;
        }

        moveUnit(destinationHex) {

        }
    }
};





