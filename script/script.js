/// <reference path="../dist/paper.d.ts"/>
/// <reference path="../dist/paper.d.ts"/>
var Render = (function () {
    function Render(stageContainer) {
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        stageContainer.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        paper.install(window);
        paper.setup(this._canvas);
    }
    Render.prototype.calcCoord = function (coord) {
        var result = coord;
        return result;
    };
    return Render;
})();
/// <reference path="../dist/paper.d.ts"/>
var RenderApi = (function () {
    function RenderApi() {
    }
    RenderApi.drawOuterWall = function (coordDraw) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawInnerWall = function (coordDraw) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawColumn = function (coordDraw) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawPartition = function (coordDraw) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawWindow = function (coordDraw) {
        var path = new paper.Path();
        path.strokeColor = 'black';
        path.add(new paper.Point(coordDraw.x1, coordDraw.y1));
        path.add(new paper.Point(coordDraw.x2, coordDraw.y2));
        var result = new paper.Group(path);
        return result;
    };
    RenderApi.drawDoor = function (coordDraw) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawDoorWay = function (coordDraw) {
        var result = new paper.Group();
        return result;
    };
    return RenderApi;
})();
/// <reference path="../../dist/paper.d.ts"/>
var ShapeWindow = (function () {
    function ShapeWindow(coordinates) {
        this.coord = coordinates;
    }
    return ShapeWindow;
})();
/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeWindow.ts"/>
var Stages = (function () {
    function Stages(stageContainer) {
        this._render = new Render(stageContainer);
        this._shapes = new Array;
        var position = {
            x1: 10,
            y1: 30,
            x2: 180,
            y2: 120
        };
        this.createShape(5, position);
    }
    Stages.prototype.createShape = function (type, position) {
        var newShape;
        if (type === 5) {
            newShape = new ShapeWindow(position);
        }
        this._shapes.push(newShape);
        newShape.coordDraw = this._render.calcCoord(position);
        newShape.renderObject = RenderApi.drawWindow(newShape.coordDraw);
    };
    Stages.prototype.deliteShape = function (shape) {
        var item = this._shapes.indexOf(shape);
        if (item) {
            this._shapes.splice(item, 1);
        }
        else {
            console.log('ex: deliteShape not found shape');
        }
    };
    Stages.prototype.zoomIn = function () {
        this._render.zoom++;
        this.reDraw();
    };
    Stages.prototype.zoomOut = function () {
        this._render.zoom--;
        this.reDraw();
    };
    Stages.prototype.reDraw = function () {
        var _this = this;
        this._shapes.forEach(function (item) {
            item.coordDraw = _this._render.calcCoord(item.coord);
        });
    };
    return Stages;
})();
//# sourceMappingURL=script.js.map