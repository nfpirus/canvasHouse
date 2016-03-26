/// <reference path="../../dist/paper.d.ts"/>
class ShapeOuterWall implements IShape {
    public type: number = 1;
    public coord: ICoordinates;
    public coordDraw: ICoordinates;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;

    constructor(coordinates: ICoordinates) {
        this.coord = coordinates;
    }
}