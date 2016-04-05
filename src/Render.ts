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
        
        this._shapes = shapes;
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        stageContainer.appendChild(this._canvas);

        this._ctx = this._canvas.getContext('2d');
        paper.setup(this._canvas);

        
        this.mouseDetect();
        this._center = new paper.Point(this._canvas.width / 2, this._canvas.height / 2);
        this._renderApi = new RenderApi(this._zoom, this._center);
        this._renderApi.drawGreed(this._greed, this._canvas.width, this._canvas.height, 0, 0);


        this._events = new Events(this);
        this._events.addMouseMoveListener(this.shapeMove);
    }

    public set zoom(value: number) {
        this._zoom = value;
        this._renderApi.zoom = value;
    }

    public get zoom(): number {
        return this._zoom;
    }

    public get renderApi(): RenderApi {
        return this._renderApi;
    }

    private drawShape(shape: IShape): void {
        if (shape.type === 1) {
            this.renderApi.reDrawOuterWall(shape, this._offsetX, this._offsetY);
        }

        /*
        shape.renderObject.position = new paper.Point(shape.coordDraw.x + this._offsetX, shape.coordDraw.y + this._offsetY);
        if (shape.childrens) {
            shape.childrens.forEach((child: IShape) => this.drawShape(child));
        }*/

    }

    private drawByZoom(): void {
        this._shapes.forEach((item: IShape) => this.drawShapeByZoom(item));
        this._renderApi.drawGreed(this._greed, this._canvas.width, this._canvas.height, this._offsetX, this._offsetY);
      //  this.drawShapeByZoom(this._greed, scale);
    }

    private drawShapeByZoom(shape: IShape): void {
        if (shape.type === 1) {
            this.renderApi.reDrawOuterWall(shape, this._offsetX, this._offsetY);
        }
        if (shape.childrens) {
            shape.childrens.forEach((child: IShape, i: number) => this.drawShapeByZoom(child));
        }
    }


    private shapeMove(event: any, link): void {
        if (link.selected && link._selectedMode) {
            /*
            link.selected.renderObject.position = event.point;
            link.selected.coordDraw = link.setCoordDraw(event.point);*/
            /*
            if (link.selected.childrens) {
                link.selected.childrens.forEach((child: IShape, i: number) => {
                    if (child.type === 0) {
                        let x: number;
                        let y: number;
                        let segments: Array<paper.Segment>;
                        segments = link.selected.renderObject.firstChild.segments;
                        x = (segments[2 * i].point.x + segments[4 - 2 * i - 1].point.x) / 2;
                        y = (segments[2 * i].point.y + segments[4 - 2 * i - 1].point.y) / 2;

                        child.renderObject.firstChild.position = new paper.Point(x, y);
                        child.coordDraw = link.setCoordDraw(new paper.Point(x, y));
                    } else {
                        child.renderObject.position = event.point;
                        child.coordDraw = link.setCoordDraw(event.point);
                    }
                });
            }
            */
            // TODO: Realize set this.selected.coord
        }
    }

    public createShape(type: number, position: ICoordinates): IShape {

        function VDot(v1: IPoint, v2: IPoint): number {
            return v1.x * v2.x + v1.y * v2.y
        }
        function VMul(v1: IPoint, A: number): IPoint {
            const result: IPoint = new paper.Point(0, 0);
            result.x = v1.x * A;
            result.y = v1.y * A;
            return result;
        }
        function VSub(v1: IPoint, v2: IPoint): IPoint {
            const result: IPoint = new paper.Point(0, 0);
            result.x = v1.x - v2.x;
            result.y = v1.y - v2.y;
            return result;
        }
        function VNorm(V): IPoint {
            const result: IPoint = new paper.Point(0, 0);
            var vl;
            vl = Math.sqrt(V.x * V.x + V.y * V.y);
            result.x = V.x / vl;
            result.y = V.y / vl;
            return result;
        }
        function VProject(A: IPoint, B: IPoint): IPoint {
            let result: IPoint = new paper.Point(0, 0);
            A = VNorm(A);
            result = VMul(A, VDot(A, B));
            return result
        }
        function Perpendicular(A: IPoint, B: IPoint, C: IPoint): IPoint {
            let result: IPoint = new paper.Point(0, 0);
            var CA = VSub(C, A);
            result = VSub(VProject(VSub(B, A), CA), CA);
            return result;
        }

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
            newShape = new ShapeOuterWall(this._renderApi.originalPosition(position.x1, position.y1), this._renderApi.originalPosition(position.x2, position.y2));
          //  control1 = new ShapeControl(position);
         //   control2 = new ShapeControl(invertPosition);
            this.renderApi.reDrawOuterWall(newShape, this._offsetX, this._offsetY);
            this._shapes.push(newShape);
        }/*
        if (type === 2) {
            newShape = new ShapeInnerWall(position);
            control1 = new ShapeControl(position);
            control2 = new ShapeControl(invertPosition);

            this.renderApi.drawInnerWall(newShape);
            this._shapes.push(newShape);
        }
        if (type === 3) {
            newShape = new ShapeColumn(position);
            this.renderApi.drawColumn(newShape);
            this._shapes.push(newShape);
        }
        if (type === 4) {
            newShape = new ShapePartition(position);
            control1 = new ShapeControl(position);
            control2 = new ShapeControl(invertPosition);

            this.renderApi.drawPartition(newShape);
        }
        if (type === 5) {
            newShape = new ShapeWindow(position);
            this.renderApi.drawWindow(newShape);
        }
        if (type === 6) {
            const vect: paper.Point = new paper.Point(this.selected.coord.x2 - this.selected.coord.x1, this.selected.coord.y2 - this.selected.coord.y1);
            const point1: IPoint = new paper.Point(this.selected.coord.x1, this.selected.coord.y1);
            const point2: IPoint = new paper.Point(this.selected.coord.x2, this.selected.coord.y2);
            const point3: IPoint = new paper.Point(position.x1, position.y1);
            const point4: IPoint = Perpendicular(point1, point2, point3);
            position.x1 = position.x1 + point4.x;
            position.y1 = position.y1 + point4.y;
            newShape = new ShapeDoor(position);
            this.renderApi.drawDoor(newShape, vect.angle);
        }
        if (type === 7) {
            newShape = new ShapeDoorWay(position);
            this.renderApi.drawDoorWay(newShape);
        }
        if (control1 && control2) {
            this.renderApi.drawControl(control1);
            this.renderApi.drawControl(control2);

            newShape.childrens.push(control1);
            //cause unexpected troubles
            //newShape.renderObject.addChild(control1.renderObject);

            newShape.childrens.push(control2);
            //newShape.renderObject.addChild(control2.renderObject);
        }*/

        newShape.type = type;
        newShape.renderObject.onMouseDown = () => {
           this.selected = newShape;
        };
        newShape.renderObject.onMouseUp = () => {
            this.selected = null;
        };
        return newShape;
    }

    private setCoordDraw(point: IPoint): IPoint {
        return new paper.Point(point.x - this._offsetX, point.y - this._offsetY);
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
                    x1: event.point.x - link._offsetX,
                    y1: event.point.y - link._offsetY,
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
                    x1: event.point.x - link._offsetX,
                    y1: event.point.y - link._offsetY,
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

    private reDrawStage(): void {        
        this._shapes.forEach((item: IShape) => this.drawShape(item));
        this._renderApi.drawGreed(this._greed, this._canvas.width, this._canvas.height, this._offsetX, this._offsetY);

      //  this._greed.renderObject.position.x = this._greed.point1.x + this._offsetX;
       // this._greed.renderObject.position.y = this._greed.point1.y + this._offsetY;
       // this.drawShape(this._greed);        
        paper.project.view.update();
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
        this.reDrawStage();
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
        if (e.deltaY > 0 && this.zoom < 2) {
            this.zoom = this.zoom + 0.25;
        } else if (e.deltaY < 0 && this.zoom > 0.25){
            this.zoom = this.zoom - 0.25;
        }
        
        this.drawByZoom();
        paper.project.view.update();
    }

    public mouseDetect(): void {
        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.mouseDownListener(event), false);
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.mouseMoveListener(event), false);
        this._canvas.addEventListener('mouseup', (event: MouseEvent) => this.mouseUpListener(event), false);
        this._canvas.addEventListener('mouseout', (event: MouseEvent) => this.mouseOutListener(event), false);
        this._canvas.addEventListener('mousewheel', (event: WheelEvent) => this.wheelListener(event), false);
    }
}