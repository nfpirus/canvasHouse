/// <reference path="../dist/paper.d.ts"/>

class RenderApi {

    public static drawOuterWall(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawInnerWall(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawColumn(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawPartition(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawWindow(shape: IShape): paper.Group {
        const coordDraw: ICoordinates = shape.coordDraw;

        const path = new paper.Path();
        path.strokeColor = 'black';
        path.add(new paper.Point(coordDraw.x1, coordDraw.y1));
        path.add(new paper.Point(coordDraw.x2, coordDraw.y2));

        const result: paper.Group = new paper.Group(path);
        // Realize
        return result;
    }

    public static drawDoor(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }

    public static drawDoorWay(shape: IShape): paper.Group {
        const result: paper.Group = new paper.Group();
        // Realize
        return result;
    }
}