import * as THREE from 'three';

const _hexagonDiameter = 1;
const _hexagonAlpha = _hexagonDiameter / 4.0;
const _hexagonBeta = Math.sqrt(3) * _hexagonAlpha;

export default class UtilsGraphics {
    static getPosition(x, y) {
        let posX = (2 * _hexagonBeta + 0.01) * x;
        const posY = (3 * _hexagonAlpha + 0.01) * y;
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
        return new THREE.ShapeBufferGeometry(UtilsGraphics.getHexShape());
    }

    static makeTextSprite(message, parameters) {
        if (parameters === undefined) parameters = {};

        const fontface = Object.prototype.hasOwnProperty.call(parameters, 'fontface') ?
            parameters.fontface : 'Arial';

        const fontsize = Object.prototype.hasOwnProperty.call(parameters, 'fontsize') ?
            parameters.fontsize : 18;

        const borderThickness = Object.prototype.hasOwnProperty.call(parameters, 'borderThickness') ?
            parameters.borderThickness : 2;

        const borderColor = Object.prototype.hasOwnProperty.call(parameters, 'borderColor') ?
            parameters.borderColor : { r: 0, g: 0, b: 0, a: 1.0 };

        const backgroundColor = Object.prototype.hasOwnProperty.call(parameters, 'backgroundColor') ?
            parameters.backgroundColor : { r: 255, g: 255, b: 255, a: 1.0 };

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontsize}px ${fontface}`;

        const metrics = context.measureText(message);
        const textWidth = metrics.width;

        context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${
             backgroundColor.b},${backgroundColor.a})`;
        context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${
             borderColor.b},${borderColor.a})`;
        context.lineWidth = borderThickness;
        UtilsGraphics.roundRect(context, borderThickness / 2, borderThickness / 2,
            textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);

        context.fillStyle = 'rgba(0, 0, 0, 1.0)';
        context.fillText(message, borderThickness, fontsize + borderThickness);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2.0, 1.0, 1.0);
        return sprite;
    }

    static roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    static getSprite(text) {
        return UtilsGraphics.makeTextSprite(
            text,
            {
                fontsize: 40,
                fontface: 'Helvetica',
                borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
            },
        );
    }
}
