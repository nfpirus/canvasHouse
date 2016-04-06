/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeMenu.ts"/>
/// <reference path="IPoint.ts"/>

class Render {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _zoom: number = 1;
    private _shapes: Array<IShape>;
    private _renderApi: RenderApi;
    private _greed: IShape = new ShapeMenu();
    private _center: paper.Point;
    public selected: IShape = null;
    private _selectedMode: boolean = true;
    private _selectedPoint: IPoint = new paper.Point(0, 0);
    private _events: Events;

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

    constructor(stageContainer: HTMLDivElement, shapes: Array<IShape>) {        
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');
        paper.setup(this._canvas);
        const rect: paper.Path = paper.Path.Rectangle(new paper.Point(0, 0), new paper.Size(window.innerWidth, window.innerHeight));
        rect.fillColor = 'white';
        
        this.mouseDetect();
        this._center = new paper.Point(this._canvas.width / 2, this._canvas.height / 2);
        this._renderApi = new RenderApi(this._zoom, this._center);
        this._renderApi.drawGreed(this._greed, this._canvas.width, this._canvas.height, 0, 0);

        this._events = new Events(this);
        this._events.addMouseMoveListener(this.moveShapeListener);
    }

    public set zoom(value: number) {
        this._zoom = value;
        this._renderApi.zoom = value;
    }
    
    private reDraw(): void {
        this._shapes.forEach((item: IShape) => this.renderShape(item));
        this._renderApi.drawGreed(this._greed, this._canvas.width, this._canvas.height, this._offsetX, this._offsetY);
        paper.project.view.update();
    }

    private renderShape(shape: IShape): void {
        this._renderApi.renderShape(shape, this._offsetX, this._offsetY);
    }

    private moveShape(shape: IShape, moveX: number, moveY: number): void {
        shape.point1.x = shape.point1.x + moveX / this._zoom;
        shape.point2.x = shape.point2.x + moveX / this._zoom;
        shape.point1.y = shape.point1.y + moveY / this._zoom;
        shape.point2.y = shape.point2.y + moveY / this._zoom;
        this.renderShape(shape);
        if (shape.childrens) {
            shape.childrens.forEach((child: IShape, i: number) => this.moveShape(child, moveX, moveY));
        }
    }

    private moveShapeListener(event: any, link): void {
        if (link.selected && link._selectedMode) {
            const curentPoint: paper.Point = new paper.Point(event.point.x - link._offsetX * link._zoom, event.point.y - link._offsetY * link._zoom);
            const moveX: number = curentPoint.x - link._selectedPoint.x;
            const moveY: number = curentPoint.y - link._selectedPoint.y;

            link.moveShape(link.selected, moveX, moveY);
            
            if (link.selected.type === 11) {
                link.selected.parent.point1.x += moveX / link._zoom;
                link.selected.parent.point1.y += moveY / link._zoom;
                link.renderShape(link.selected.parent);
            }
            if (link.selected.type === 12) {
                link.selected.parent.point2.x +=  moveX / link._zoom;
                link.selected.parent.point2.y += moveY / link._zoom;
                link.renderShape(link.selected.parent);
            }
            link._selectedPoint = curentPoint;
        }
    }

    public createShape(type: number, position: ICoordinates): IShape {
        let newShape: IShape;
        let control1: IShape;
        let control2: IShape;
        const point1: IPoint = this._renderApi.originalPosition(position.x1, position.y1);
        const point2: IPoint = this._renderApi.originalPosition(position.x2, position.y2);

        if (type === 1) {
            newShape = new ShapeOuterWall(point1, point2);
            control1 = new ShapeControl(point1, point2);
            control2 = new ShapeControl(point2, point1);
            this.renderShape(newShape);
            this._shapes.push(newShape);
        }/*
        if (type === 2) {
            newShape = new ShapeInnerWall(position);
            control1 = new ShapeControl(position);
            control2 = new ShapeControl(invertPosition);

            this._renderApi.drawInnerWall(newShape);
            this._shapes.push(newShape);
        }*/
        if (type === 3) {
            newShape = new ShapeColumn(point1, point2);
            this.renderShape(newShape);
            this._shapes.push(newShape);
        }/*
        if (type === 4) {
            newShape = new ShapePartition(position);
            control1 = new ShapeControl(position);
            control2 = new ShapeControl(invertPosition);

            this._renderApi.drawPartition(newShape);
        }
        if (type === 5) {
            newShape = new ShapeWindow(position);
            this._renderApi.drawWindow(newShape);
        }*/
        if (type === 6) {
            const pointA: IPoint = new paper.Point(this.selected.point1.x, this.selected.point1.y);
            const pointB: IPoint = new paper.Point(this.selected.point2.x, this.selected.point2.y);            
            const correctionPoint: IPoint = this._renderApi.getNormal(pointA, pointB, point1);
            const point3: IPoint = new paper.Point(point1.x + correctionPoint.x, point1.y + correctionPoint.y);
            newShape = new ShapeDoor(point3, pointB);
            this.renderShape(newShape);
        }/*
        if (type === 7) {
            newShape = new ShapeDoorWay(position);
            this._renderApi.drawDoorWay(newShape);
        }*/
        if (control1 && control2) {
            this._renderApi.drawControl(control1, this._offsetX, this._offsetY);
            this._renderApi.drawControl(control2, this._offsetX, this._offsetY);

            control1.type = 11;
            control2.type = 12;
            newShape.childrens.push(control1);
            newShape.childrens.push(control2);
            control1.parent = newShape;
            control2.parent = newShape;
            control1.renderObject.insertAbove(newShape.renderObject);
            control2.renderObject.insertAbove(newShape.renderObject);

            control1.renderObject.onMouseDown = (event: any) => {
                this._selectedPoint.x = event.point.x - this._offsetX * this._zoom;
                this._selectedPoint.y = event.point.y - this._offsetY * this._zoom;
                this.selected = control1;
            };
            control2.renderObject.onMouseDown = (event: any) => {
                this._selectedPoint.x = event.point.x - this._offsetX * this._zoom;
                this._selectedPoint.y = event.point.y - this._offsetY * this._zoom;
                this.selected = control2;
            };
            control1.renderObject.onMouseUp = () => {
                this.selected = null;
            };
            control2.renderObject.onMouseUp = () => {
                this.selected = null;
            };
        }

        newShape.type = type;
        newShape.renderObject.onMouseDown = (event: any) => {
            this._selectedPoint.x = event.point.x - this._offsetX * this._zoom;
            this._selectedPoint.y = event.point.y - this._offsetY * this._zoom;
            this.selected = newShape;
        };
        newShape.renderObject.onMouseUp = () => {
            this.selected = null;
        };

        return newShape;
    }

    private _drawWallMouseDownHandler;
    private _drawWallMouseMoveHandler;

    public createWall(isChain: boolean): any {
        this._selectedMode = false;
        const path: any = paper.Path;
        let line: any;
        let startPoint: paper.Point = null;

        let link: any = {};
        link = this;
        let cancelEvent;

        const onMouseDown = (event: any, link: any) => {
            if (this._drawWallMouseDownHandler && event.point.y < 35) {
                cancelEvent(link);
            } else if (this._drawWallMouseDownHandler) {
                this._drawWallMouseDownHandler(event);
            }
        };
        const onMouseMove = (event: any, link: any) => {
                this._drawWallMouseMoveHandler(event);
        };
        cancelEvent = function (link: any) {
            this._drawWallMouseDownHandler = null;
            this._drawWallMouseMoveHandler = null;
            startPoint = null;
            if (line) {
                line.remove();
            }
            line = null;
            link._events.removeMouseDownListener(onMouseDown);
            link._events.removeMouseMoveListener(onMouseMove);
            link._selectedMode = true;
        }

        if (this._drawWallMouseDownHandler || this._drawWallMouseMoveHandler) {
            cancelEvent(link);
        }

        this._drawWallMouseDownHandler = function (event: any) {
            startPoint = event.point;
            if (line) {
                const position: ICoordinates = {
                    x1: line.segments[0].point.x - link._offsetX * this._zoom,
                    y1: line.segments[0].point.y - link._offsetY * this._zoom,
                    x2: line.segments[1].point.x - link._offsetX * this._zoom,
                    y2: line.segments[1].point.y - link._offsetY * this._zoom
                };

                const newShape: IShape = link.createShape(1, position);
                line.remove();
                line = null;
                if (!isChain) {
                    startPoint = null;
                }
            }
        }

        this._drawWallMouseMoveHandler = function (event: any) {
            if (startPoint) {
                line = new path.Line(startPoint, event.point);
                line.strokeColor = '#0088ff';
                line.strokeWidth = 2;
                startPoint = null;
            } else if (line) {
                line.segments[line.segments.length - 1].point = event.point
            }
        }

        this._events.addMouseDownListener(onMouseDown);
        this._events.addMouseMoveListener(onMouseMove);
    }

    public createColumn(): any {
        this._selectedMode = false;
        let cancelEvent;
        let link: any = {};
        link = this;
        const onMouseDown = (event: any) => {
            if (event.point.y > 35) {
                const position: ICoordinates = {
                    x1: event.point.x - link._offsetX * this._zoom,
                    y1: event.point.y - link._offsetY * this._zoom,
                    x2: 0,
                    y2: 0
                };
                const newShape: IShape = link.createShape(3, position);
            } else {
                cancelEvent();
            }
        };

        cancelEvent = () => {
            link._events.removeMouseDownListener(onMouseDown);
            link._selectedMode = true;
        }

        this._events.addMouseDownListener(onMouseDown);
    }

    public createDoor(): any {
        this._selectedMode = false;
        let cancelEvent;
        let link: any = {};
        link = this;
        const onMouseDown = (event: any) => {
            if (event.point.y > 35 && this.selected && this.selected.type === 1) {
                const position: ICoordinates = {
                    x1: event.point.x - link._offsetX * this._zoom,
                    y1: event.point.y - link._offsetY * this._zoom,
                    x2: 0,
                    y2: 0
                };
                const newShape: IShape = link.createShape(6, position);
                this.selected.childrens.push(newShape);
            } else {
                cancelEvent();
            }
        };

        cancelEvent = () => {
            link._events.removeMouseDownListener(onMouseDown);
            link._selectedMode = true;
        }

        this._events.addMouseDownListener(onMouseDown);
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

            this._differenceX = (this._positionCurrentX - this._positionStartX) / this._zoom;
            this._offsetX = this._offsetX + this._differenceX + this._mouseVelocityX[this._mouseVelocityX.length - 1];
            this._positionStartX = this._positionCurrentX;

            this._differenceY = (this._positionCurrentY - this._positionStartY) / this._zoom;
            this._offsetY = this._offsetY + this._differenceY + this._mouseVelocityY[this._mouseVelocityY.length - 1];
            this._positionStartY = this._positionCurrentY;
        }
    }

    private stopPostAnimation(): void {
        this._mouseTimeMove = []; this._mousePathX = []; this._mousePathY = []; this._mouseVelocityX = []; this._mouseVelocityY = [];
        this._positionStartX = 0; this._positionStartY = 0; this._differenceX = 0; this._differenceY = 0;
        cancelAnimationFrame(this._requestAnimationFrameID);
    }

    private mouseUpListener(e: MouseEvent): void {
        this._delta = 0;
        this._mouseDown = false;
        this.stopPostAnimation();
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
        this.reDraw();
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

    private wheelListener(e: WheelEvent): void {        
        if (e.deltaY > 0 && this._zoom < 2) {
            this.zoom = this._zoom + 0.1;
        } else if (e.deltaY < 0 && this._zoom > 0.5){
            this.zoom = this._zoom - 0.1;
        }        
        this.reDraw();
    }

    public mouseDetect(): void {
        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.mouseDownListener(event), false);
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.mouseMoveListener(event), false);
        this._canvas.addEventListener('mouseup', (event: MouseEvent) => this.mouseUpListener(event), false);
        this._canvas.addEventListener('mouseout', (event: MouseEvent) => this.mouseOutListener(event), false);
        this._canvas.addEventListener('mousewheel', (event: WheelEvent) => this.wheelListener(event), false);
    }
}