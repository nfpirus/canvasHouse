/// <reference path="../dist/paper.d.ts"/>
class Stages {
    private _shapes: Array<IShape>;
    private _render: Render;

    constructor(stageContainer: HTMLDivElement) {
        this._render = new Render(stageContainer);
        this._shapes = new Array;
   }

    private CreateShape(type: number, position: ICoordinates): void {
        let newShape: IShape;
        if (type === 5) {
            newShape = new shapeWindow(position);
        }

        this._shapes.push(newShape);
        this._render.render(newShape);
    }

    private deliteShape(shape: IShape): void {
        const item: number = this._shapes.indexOf(shape);
        if (item) {
            this._shapes.splice(item, 1);
        } else {
            console.log('ex: deliteShape not found shape');
        }
    }
}