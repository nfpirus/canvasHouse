/// <reference path="../dist/paper.d.ts"/>

class RenderApi {
    public zoom: number;

    constructor(zoom: number) {
        this.zoom = zoom;
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
        rect.rotate(vect.angle - 90, point1);
        rect.strokeColor = 'black';
        rect.fillColor = new paper.Color(0.6, 0.64, 0.47, 0.5);
        

        const result: paper.Group = new paper.Group(rect);
        return result;
    }

    public drawInnerWall(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public drawColumn(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public drawPartition(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public drawWindow(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = this.calcCoord(shape);
        console.log('coordDraw', coordDraw);
        const path = new paper.Path();
        path.strokeColor = 'black';
        path.add(new paper.Point(coordDraw.x1, coordDraw.y1));
        path.add(new paper.Point(coordDraw.x2, coordDraw.y2));

        const result: paper.Group = new paper.Group(path);
        // Realize
        return result;
    }

    public drawDoor(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public drawDoorWay(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }
}