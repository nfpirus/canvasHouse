var Stages = (function () {
    function Stages(_stageContainer) {
        this._stageContainer = _stageContainer;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        this._stageContainer.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this.myCustom();
    }
    Stages.prototype.myCustom = function () {
        console.log('ello');
    };
    return Stages;
})();
//# sourceMappingURL=script.js.map