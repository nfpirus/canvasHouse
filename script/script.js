/// <reference path="../dist/paper.d.ts"/>
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