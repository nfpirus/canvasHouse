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
        const result: paper.Group = new paper.Group();
        // Realize
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