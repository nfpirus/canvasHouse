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
        shape.renderObject = result;

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
        shape.renderObject = result;

        return result;
    }

    /**
     * this function creates Column graphics at point1, with size 20x20 px. 
     * point2 sets the rotation
     * @param shape
     */
    public drawColumn(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coord;
        const point1: paper.Point = new paper.Point(coordDraw.x1, coordDraw.y1);
        const point2: paper.Point = new paper.Point(coordDraw.x2, coordDraw.y2);
        const vect: paper.Point = new paper.Point(coordDraw.x2 - coordDraw.x1, coordDraw.y2 - coordDraw.y1);

        const width: number = 20;
        const length: number = 20;

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.56, 0.66, 0.64, 0.5);
        /*
        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Column';
        */
        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

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
        /*
        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Partition';
        */
        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

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
        /*
        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Window';
        */
        const result: paper.Group = new paper.Group([rect, smallRect]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

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
        /*
        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Door';
        */
        const result: paper.Group = new paper.Group([rect, smallRect]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

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
        /*
        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'DoorWay'
        */
        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

        return result;
    }
}