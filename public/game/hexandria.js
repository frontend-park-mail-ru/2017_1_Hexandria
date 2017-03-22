"use strict";

const Hexandria = function (scene) {

	this.setMap = function (sizeX, sizeY) {
		_fieldX = sizeX;
		_fieldY = sizeY;
		console.log(`setMap: ${_fieldX} ${_fieldY}`);

		for (let i = 0; i < sizeX; i++) {
			_field[i] = [];
			for (let j = 0; j < sizeY; j++) {
				_field[i][j] = new HexGame(_scene, _fieldGrass, 0.2, i, j);
				_scene.add(_field[i][j]);
			}
		}
	};

	this.handleHighlight = function (intersects) {
		if (intersects.length > 1) {
			const obj = intersects[intersects.length - 2].object;
			if (obj !== _highlighted) { //  && obj != _selected
				if (obj !== _selected) {
					if (_highlighted) {
						_highlighted.unhighlight();
                        _highlighted = null;
                        // this.unhighlightHex(_highlighted);
					}
					if (_find(obj)) {
						obj.highlight();
                        _highlighted = obj;
                        // this.highlightHex(obj);
					}
				} else if (_highlighted) {
                        // _highlighted.material.emissive.setHex(0xf00000);
					_highlighted.unhighlight();
                    _highlighted = null;
                        // this.unhighlightHex(_highlighted);
				}
			}
		} else {
			if (_highlighted) {
				_highlighted.unhighlight();
                _highlighted = null;
                // this.unhighlightHex(_highlighted);
			}
			_highlighted = null;
		}
	};

	this.handleSelect = function (intersects) {
		console.log(intersects);
		if (intersects.length > 1) {
			const obj = intersects[intersects.length - 2].object;
			if (obj !== _selected) {
				if (obj === _highlighted) {
					console.log("SELECT");
					if (_selected) {
                        // _selected.removeUnit();
						_selected.unselect();
                        _highlighted = _selected;
                        _selected = null;
					}

					obj.select();
                    _selected = obj;
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
				_selected.removeUnit();
				_selected.unselect();
                _highlighted = _selected;
                _selected = null;

				obj.highlight();
			}
		} else {
			if (_selected) {
				_selected.removeUnit();
				_selected.unselect();
                _highlighted = _selected;
                _selected = null;
			}
			_selected = null;
		}
	};


    // internals
	const _self = this;
	let _scene = scene;

	const _fieldGrass = 0x80f080;
	const _fieldWater = 0x8080ff;
	const _fieldRock = 0x808080;
	let _field = [];
	let _fieldX;
	let _fieldY;

	let _highlighted = null;
	let _selected = null;


	const _hexagonDiameter = 1;
	const _hexagonAlpha = _hexagonDiameter / 4.0;
	const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;
	const _hexagonShape = new THREE.Shape();
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
				if (_field[i][j] === obj) {
					return true;
				}
			}
		}
		return false;
	}
};
