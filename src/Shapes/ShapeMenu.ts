/// <reference path="../../dist/paper.d.ts"/>
class ShapeMenu implements IShape {
    public type: number = null;
    public coord: ICoordinates;
    public coordDraw: IPoint;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;
}