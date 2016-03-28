/// <reference path="../dist/paper.d.ts"/>

/// <reference path="Shapes/ShapeOuterWall.ts"/>
/// <reference path="Shapes/ShapeColumn.ts"/>
/// <reference path="Shapes/ShapeInnerWall.ts"/>
/// <reference path="Shapes/ShapePartition.ts"/>
/// <reference path="Shapes/ShapeWindow.ts"/>
/// <reference path="Shapes/ShapeDoor.ts"/>
/// <reference path="Shapes/ShapeDoorWay.ts"/>

class Stages {
    private _shapes: Array<IShape>;
    private _render: Render;

    constructor(stageContainer: HTMLDivElement) {
        
        this._shapes = new Array;
        this._render = new Render(stageContainer, this._shapes);

        const position1: ICoordinates = {
            x1: 10,
            y1: 30,
            x2: 180,
            y2: 120
        };
        const position2: ICoordinates = {
            x1: 70,
            y1: 200,
            x2: 90,
            y2: 160
        };
        const position3: ICoordinates = {
            x1: 110,
            y1: 40,
            x2: 160,
            y2: 30
        };
        const position4: ICoordinates = {
            x1: 222,
            y1: 240,
            x2: 320,
            y2: 270
        };
        const position5: ICoordinates = {
            x1: 222,
            y1: 30,
            x2: 320,
            y2: 50
        };
        const position6: ICoordinates = {
            x1: 250,
            y1: 200,
            x2: 300,
            y2: 180
        };
        const position7: ICoordinates = {
            x1: 270,
            y1: 90,
            x2: 400,
            y2: 200
        };

        this.createShape(1, position1);
        this.createShape(2, position2);
        this.createShape(3, position3);
        this.createShape(4, position4);
        this.createShape(5, position5);
        this.createShape(6, position6);
        this.createShape(7, position7);
    }

    private createShape(type: number, position: ICoordinates): void {
        let newShape: IShape;
        // Realize
        if (type === 1) {
            newShape = new ShapeOuterWall(position);
            this._render.renderApi.drawOuterWall(newShape);
        }
        if (type === 2) {
            newShape = new ShapeInnerWall(position);
            this._render.renderApi.drawInnerWall(newShape);
        }
        if (type === 3) {
            newShape = new ShapeColumn(position);
            this._render.renderApi.drawColumn(newShape);
        }
        if (type === 4) {
            newShape = new ShapePartition(position);
            this._render.renderApi.drawPartition(newShape);
        }
        if (type === 5) {
            newShape = new ShapeWindow(position);
            this._render.renderApi.drawWindow(newShape);
        }
        if (type === 6) {
            newShape = new ShapeDoor(position);
            this._render.renderApi.drawDoor(newShape);
        }
        if (type === 7) {
            newShape = new ShapeDoorWay(position);
            this._render.renderApi.drawDoorWay(newShape);
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