/// <reference path="../dist/paper.d.ts"/>

class Render {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private zoom: number;
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

    public render(shape: IShape): void {
        if (shape.type === 5) {
            console.log('create window');
            shape.renderObject = RenderApi.drawWindow();
        }
    }

    public zoomIn(): void {
     //   Render.
    }
}