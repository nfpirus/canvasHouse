class MyLine {
    private _path: any;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this._path = new Path();
        this._path.strokeColor = 'black';
        this._path.add(new Point(x1, y1));
        this._path.add(new Point(x2, y2));
    }

    public set color(value: string) {
        this._path.strokeColor = value;
    }
}