/// <reference path="../dist/paper.d.ts"/>

class Render {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _zoom: number = 0;
    private _shapes: Array<IShape>;
    private _renderApi: RenderApi;

    public set zoom(value: number) {
        this._zoom = value;
        this._renderApi.zoom = value;
    }

    public get renderApi(): RenderApi {
        return this._renderApi;
    }

    constructor(stageContainer: HTMLDivElement, shapes: Array<IShape>) {
        this._renderApi = new RenderApi(this._zoom);
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');

        paper.setup(this._canvas);
    }

    public reDraw(): void {
        this._shapes.forEach((item: IShape) => {
            // Realize
          //  item.renderObject.position();
          // item.renderObject.scale();
        });
        // Realize
    }
}