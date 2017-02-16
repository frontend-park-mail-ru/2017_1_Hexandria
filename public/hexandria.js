'use strict';

const HexandriaLib = (function() {
    return {
        generateMesh: function(shape, color, x, y, z, rx, ry, rz, s) {
            let geometry = new THREE.ShapeBufferGeometry(shape);
            let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
            mesh.position.set(x, y, z);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            return mesh;
        },

        test: function() {
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

                _field[i][j] = getHexagon(_fieldGrass, posX, posY, 0.2);

                _scene.add(_field[i][j]);
            }
        }
        _field[0][0].material.color.set(_fieldWater);
    };

    this.setTestColor = function () {
        _field[0][0].material.color.set(_fieldWater);
        _field[1][0].material.color.set(_fieldRock);
    };

    this.handleHighlight = function (intersects) {
        if (intersects.length > 0) {
            let obj = intersects[0].object;
            if (obj != _highlighted) { //  && obj != _selected
                if (obj != _selected) {
                    if (_highlighted) {
                        _highlighted.material.emissive.setHex(_highlighted.currentHex);
                    }
                    if (_find(obj)) {
                        _highlighted = obj;
                        _highlighted.currentHex = _highlighted.material.emissive.getHex();
                        _highlighted.material.emissive.setHex(_highlightedColor);
                    }
                } else {
                    if (_highlighted) {
                        // _highlighted.material.emissive.setHex(0xf00000);
                        _highlighted.material.emissive.setHex(_highlighted.currentHex);
                        _highlighted = null;
                    }
                }
            }
        } else {
            if (_highlighted) {
                _highlighted.material.emissive.setHex(_highlighted.currentHex);
            }
            _highlighted = null;
        }
    }

    this.handleSelect = function (intersects) {
        if (intersects.length > 0) {
            let obj = intersects[0].object;
            if (obj != _selected) {
                if (obj == _highlighted) {
                    console.log("SELECT");
                    if (_selected) {
                        _selected.material.emissive.setHex(_highlighted.currentHex);
                    }

                    _selected = obj;
                    _selected.currentHex = _highlighted.currentHex;
                    _selected.material.emissive.setHex(_selectedColor);
                    _highlighted = null;

                } else {
                    console.log("error: selected but not highlighted");
                }

            } else {
                console.log("UNSELECT");
                _selected.material.emissive.setHex(_selected.currentHex);
                _selected = null;

                _highlighted = obj;
                _highlighted.currentHex = _highlighted.material.emissive.getHex();
                _highlighted.material.emissive.setHex(_highlightedColor);
            }
        } else {
            if (_selected) {
                _selected.material.emissive.setHex(_selected.currentHex);
            }
            _selected = null;
        }
    }

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
};
