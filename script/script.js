/// <reference path="../dist/paper.d.ts"/>
var MyLine = (function () {
    function MyLine(x1, y1, x2, y2) {
        this._path = new paper.Path();
        this._path.strokeColor = 'black';
        this._path.add(new paper.Point(x1, y1));
        this._path.add(new paper.Point(x2, y2));
    }
    Object.defineProperty(MyLine.prototype, "color", {
        set: function (value) {
            this._path.strokeColor = value;
        },
        enumerable: true,
        configurable: true
    });
    return MyLine;
})();
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
    Render.prototype.render = function (shape) {
        if (shape.type === 5) {
            console.log('create window');
            shape.renderObject = RenderApi.drawWindow();
        }
    };
    Render.prototype.zoomIn = function () {
        Render.
        ;
    };
    return Render;
})();
/// <reference path="../dist/paper.d.ts"/>
var RenderApi = (function () {
    function RenderApi() {
    }
    RenderApi.drawWindow = function () {
        var result = new paper.Group();
        return result;
    };
    return RenderApi;
})();
var shapeWindow = (function () {
    function shapeWindow(coordinates) {
        this.coordinates = coordinates;
        this.renderObject = RenderApi.drawWindow();
    }
    return shapeWindow;
})();
/// <reference path="../dist/paper.d.ts"/>
var Stages = (function () {
    function Stages(stageContainer) {
        this._render = new Render(stageContainer);
        this._shapes = new Array;
    }
    Stages.prototype.CreateShape = function (type, position) {
        var newShape;
        if (type === 5) {
            newShape = new shapeWindow(position);
        }
        this._shapes.push(newShape);
        this._render.render(newShape);
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
    return Stages;
})();
//# sourceMappingURL=script.js.map