/// <reference path="../dist/paper.d.ts"/>
/// <reference path="../dist/paper.d.ts"/>
var Render = (function () {
    function Render(stageContainer, shapes) {
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        stageContainer.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        paper.setup(this._canvas);
    }
    Render.prototype.calcCoord = function (shape) {
        shape.coordDraw = shape.coord;
    };
    Render.prototype.reDraw = function () {
        this._shapes.forEach(function (item) {
        });
    };
    Render.prototype.drawShape = function (shape) {
        if (shape.type === 5) {
            this.calcCoord(shape);
            shape.renderObject = RenderApi.drawWindow(shape);
        }
    };
    return Render;
})();
/// <reference path="../dist/paper.d.ts"/>
var RenderApi = (function () {
    function RenderApi() {
    }
    RenderApi.drawOuterWall = function (shape) {
        var width = 20;
        var height = Math.sqrt(Math.pow(shape.coord.x1 - shape.coord.x2, 2) + Math.pow(shape.coord.y1 - shape.coord.y2, 2));
        var result = new paper.Group();
        var point = new paper.Point(shape.coord.x2 - shape.coord.x1, shape.coord.y2 - shape.coord.y1);
        var size = new paper.Size(width, height);
        var rect = paper.Path.Rectangle(point, size);
        rect.strokeColor = 'red';
        return result;
    };
    RenderApi.drawInnerWall = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawColumn = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawPartition = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawWindow = function (shape) {
        var coordDraw = shape.coordDraw;
        var path = new paper.Path();
        path.strokeColor = 'black';
        path.add(new paper.Point(coordDraw.x1, coordDraw.y1));
        path.add(new paper.Point(coordDraw.x2, coordDraw.y2));
        var result = new paper.Group(path);
        return result;
    };
    RenderApi.drawDoor = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.drawDoorWay = function (shape) {
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
        this._shapes = new Array;
        this._render = new Render(stageContainer, this._shapes);
        var position = {
            x1: 10,
            y1: 30,
            x2: 180,
            y2: 120
        };
        this.createShape(5, position);
        this.createShape(1, position);
    }
    Stages.prototype.createShape = function (type, position) {
        var newShape;
        if (type === 1) {
            newShape = new ShapeOuterWall(position);
            RenderApi.drawOuterWall(newShape);
        }
        if (type === 5) {
            newShape = new ShapeWindow(position);
        }
        this._shapes.push(newShape);
        this._render.drawShape(newShape);
    };
    Stages.prototype.deleteShape = function (shape) {
        var item = this._shapes.indexOf(shape);
        if (item) {
            shape.renderObject.remove();
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
            _this._render.calcCoord(item);
        });
        this._render.reDraw();
    };
    return Stages;
})();
//# sourceMappingURL=script.js.map