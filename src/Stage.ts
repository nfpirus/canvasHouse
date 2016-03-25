class Stages {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(private _stageContainer: HTMLDivElement) {
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        this._stageContainer.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');

        this.myCustom();
    }

    private myCustom(): void {
        console.log('ello');
    }
}