/// <reference path="../dist/paper.d.ts"/>

class RenderApi {
    public zoom: number;

    constructor(zoom: number) {
        this.zoom = zoom;
    }

    public getNewCord(shape: IShape, center: paper.Point): paper.Point {
        const x1: number = shape.renderObject.position.x - center.x;
        const y1: number = shape.renderObject.position.y - center.y;

        const r: number = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));;

        const cosN: number = x1 / r;
        const sinN: number = y1 / r;

        const x2: number = center.x + r * cosN * this.zoom;
        const y2: number = center.y + r * sinN * this.zoom;

        const result: paper.Point = new paper.Point(x2, y2);

        return result;
    }


    public createGreed(shape: IShape, winWidth, winHeight): paper.Group {

        let i: number;
        const high: number = 80;
        const width: number = 80;
        const pool: Array<paper.Path> = new Array;
        for (i = -10; i < 20; i++) {
            var myPath = new paper.Path();
            myPath.strokeColor = '#cccccc';
            myPath.strokeWidth = 1;
            myPath.add(new paper.Point(i * width + 0.5, - winHeight - 0.5));
            myPath.add(new paper.Point(i * width + 0.5, 2 * winHeight + 0.5));
            pool.push(myPath);

            var myPath2 = new paper.Path();
            myPath2.strokeColor = '#cccccc';
            myPath2.strokeWidth = 1;
            myPath2.add(new paper.Point(-winWidth - 0.5, i * high + 0.5));
            myPath2.add(new paper.Point(2 * winWidth + 0.5, i * high + 0.5));
            pool.push(myPath2);
        }
        const result: paper.Group = new paper.Group(pool);
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }

    public drawOuterWall(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1, coordDraw.y1);
        const point2: paper.Point = new paper.Point(coordDraw.x2, coordDraw.y2);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);
        
        const width: number = 20;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.30, 0.34, 0.1, 0.5);
        /*
        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;        
        text.rotate(90);
        text.content = 'OuterWall'
        */
        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.fillColor = new paper.Color(0, 0.45, 1, 0.5);
            // TODO: Realize show Length
        };
        result.onMouseLeave = () => {
            rect.fillColor = new paper.Color(1, 0.45, 0, 0.5);
            // TODO: Realize hide Length
        }; 
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }

    public drawInnerWall(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1, coordDraw.y1);
        const point2: paper.Point = new paper.Point(coordDraw.x2, coordDraw.y2);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);

        const width: number = 20;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.60, 0.73, 0.21, 0.5);
        /*
        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'InnerWall'
        */
        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.fillColor = new paper.Color(0, 0.45, 1, 0.5);
            // TODO: Realize show Length
        };
        result.onMouseLeave = () => {
            rect.fillColor = new paper.Color(1, 0.45, 0, 0.5);
            // TODO: Realize hide Length
        };    
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }

    /**
     * this function creates Column graphics at point1, with size 20x20 px. 
     * point2 sets the rotation
     * @param shape
     */
    public drawColumn(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1 + 0.5, coordDraw.y1 + 0.5);
        const point2: paper.Point = new paper.Point(coordDraw.x2 + 0.5, coordDraw.y2 + 0.5);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);

        const width: number = 20;
        const length: number = 20;

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(1, 0.45, 0, 0.5);

        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.fillColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.fillColor = new paper.Color(1, 0.45, 0, 0.5);
        };        
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }

    public drawPartition(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1, coordDraw.y1);
        const point2: paper.Point = new paper.Point(coordDraw.x2, coordDraw.y2);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);

        const width: number = 8;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.72, 0.34, 0.02, 0.5);

        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.strokeColor = 'black';
        };    
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }

    public drawWindow(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1, coordDraw.y1);
        const point2: paper.Point = new paper.Point(coordDraw.x2, coordDraw.y2);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);

        const width: number = 20;
        const smallwidth: number = 8;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = 'white';

        size = new paper.Size(smallwidth, length);
        let smallRect: paper.Path = paper.Path.Rectangle(point1, size);
        smallRect.position.x -= smallwidth / 2;
        smallRect.strokeColor = 'black';
        smallRect.name = 'smallrect';
        smallRect.fillColor = new paper.Color(0.44, 0.62, 0.80, 0.5);

        const result: paper.Group = new paper.Group([rect, smallRect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
            smallRect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.strokeColor = 'black';
            smallRect.strokeColor = 'black';
        };    
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }

    public drawDoor(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1, coordDraw.y1);
        const point2: paper.Point = new paper.Point(coordDraw.x2, coordDraw.y2);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);

        const width: number = 20;
        const smallwidth: number = 8;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = 'white';

        size = new paper.Size(smallwidth, length);
        let smallRect: paper.Path = paper.Path.Rectangle(point1, size);
        smallRect.position.x -= smallwidth / 2;
        smallRect.strokeColor = 'black';
        smallRect.name = 'smallrect';
        smallRect.fillColor = new paper.Color(0.72, 0.34, 0.02, 0.5);

        const result: paper.Group = new paper.Group([rect, smallRect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
            smallRect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.strokeColor = 'black';
            smallRect.strokeColor = 'black';
        };
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }

    public drawDoorWay(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1, coordDraw.y1);
        const point2: paper.Point = new paper.Point(coordDraw.x2, coordDraw.y2);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);

        const width: number = 20;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = 'white';

        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.strokeColor = 'black';
        };  
        shape.renderObject = result;
        shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        return result;
    }
}