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
        const width: number = 20;   
        const height: number = Math.sqrt(Math.pow(shape.coord.x1 - shape.coord.x2, 2) + Math.pow(shape.coord.y1 - shape.coord.y2, 2));
        console.log('height', height);
        let point: paper.Point = new paper.Point(shape.coord.x2 - shape.coord.x1, shape.coord.y2 - shape.coord.y1);
        let size: paper.Size = new paper.Size(width, height);

        let rect: paper.Path = paper.Path.Rectangle(point, size);
        rect.strokeColor = 'red';

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