/// <reference path="../dist/paper.d.ts"/>

class Render {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _zoom: number = 0;
    private _shapes: Array<IShape>;
    private _renderApi: RenderApi;
    private _greed: paper.Group;

    public set zoom(value: number) {
        this._zoom = value;
        this._renderApi.zoom = value;
        this.reDraw();
    }

    public get zoom(): number {
        return this._zoom;
    }

    public get renderApi(): RenderApi {
        return this._renderApi;
    }

    constructor(stageContainer: HTMLDivElement, shapes: Array<IShape>) {
        this._renderApi = new RenderApi(this._zoom);
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800; //window.innerWidth - 20;
        this._canvas.height = 800; //window.innerHeight - 20;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');
        paper.setup(this._canvas);

        this._greed = this.createGreed();
    }

    public reDraw(): void {
        const center: paper.Point = new paper.Point(this._canvas.width / 2, this._canvas.height/2);
        this._shapes.forEach((item: IShape) => {            
            item.renderObject.position = this.renderApi.getNewCord(item, center);
            item.renderObject.scale(this._renderApi.zoom);
        });
        this._greed.scale(this._renderApi.zoom);
    }

    public createMenu(count: number): Array<paper.Group> {
        const path: any = paper.Path;
        const path1: paper.Path = new path.Rectangle(new paper.Point(0, 0), new paper.Point(this._canvas.width, 40));
        path1.fillColor = '#f6f0e7';

        const menuItem: Array<paper.Group> = new Array;

        const point1: paper.Point = new paper.Point(0, 0);
        const height: number = 35;
        const width: number = 100;
        const margin: number = 5;

        let i: number;
        for (i = 0; i < count; i++) {
            const point2: paper.Point = new paper.Point(point1.x + width, point1.y + height);
            const button: paper.Path = new path.Rectangle(point1, point2);
            

            button.fillColor = '#f6f0e7';


            const text = new paper.PointText(new paper.Point(point1.x + 60, point1.y + 22));
            text.justification = 'center';
            text.fillColor = '#956429';
            text.content = 'Button ' + i;

            const group = new paper.Group([button, text]);
            group.onMouseEnter = function (event) {
                this.children[0].fillColor = '#ffbb80';
                document.body.style.cursor = "pointer";
            }

            group.onMouseLeave = function (event) {
                this.children[0].fillColor = '#f6f0e7';
                document.body.style.cursor = "default";
            }
            menuItem.push(group);
            point1.x = point1.x + margin + width;
        }
        return menuItem;
    }

    public createGreed(): paper.Group {

        let i: number;
        const high: number = 80;
        const width: number = 80;
        const pool: Array<paper.Path> = new Array;
        for (i = -10; i < 20; i++) {
            var myPath = new paper.Path();
            myPath.strokeColor = '#cccccc';
            myPath.strokeWidth = 1;
            myPath.add(new paper.Point(i * width + 0.5, -this._canvas.height - 0.5));
            myPath.add(new paper.Point(i * width + 0.5, 2*this._canvas.height + 0.5));
            pool.push(myPath);

            var myPath2 = new paper.Path();
            myPath2.strokeColor = '#cccccc';
            myPath2.strokeWidth = 1;
            myPath2.add(new paper.Point(-this._canvas.width - 0.5, i * high + 0.5));
            myPath2.add(new paper.Point(2*this._canvas.width + 0.5, i * high + 0.5));
            pool.push(myPath2);
        }

        const result: paper.Group = new paper.Group(pool);

        return result;
    }
}