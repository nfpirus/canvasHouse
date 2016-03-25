class Stages {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(private _stageContainer: HTMLDivElement) {
        this._canvas = document.createElement('canvas');
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        this._stageContainer.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');

        paper.install(window);
        console.log('ello');
        paper.setup(this._canvas);

        this.drawLine();
    }

    private drawLine(): void {
        const myLine: any = new MyLine(40, 90, 90, 40);


    }
}