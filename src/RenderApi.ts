/// <reference path="../dist/paper.d.ts"/>

class RenderApi {

    public static drawOuterWall(shape: IShape): paper.Group {
        const width: number = 20;   
        const height: number = Math.sqrt(Math.pow(shape.coord.x1 - shape.coord.x2, 2) + Math.pow(shape.coord.y1 - shape.coord.y2, 2));
        const result: paper.Group = new paper.Group();
        let point: paper.Point = new paper.Point(shape.coord.x2 - shape.coord.x1, shape.coord.y2 - shape.coord.y1);
        let size: paper.Size = new paper.Size(width, height);

        let rect: paper.Path = paper.Path.Rectangle(point, size);
        rect.strokeColor = 'red';

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