/// <reference path="../dist/paper.d.ts"/>

class Render {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    public zoom: number;
    private _shapes: Array<IShape>;

    constructor(stageContainer: HTMLDivElement, shapes: Array<IShape>) {
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');

        paper.setup(this._canvas);
    }

    public calcCoord(shape: IShape): void {
        // Realize o
        shape.coordDraw = shape.coord;
    }


    public reDraw(): void {
        this._shapes.forEach((item: IShape) => {
            // Realize
          //  item.renderObject.position();
          // item.renderObject.scale();
        });
        // Realize
    }

    public drawShape(shape: IShape): void {
        if (shape.type === 5) {
            this.calcCoord(shape);
            shape.renderObject = RenderApi.drawWindow(shape);
        }
    }
}