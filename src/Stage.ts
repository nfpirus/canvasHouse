/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeWindow.ts"/>

class Stages {
    private _shapes: Array<IShape>;
    private _render: Render;

    constructor(stageContainer: HTMLDivElement) {
        
        this._shapes = new Array;
        this._render = new Render(stageContainer, this._shapes);

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
            this._render.renderApi.drawWindow(newShape);
        }

        this._shapes.push(newShape);
    }

    private deleteShape(shape: IShape): void {
        const item: number = this._shapes.indexOf(shape);
        // Realize UnDraw Element;
        if (item) {
            shape.renderObject.remove();
            this._shapes.splice(item, 1);
        } else {
            console.log('ex: deliteShape not found shape');
        }
    }

    public zoomIn(): void {
        this._render.zoom++;
        this._render.reDraw();
    }

    public zoomOut(): void {
        this._render.zoom--;
        this._render.reDraw();
    }
}