/// <reference path="../dist/paper.d.ts"/>

class Render {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    public zoom: number;
    private _shapes: Array<IShape>;

    constructor(stageContainer: HTMLDivElement) {

        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');

        paper.install(window);
        paper.setup(this._canvas);
    }

    public calcCoord(coord: ICoordinates): ICoordinates {
        // Realize on zoom
        const result: ICoordinates = coord;
        return result;
    }
}