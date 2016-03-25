var MyLine = (function () {
    function MyLine(x1, y1, x2, y2) {
        this._path = new Path();
        this._path.strokeColor = 'black';
        this._path.add(new Point(x1, y1));
        this._path.add(new Point(x2, y2));
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
var Stages = (function () {
    function Stages(_stageContainer) {
        this._stageContainer = _stageContainer;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        this._stageContainer.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        paper.install(window);
        console.log('ello');
        paper.setup(this._canvas);
        this.drawLine();
    }
    Stages.prototype.drawLine = function () {
        var myLine = new MyLine(40, 90, 90, 40);
    };
    return Stages;
})();
//# sourceMappingURL=script.js.map