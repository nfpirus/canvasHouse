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

    public selected: IShape = null;

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

    private _events: Events;

    constructor(stageContainer: HTMLDivElement, shapes: Array<IShape>) {
        this._renderApi = new RenderApi(this._zoom);
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');
        paper.setup(this._canvas);

        this._renderApi.drawGreed(this._greed, this._canvas.width, this._canvas.height);
        this.mouseDetect();
        this._center = new paper.Point(this._canvas.width / 2, this._canvas.height / 2);

        this._events = new Events(this);
        this._events.addMouseMoveListener(this.shapeMove);
    }

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

    //recursion ?
    private drawByZoom(): void {
        this._shapes.forEach((item: IShape) => {
            this.drawShapeByZoom(item);
            if (item.childrens) {
                item.childrens.forEach((child: IShape) => {
                    this.drawShapeByZoom(child);
                })
            }
        });
        this.drawShapeByZoom(this._greed);
    }

    private draw(): void {
        this._shapes.forEach((item: IShape) => {
            if (item.coordDraw) {
                this.drawShape(item);
            }         
            
            if (item.childrens) {
                item.childrens.forEach((child: IShape) => {
                    this.drawShape(child);
        });
            }
                    
        });
        this.drawShape(this._greed);
    }

    private shapeMove(event: any, link): void {
        if (link.selected) {
            link.selected.renderObject.position = event.point;
            link.selected.coordDraw = link.setCoordDraw(event.point);
            
            if (link.selected.childrens) {
                link.selected.childrens.forEach((child: IShape, i: number) => {
                    let x: number;
                    let y: number;
                    let segments: Array<paper.Segment>;
                    segments = link.selected.renderObject.firstChild.segments;
                    x = (segments[2 * i].point.x + segments[4 - 2 * i - 1].point.x) / 2;
                    y = (segments[2 * i].point.y + segments[4 - 2 * i - 1].point.y) / 2;
                    
                    child.renderObject.firstChild.position = new paper.Point(x, y);
                    child.coordDraw = link.setCoordDraw(new paper.Point(x, y));
                });
            }
            
            // TODO: Realize set this.selected.coord
        }
    }

    public createShape(type: number, position: ICoordinates): void {
        let newShape: IShape;
        let control1: IShape;
        let control2: IShape;

        let invertPosition = {
            x1: position.x2,
            y1: position.y2,
            x2: position.x1,
            y2: position.y1
        }

        if (type === 1) {
            newShape = new ShapeOuterWall(position);
            control1 = new ShapeControl(position);
            control2 = new ShapeControl(invertPosition);

            this.renderApi.drawOuterWall(newShape);
            this.renderApi.drawControl(control1);
            this.renderApi.drawControl(control2);

            newShape.childrens.push(control1);
            //cause unexpected troubles
            //newShape.renderObject.addChild(control1.renderObject);

            newShape.childrens.push(control2);
            //newShape.renderObject.addChild(control2.renderObject);
        }
        if (type === 2) {
            newShape = new ShapeInnerWall(position);
            control1 = new ShapeControl(position);
            control2 = new ShapeControl(invertPosition);

            this.renderApi.drawInnerWall(newShape);
            this.renderApi.drawControl(control1);
            this.renderApi.drawControl(control2);

            newShape.childrens.push(control1);
            //newShape.renderObject.addChild(control1.renderObject);

            newShape.childrens.push(control2);
            //newShape.renderObject.addChild(control2.renderObject);
        }
        if (type === 3) {
            newShape = new ShapeColumn(position);
            this.renderApi.drawColumn(newShape);
        }
        if (type === 4) {
            newShape = new ShapePartition(position);
            control1 = new ShapeControl(position);
            control2 = new ShapeControl(invertPosition);

            this.renderApi.drawPartition(newShape);
            this.renderApi.drawControl(control1);
            this.renderApi.drawControl(control2);

            newShape.childrens.push(control1);
            //newShape.renderObject.addChild(control1.renderObject);

            newShape.childrens.push(control2);
            //newShape.renderObject.addChild(control2.renderObject);
        }
        if (type === 5) {
            newShape = new ShapeWindow(position);
            this.renderApi.drawWindow(newShape);
        }
        if (type === 6) {
            newShape = new ShapeDoor(position);
            this.renderApi.drawDoor(newShape);
        }
        if (type === 7) {
            newShape = new ShapeDoorWay(position);
            this.renderApi.drawDoorWay(newShape);
        }

        newShape.type = type;
        this._shapes.push(newShape);

        newShape.renderObject.onMouseDown = () => {
            this.selected = newShape;
        };
        newShape.renderObject.onMouseUp = () => {
            this.selected = null;
        };
    }

    private drawShapeByZoom(shape: IShape): void {
        const position: paper.Point = this.renderApi.getNewCord(shape, this._center);
        shape.renderObject.position = position;
        shape.renderObject.scale(this._renderApi.zoom);
        shape.coordDraw = this.setCoordDraw(position);

        //Is it useful?
        if (shape.childrens) {
            shape.childrens.forEach((child: IShape, i: number) => {
                const position: paper.Point = this.renderApi.getNewCord(child, this._center);
                child.renderObject.position = position;
                child.renderObject.scale(this._renderApi.zoom);
                child.coordDraw = this.setCoordDraw(position);
            });
        }
    }

    private setCoordDraw(point: IPoint): IPoint {
        return new paper.Point(point.x - this._offsetX, point.y - this._offsetY);
    }

    private drawShape(shape: IShape): void {
        shape.renderObject.position = new paper.Point(shape.coordDraw.x + this._offsetX, shape.coordDraw.y + this._offsetY);
    }

    public drawWall(): any {
        const path: any = paper.Path;
        let line: any;
        let drawShape: boolean = false;
        let startPoint: paper.Point = null;

        let mouseDownHandler = null;
        let mouseMoveHandler = null;
        let link: any = {};
        link = this;
        let onMouseMove: any;
        let onMouseDown: any

        let mouseDownEvent = function (event: any) {
            drawShape = false;
            startPoint = event.point;
            if (line) {
                const position: ICoordinates = {
                    x1: line.segments[0].point.x,
                    y1: line.segments[0].point.y,
                    x2: line.segments[1].point.x,
                    y2: line.segments[1].point.y
                };
                link.createShape(1, position);
                line.remove();
            }
        }

        let mouseMoveEvent = function (event: any) {
            if (startPoint) {
                line = new path.Line(startPoint, event.point);
                line.strokeColor = '#0088ff';
                line.strokeWidth = 2;
                startPoint = null;
                drawShape = true;
            } else if (drawShape) {
                line.segments[line.segments.length - 1].point = event.point
            }
        }

        let cancelEvent = function (link: any) {
            mouseDownHandler = null;
            mouseMoveHandler = null;
            startPoint = null;
            line.remove();
            line = null;
            drawShape = false;
        }

        onMouseDown = (event: any, link: any) => {
            if (mouseDownHandler && event.point.y < 35) {
                cancelEvent(link);
            } else if (mouseDownHandler) {
                mouseDownHandler(event);
            }
        };

        onMouseMove = (event: any, link: any) => {
            if (mouseMoveHandler) {
                mouseMoveHandler(event);
            }
        };

        mouseDownHandler = mouseDownEvent;
        mouseMoveHandler = mouseMoveEvent;

        this._events.addMouseDownListener(onMouseDown);
        this._events.addMouseMoveListener(onMouseMove);
            }

    public createMenu(count: number): Array<paper.Group> {
        return this._renderApi.drawMenu(count, this._canvas.width , 40);
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
        if (!this.selected) {
            this._mouseDown = true;
            this._positionStartX = e.pageX - this._canvas.offsetLeft;
            this._positionStartY = e.pageY - this._canvas.offsetTop;

            this._mousePathX.push(this._positionStartX);
            this._mousePathY.push(this._positionStartY);
            this._mouseTimeMove.push(Date.now() - 1);

            this._requestAnimationFrameID = requestAnimationFrame(this.moveStage.bind(this)); // Start the loop.
        }
    }

    public mouseDetect(): void {
        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.mouseDownListener(event), false);
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.mouseMoveListener(event), false);
        this._canvas.addEventListener('mouseup', (event: MouseEvent) => this.mouseUpListener(event), false);
        this._canvas.addEventListener('mouseout', (event: MouseEvent) => this.mouseOutListener(event), false);
    }
}