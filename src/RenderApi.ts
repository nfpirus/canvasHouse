/// <reference path="../dist/paper.d.ts"/>

class RenderApi {

    public static drawOuterWall(coordDraw: ICoordinates): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawInnerWall(coordDraw: ICoordinates): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawColumn(coordDraw: ICoordinates): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawPartition(coordDraw: ICoordinates): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawWindow(coordDraw: ICoordinates): paper.Group {
        
        const path = new paper.Path();
        path.strokeColor = 'black';
        path.add(new paper.Point(coordDraw.x1, coordDraw.y1));
        path.add(new paper.Point(coordDraw.x2, coordDraw.y2));

        const result: paper.Group = new paper.Group(path);
        // Realize
        return result;
    }

    public static drawDoor(coordDraw: ICoordinates): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawDoorWay(coordDraw: ICoordinates): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }
}