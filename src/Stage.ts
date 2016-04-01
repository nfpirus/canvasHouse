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
    private _menu: Array<paper.Group>;

    constructor(stageContainer: HTMLDivElement) {
        
        this._shapes = new Array;
        this._render = new Render(stageContainer, this._shapes);
        this._menu = this._render.createMenu(6);
        this._render.zoom = 1;

        this.initialization();
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
        this._render.zoom = 2;
    }

    public zoomOut(): void {
        this._render.zoom = 0.5;
    }

    private initialization(): void {
        this._menu[0].onClick = () => this.zoomIn();
        this._menu[1].onClick = () => this.zoomOut();
        this._menu[2].onClick = () => this._render.drawWall();
        this._menu[0].children[1].content = 'Zoom In';
        this._menu[1].children[1].content = 'Zoom Out';
        this._menu[2].children[1].content = 'Draw Wall';
        this._menu[3].children[1].content = 'Draw Off';
        
        const position1: ICoordinates = { // x195  y175
            x1: 110,
            y1: 130,
            x2: 280,
            y2: 220
        };
        const position2: ICoordinates = { //180  // 280
            x1: 170,
            y1: 300,
            x2: 190,
            y2: 260
        };
        const position3: ICoordinates = {
            x1: 610,
            y1: 540,
            x2: 660,
            y2: 540
        };
        const position4: ICoordinates = { // 271 255
            x1: 222,
            y1: 240,
            x2: 320,
            y2: 270
        };
        const position5: ICoordinates = {
            x1: 322,
            y1: 130,
            x2: 420,
            y2: 150
        };
        const position6: ICoordinates = {
            x1: 250,
            y1: 200,
            x2: 300,
            y2: 180
        };
        const position7: ICoordinates = {
            x1: 370,
            y1: 190,
            x2: 500,
            y2: 300
        };

        this._render.createShape(1, position1);
        this._render.createShape(2, position2);
        this._render.createShape(3, position3);
        this._render.createShape(4, position4);
        this._render.createShape(5, position5);
        this._render.createShape(6, position6);
        this._render.createShape(7, position7);

    }
}