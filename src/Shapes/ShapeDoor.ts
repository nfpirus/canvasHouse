﻿/// <reference path="../../dist/paper.d.ts"/>
class ShapeDoor implements IShape {
    public type: number = 6;
    public coord: ICoordinates;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;

    constructor(coordinates: ICoordinates) {
        this.coord = coordinates;
    }
}