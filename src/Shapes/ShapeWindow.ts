/// <reference path="../../dist/paper.d.ts"/>
class ShapeWindow implements IShape {
    public type: number;
    public coord: ICoordinates;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;

    constructor(coordinates: ICoordinates) {
        this.coord = coordinates;
    }
}