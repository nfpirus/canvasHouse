/// <reference path="../dist/paper.d.ts"/>
/// <reference path="../dist/paper.d.ts"/>
var Render = (function () {
    function Render(stageContainer, shapes) {
        this._zoom = 0;
        this._renderApi = new RenderApi(this._zoom);
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        stageContainer.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        paper.setup(this._canvas);
    }
    Object.defineProperty(Render.prototype, "zoom", {
        set: function (value) {
            this._zoom = value;
            this._renderApi.zoom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render.prototype, "renderApi", {
        get: function () {
            return this._renderApi;
        },
        enumerable: true,
        configurable: true
    });
    Render.prototype.reDraw = function () {
        this._shapes.forEach(function (item) {
        });
    };
    return Render;
})();
/// <reference path="../dist/paper.d.ts"/>
var RenderApi = (function () {
    function RenderApi(zoom) {
        this.zoom = zoom;
    }
    RenderApi.prototype.calcCoord = function (shape) {
        return shape.coord;
    };
    RenderApi.prototype.drawOuterWall = function (shape) {
        var coordDraw = this.calcCoord(shape);
        var point1 = new paper.Point(coordDraw.x1, coordDraw.y1);
        var point2 = new paper.Point(coordDraw.x2, coordDraw.y2);
        var vect = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);
        var width = 20;
        var length = point2.getDistance(point1, false);
        var size = new paper.Size(width, length);
        var rect = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.rotate(vect.angle - 90, point1);
        rect.strokeColor = 'black';
        rect.fillColor = new paper.Color(0.6, 0.64, 0.47, 0.5);
        var result = new paper.Group(rect);
        return result;
    };
    RenderApi.prototype.drawInnerWall = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.prototype.drawColumn = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.prototype.drawPartition = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.prototype.drawWindow = function (shape) {
        var coordDraw = this.calcCoord(shape);
        console.log('coordDraw', coordDraw);
        var path = new paper.Path();
        path.strokeColor = 'black';
        path.add(new paper.Point(coordDraw.x1, coordDraw.y1));
        path.add(new paper.Point(coordDraw.x2, coordDraw.y2));
        var result = new paper.Group(path);
        return result;
    };
    RenderApi.prototype.drawDoor = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.prototype.drawDoorWay = function (shape) {
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
/// <reference path="../../dist/paper.d.ts"/>
var ShapeOuterWall = (function () {
    function ShapeOuterWall(coordinates) {
        this.type = 1;
        this.coord = coordinates;
    }
    return ShapeOuterWall;
})();
/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeWindow.ts"/>
/// <reference path="Shapes/ShapeOuterWall.ts"/>
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
            this._render.renderApi.drawOuterWall(newShape);
        }
        if (type === 5) {
            newShape = new ShapeWindow(position);
            this._render.renderApi.drawWindow(newShape);
        }
        this._shapes.push(newShape);
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
        this._render.reDraw();
    };
    Stages.prototype.zoomOut = function () {
        this._render.zoom--;
        this._render.reDraw();
    };
    return Stages;
})();
//# sourceMappingURL=script.js.map