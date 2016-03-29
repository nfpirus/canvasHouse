/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeMenu.ts"/>

class Render {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _zoom: number = 0;
    private _shapes: Array<IShape>;
    private _renderApi: RenderApi;
    private _greed: IShape = new ShapeMenu();
    private _center: paper.Point;

    private _positionStartX: number;
    private _positionStartY: number;
    private _differenceX: number;
    private _differenceY: number;
    private _mouseTimeMove: Array<number> = [];
    private _mousePathX: Array<number> = [];
    private _mousePathY: Array<number> = [];
    private _mouseVelocityX: Array<number> = [];
    private _mouseVelocityY: Array<number> = [];
    private _maxMouseMove: number;
    private _maxMouseMoveX: number;
    private _maxMouseMoveY: number;
    private _positionCurrentX: number;
    private _positionCurrentY: number;
    private _requestAnimationFrameID: number;
    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _mouseDown: boolean = false;
    private _delta: number;
    private _mouseDetectBound: number = 30;
    private _mouseShortMoveMultiplication: number = 5;
    private _animationBound: number = 50;
    private _durationPostAnimation: number = 10;

    public set zoom(value: number) {
        this._zoom = value;
        this._renderApi.zoom = value;
        this.drawByZoom();
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
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');
        paper.setup(this._canvas);

        this._renderApi.createGreed(this._greed, this._canvas.width, this._canvas.height);
        this.mouseDetect();
        this._center = new paper.Point(this._canvas.width / 2, this._canvas.height / 2);
    }

    public drawByZoom(): void {
        this._shapes.forEach((item: IShape) => {
            this.drawShapeByZoom(item);
        });
        this.drawShapeByZoom(this._greed);
    }

    public draw(): void {
        this._shapes.forEach((item: IShape) => {
            if (item.coordDraw) {
                this.drawShape(item);
            }         
        });
        this.drawShape(this._greed);
    }

    public drawShapeByZoom(shape: IShape): void {
        const position2: paper.Point = this.renderApi.getNewCord(shape, this._center);
        shape.renderObject.position = position2;
        shape.renderObject.scale(this._renderApi.zoom);
        shape.coordDraw = new paper.Point(position2.x - this._offsetX, position2.y - this._offsetY);
    }

    public drawShape(shape: IShape): void {
        shape.renderObject.position = new paper.Point(shape.coordDraw.x + this._offsetX, shape.coordDraw.y + this._offsetY);
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


    private mouseMoveListener(e: MouseEvent): void {
        if (this._mouseDown) {
            this._positionCurrentX = e.pageX - this._canvas.offsetLeft;
            this._positionCurrentY = e.pageY - this._canvas.offsetTop;

            this._mousePathX.push(this._positionCurrentX);
            this._mousePathY.push(this._positionCurrentY);
            this._mouseTimeMove.push(Date.now());

            if (this._mouseTimeMove[this._mouseTimeMove.length - 2] === this._mouseTimeMove[this._mouseTimeMove.length - 1]) {
                this._mouseTimeMove[this._mouseTimeMove.length - 1]++;
            }

            this._mouseVelocityX.push(Math.round((this._mousePathX[this._mousePathX.length - 2] - this._positionCurrentX) / (this._mouseTimeMove[this._mouseTimeMove.length - 2] - this._mouseTimeMove[this._mouseTimeMove.length - 1])));
            this._mouseVelocityY.push(Math.round((this._mousePathY[this._mousePathY.length - 2] - this._positionCurrentY) / (this._mouseTimeMove[this._mouseTimeMove.length - 2] - this._mouseTimeMove[this._mouseTimeMove.length - 1])));

            this._differenceX = this._positionCurrentX - this._positionStartX;
            this._offsetX = this._offsetX + this._differenceX + this._mouseVelocityX[this._mouseVelocityX.length - 1];
            this._positionStartX = this._positionCurrentX;

            this._differenceY = this._positionCurrentY - this._positionStartY;
            this._offsetY = this._offsetY + this._differenceY + this._mouseVelocityY[this._mouseVelocityY.length - 1];
            this._positionStartY = this._positionCurrentY;
        }
    }

    private get_maxMouseMove(): void {
        this._maxMouseMoveX = 0;
        this._maxMouseMoveY = 0;

        for (var i: number = 1; i < Math.min(this._mouseVelocityX.length, this._mouseDetectBound); i++) {
            this._maxMouseMoveX = (Math.abs(this._maxMouseMoveX) < Math.abs(this._mouseVelocityX[this._mouseVelocityX.length - i])) ? this._mouseVelocityX[this._mouseVelocityX.length - i] : this._maxMouseMoveX;
            this._maxMouseMoveY = (Math.abs(this._maxMouseMoveY) < Math.abs(this._mouseVelocityY[this._mouseVelocityY.length - i])) ? this._mouseVelocityY[this._mouseVelocityY.length - i] : this._maxMouseMoveY;
        }

        if (this._mouseVelocityX.length < this._mouseDetectBound * 2) {
            this._maxMouseMoveX = this._maxMouseMoveX * this._mouseShortMoveMultiplication;
            this._maxMouseMoveY = this._maxMouseMoveY * this._mouseShortMoveMultiplication;
        }
        this._maxMouseMove = Math.max(Math.abs(this._maxMouseMoveX), Math.abs(this._maxMouseMoveY));
        this._maxMouseMove = Math.min(this._maxMouseMove, this._animationBound);
    }

    private stopPostAnimation(): void {
        this._mouseTimeMove = []; this._mousePathX = []; this._mousePathY = []; this._mouseVelocityX = []; this._mouseVelocityY = [];
        this._positionStartX = 0; this._positionStartY = 0; this._differenceX = 0; this._differenceY = 0;
        cancelAnimationFrame(this._requestAnimationFrameID);
    }

    private mouseUpListener(e: MouseEvent): void {
        this._delta = 0;
        this._mouseDown = false;
        this.get_maxMouseMove();
    }

    private mouseOutListener(e: MouseEvent): void {
        this._mouseDown = false;
    }

    private moveStage(): void {
        if (this._mouseDown === false) {
            if (this._mouseTimeMove[this._mouseTimeMove.length - 1] + this._durationPostAnimation * this._maxMouseMove < Date.now()) {
                this.stopPostAnimation();
                return;
            }
            this._delta++;
            this._offsetX = Math.round(this._offsetX + (this._differenceX + this._maxMouseMoveX) / this._delta);
            this._offsetY = Math.round(this._offsetY + (this._differenceY + this._maxMouseMoveY) / this._delta);
        }
        this.draw();
        this._requestAnimationFrameID = requestAnimationFrame(this.moveStage.bind(this));
    }

    private mouseDownListener(e: MouseEvent): void {
        this.stopPostAnimation();
        this._mouseDown = true;
        this._positionStartX = e.pageX - this._canvas.offsetLeft;
        this._positionStartY = e.pageY - this._canvas.offsetTop;

        this._mousePathX.push(this._positionStartX);
        this._mousePathY.push(this._positionStartY);
        this._mouseTimeMove.push(Date.now() - 1);

        this._requestAnimationFrameID = requestAnimationFrame(this.moveStage.bind(this)); // Start the loop.
    }

    public mouseDetect(): void {
        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.mouseDownListener(event), false);
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.mouseMoveListener(event), false);
        this._canvas.addEventListener('mouseup', (event: MouseEvent) => this.mouseUpListener(event), false);
        this._canvas.addEventListener('mouseout', (event: MouseEvent) => this.mouseOutListener(event), false);
    }
}