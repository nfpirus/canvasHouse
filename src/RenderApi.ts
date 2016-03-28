/// <reference path="../dist/paper.d.ts"/>

class RenderApi {
    public zoom: number;

    constructor(zoom: number) {
        this.zoom = zoom;
    }

    public getPosition(shape: IShape): paper.Point {
        const result: paper.Point = new paper.Point(0,0);
        // Realize o
        return result;
    }

    public calcCoord(shape: IShape): ICoordinates {
        // Realize o
        return shape.coord;
    }

    public drawOuterWall(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = this.calcCoord(shape);
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

        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;        
        text.rotate(90);
        text.content = 'OuterWall'
        
        const result: paper.Group = new paper.Group([rect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

        return result;
    }

    public drawInnerWall(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = this.calcCoord(shape);
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

        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'InnerWall'

        const result: paper.Group = new paper.Group([rect, text]);
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
        const coordDraw: ICoordinates = this.calcCoord(shape);
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

        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Column';

        const result: paper.Group = new paper.Group([rect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

        return result;
    }

    public drawPartition(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = this.calcCoord(shape);
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

        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Partition';

        const result: paper.Group = new paper.Group([rect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

        return result;
    }

    public drawWindow(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = this.calcCoord(shape);
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

        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Window';

        const result: paper.Group = new paper.Group([rect, smallRect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

        return result;
    }

    public drawDoor(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = this.calcCoord(shape);
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

        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'Door';

        const result: paper.Group = new paper.Group([rect, smallRect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

        return result;
    }

    public drawDoorWay(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = this.calcCoord(shape);
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

        let text: paper.TextItem = new paper.PointText(point1);
        text.name = 'text';
        text.position.x += width / 2 + 1;
        text.fillColor = 'red';
        text.fontSize = 20;
        text.rotate(90);
        text.content = 'DoorWay'

        const result: paper.Group = new paper.Group([rect, text]);
        result.rotate(vect.angle - 90, point1);
        shape.renderObject = result;

        return result;
    }
}