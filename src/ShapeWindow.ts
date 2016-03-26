class shapeWindow implements IShape {
    public type: number;
    public coordinates: ICoordinates;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;

    constructor(coordinates: ICoordinates) {
        this.coordinates = coordinates;
        this.renderObject = RenderApi.drawWindow();
    }

}