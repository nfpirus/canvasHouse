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
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.30, 0.34, 0.1, 0.5);
        var text = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'OuterWall';
        var result = new paper.Group([rect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;
        return result;
    };
    RenderApi.prototype.drawInnerWall = function (shape) {
        var coordDraw = this.calcCoord(shape);
        var point1 = new paper.Point(coordDraw.x1, coordDraw.y1);
        var point2 = new paper.Point(coordDraw.x2, coordDraw.y2);
        var vect = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);
        var width = 20;
        var length = point2.getDistance(point1, false);
        var size = new paper.Size(width, length);
        var rect = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.60, 0.73, 0.21, 0.5);
        var text = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'InnerWall';
        var result = new paper.Group([rect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;
        return result;
    };
    RenderApi.prototype.drawColumn = function (shape) {
        var result = new paper.Group();
        return result;
    };
    RenderApi.prototype.drawPartition = function (shape) {
        var coordDraw = this.calcCoord(shape);
        var point1 = new paper.Point(coordDraw.x1, coordDraw.y1);
        var point2 = new paper.Point(coordDraw.x2, coordDraw.y2);
        var vect = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);
        var width = 8;
        var length = point2.getDistance(point1, false);
        var size = new paper.Size(width, length);
        var rect = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.72, 0.34, 0.02, 0.5);
        var text = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Partition';
        var result = new paper.Group([rect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;
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
/// <reference path="../../dist/paper.d.ts"/>
var ShapeInnerWall = (function () {
    function ShapeInnerWall(coordinates) {
        this.type = 2;
        this.coord = coordinates;
    }
    return ShapeInnerWall;
})();
/// <reference path="../../dist/paper.d.ts"/>
var ShapePartition = (function () {
    function ShapePartition(coordinates) {
        this.type = 4;
        this.coord = coordinates;
    }
    return ShapePartition;
})();
/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeWindow.ts"/>
/// <reference path="Shapes/ShapeOuterWall.ts"/>
/// <reference path="Shapes/ShapeInnerWall.ts"/>
/// <reference path="Shapes/ShapePartition.ts"/>
var Stages = (function () {
    function Stages(stageContainer) {
        this._shapes = new Array;
        this._render = new Render(stageContainer, this._shapes);
        var position1 = {
            x1: 10,
            y1: 30,
            x2: 180,
            y2: 120
        };
        var position2 = {
            x1: 70,
            y1: 200,
            x2: 90,
            y2: 160
        };
        var position3 = {
            x1: 110,
            y1: 40,
            x2: 160,
            y2: 30
        };
        var position4 = {
            x1: 222,
            y1: 200,
            x2: 320,
            y2: 160
        };
        var position5 = {
            x1: 222,
            y1: 30,
            x2: 320,
            y2: 50
        };
        this.createShape(1, position1);
        this.createShape(2, position2);
        this.createShape(4, position4);
        this.createShape(5, position5);
    }
    Stages.prototype.createShape = function (type, position) {
        var newShape;
        if (type === 1) {
            newShape = new ShapeOuterWall(position);
            this._render.renderApi.drawOuterWall(newShape);
        }
        if (type === 2) {
            newShape = new ShapeInnerWall(position);
            this._render.renderApi.drawInnerWall(newShape);
        }
        if (type === 4) {
            newShape = new ShapePartition(position);
            this._render.renderApi.drawPartition(newShape);
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