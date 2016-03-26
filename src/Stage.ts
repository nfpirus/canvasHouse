/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeWindow.ts"/>

class Stages {
    private _shapes: Array<IShape>;
    private _render: Render;

    constructor(stageContainer: HTMLDivElement) {
        this._render = new Render(stageContainer);
        this._shapes = new Array;

        const position: ICoordinates = {
            x1: 10,
            y1: 30,
            x2: 180,
            y2: 120
        };
        this.createShape(5, position);
    }

    private createShape(type: number, position: ICoordinates): void {
        let newShape: IShape;
        // Realize
        if (type === 5) {
            newShape = new ShapeWindow(position);
        }


        this._shapes.push(newShape);
        newShape.coordDraw = this._render.calcCoord(position);
        newShape.renderObject = RenderApi.drawWindow(newShape.coordDraw);
    }

    private deliteShape(shape: IShape): void {
        const item: number = this._shapes.indexOf(shape);
        if (item) {
            this._shapes.splice(item, 1);
        } else {
            console.log('ex: deliteShape not found shape');
        }
    }

    public zoomIn(): void {
        this._render.zoom++;
        this.reDraw();
    }

    public zoomOut(): void {
        this._render.zoom--;
        this.reDraw();
    }

    public reDraw(): void {
        this._shapes.forEach((item: IShape) => {
            // Realize
            item.coordDraw = this._render.calcCoord(item.coord);
            // item.renderObject.position()
            // item.renderObject.scale();
        });
        // Realize
    }
}