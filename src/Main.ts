
class RotateCtrlBt extends egret.Shape {
    public _row: number;
    public _col: number;
    constructor(row: number, col: number) {
        super();
        this._row = row;
        this._col = col;


        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }
    private onAddToStage(event: egret.Event) {
        this.draw();
    }
    draw() {
        this.graphics.beginFill(0x3377AA, 1);
        this.graphics.lineStyle(2, 0xff77);
        this.graphics.drawCircle(0, 0, 15);
        this.graphics.drawCircle(0, 0, 9);
        this.graphics.endFill();
        this.touchEnabled = true;

    }
}

class Triangle extends egret.Shape {
    public x1: number;
    public x2: number;
    public x3: number;
    public y1: number;
    public y2: number;
    public y3: number;

    public color: number;

    constructor(x1: number, y1: number, x2: number, y2: number,
        x3: number, y3: number, color: number) {
        super();
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;

        this.color = color;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.draw();
    }
    public setColor(color: number) {
        this.color = color;
    }

    public draw() {

        this.graphics.lineStyle(2, 0xffffff);
        this.graphics.beginFill(this.color, 1);
        this.graphics.moveTo(this.x1, this.y1);
        this.graphics.lineTo(this.x2, this.y2);
        this.graphics.lineTo(this.x3, this.y3);
        this.graphics.lineTo(this.x1, this.y1);
        this.graphics.endFill();
    }

}

class Game {
    private _board: Array<Array<number>>;
    level: number;

    isStarted: boolean;

    /**
     * @summary Get Game Board
     */
    get Board() {
        return this._board;
    }
    public static get target_board() {
        return [[1, 2, 2, 2, 2, 2, 3],
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [4, 5, 5, 5, 5, 5, 6]];;
    }
    public static VERTEX_DIM = [4, 5, 6, 7, 6, 5, 4]
    public static BOARD_DIM = [7, 9, 11, 11, 9, 7]
    public static CTRL_DIM = [3, 4, 5, 4, 3]

    public static Vertexes() {
        let vertexes = []
        for (let i = 0; i < Game.VERTEX_DIM.length; i++) {
            let row = []
            for (let j = 0; j < Game.VERTEX_DIM[i]; j++) {
                let x = Math.abs(i - 3) * 50 + 100 * j
                row.push([x, i * 100]);
            }
            vertexes.push(row);
        }
        return vertexes;
    }

    constructor() {
        this._board = Game.target_board;
        this.isStarted = false;
    }

	/**
	 * 
	 * @summary 根据设定的难度等级开始游戏 
     * @level   难度等级：1为简单
	 */
    start(level: number) {
        let step = (level == 1) ? 10 : 50;
        for (let i = 0; i < step; i++) {
            let x = Math.floor(Math.random() * Game.CTRL_DIM.length) + 1;
            let y = Math.floor(Math.random() * Game.CTRL_DIM[x - 1]) + 1;
            this.rotate(x, y);
        }
        this.isStarted = true;
    }
	/**
	 * @param row: 1-based
	 * @param col: 1-based
	 */
    public rotate(row: number, col: number) {
        egret.log("init click:" + row + " , " + col);

        if (row < 1 || row > Game.CTRL_DIM.length) return;
        if (col < 1 || col > Game.CTRL_DIM[row]) return;
        let upleft_x: number = (row <= 3) ? col * 2 - 2 : col * 2 - 1;
        let downleft_x: number = (row <= 2) ? col * 2 - 1 : col * 2 - 2;

        let tmp = this._board[row][downleft_x];
        this._board[row][downleft_x] = this._board[row][downleft_x + 1];
        this._board[row][downleft_x + 1] = this._board[row][downleft_x + 2];
        this._board[row][downleft_x + 2] = this._board[row - 1][upleft_x + 2];
        this._board[row - 1][upleft_x + 2] = this._board[row - 1][upleft_x + 1];
        this._board[row - 1][upleft_x + 1] = this._board[row - 1][upleft_x];
        this._board[row - 1][upleft_x] = tmp;

    }

    public check(): boolean {
        for (let i = 0; i < Game.target_board.length; i++) {
            for (let j = 0; j < Game.target_board[i].length; j++) {
                if (this._board[i][j] != Game.target_board[i][j]){
                    egret.log("check faled: " + i + " , " + j + ":"+this._board[i][j] +" vs "+Game.target_board[i][j]);
                    return false;
                }
            }
        }
        egret.log("check OK!");
        return true;
    }
}


var colorMap = {
    1: 0xFF0000,
    2: 0xFFFF,
    3: 0xFF,
    4: 0xFFFF00,
    5: 0xFF00,
    6: 0xFF00FF
}

var game: Game = new Game();

class GameBoard extends eui.Component {

    private _triangles: Object;
    private _rotatebts: Array<RotateCtrlBt>;

    private isPreviw: boolean;

    constructor(isPreview: boolean = false) {
        super();
        this.isPreviw = isPreview;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    private initGraphic() {
        this._rotatebts = []
        this._triangles = {}

        let vertexes = Game.Vertexes();
        for (let i = 0; i < Game.BOARD_DIM.length; i++) {
            for (let j = 0; j < Game.BOARD_DIM[i]; j++) {
                let x1: number, x2: number, x3: number;
                let y1: number, y2: number, y3: number;
                if (i < Game.BOARD_DIM.length / 2 && j % 2 != 0) {
                    [x1, y1] = vertexes[i][(j - 1) / 2];
                    [x2, y2] = vertexes[i][(j - 1) / 2 + 1];
                    [x3, y3] = vertexes[i + 1][(j + 1) / 2];
                } else if (i < Game.BOARD_DIM.length / 2 && j % 2 == 0) {
                    [x1, y1] = vertexes[i][(j) / 2];
                    [x2, y2] = vertexes[i + 1][(j) / 2 + 1];
                    [x3, y3] = vertexes[i + 1][(j) / 2];
                } else if (i >= Game.BOARD_DIM.length / 2 && j % 2 != 0) {
                    [x1, y1] = vertexes[i][(j - 1) / 2 + 1];
                    [x2, y2] = vertexes[i + 1][(j - 1) / 2];
                    [x3, y3] = vertexes[i + 1][(j - 1) / 2 + 1];
                } else if (i >= Game.BOARD_DIM.length / 2 && j % 2 == 0) {
                    [x1, y1] = vertexes[i][(j) / 2];
                    [x2, y2] = vertexes[i][(j) / 2 + 1];
                    [x3, y3] = vertexes[i + 1][(j) / 2];
                }
                let color = colorMap[Game.target_board[i][j]];
                let trian = new Triangle(x1, y1, x2, y2, x3, y3, color);
                trian.y = 250;
                trian.x = 20;
                trian.alpha = 0.4;
                this._triangles[i + '_' + j] = trian;
                this.addChild(trian);
                // this.setChildIndex(trian, 10);
            }
        }

        if (!this.isPreviw) {
            for (let i = 0; i < 5; i++) {
                let n = 5 - Math.abs(i - 2);
                for (let j = 0; j < n; j++) {
                    let x = 100 + Math.abs(i - 2) * 50 + 100 * j
                    let y = (i + 1) * 100;

                    let bt = new RotateCtrlBt(i + 1, j + 1);
                    bt.x = x + 20;
                    bt.y = y + 250;

                    this._rotatebts.push(bt);
                    this.addChild(bt);
                    // this.setChildIndex(bt, 100);
                    bt.addEventListener(egret.TouchEvent.TOUCH_TAP, (src) => {
                        bt = src.currentTarget;
                        if(game.isStarted)
                            this.rotate(bt._row, bt._col);
                    }, this);
                }
            }
        }

    }

    private rotate(row: number, col: number) {
        if (row < 1 || row > Game.CTRL_DIM.length) return;
        if (col < 1 || col > Game.CTRL_DIM[row - 1]) return;
        let upleft_x: number = (row <= 3) ? col * 2 - 2 : col * 2 - 1;
        let downleft_x: number = (row <= 2) ? col * 2 - 1 : col * 2 - 2; 


        let bd = game.Board;
        let tmp = bd[row][downleft_x];

        bd[row][downleft_x] = bd[row][downleft_x + 1];
        bd[row][downleft_x + 1] = bd[row][downleft_x + 2];
        bd[row][downleft_x + 2] = bd[row - 1][upleft_x + 2];
        bd[row - 1][upleft_x + 2] = bd[row - 1][upleft_x + 1];
        bd[row - 1][upleft_x + 1] = bd[row - 1][upleft_x];
        bd[row - 1][upleft_x] = tmp;

        this._triangles[(row - 1) + '_' + (upleft_x)].setColor(colorMap[bd[row - 1][upleft_x]]);
        this._triangles[(row - 1) + '_' + (upleft_x + 1)].setColor(colorMap[bd[row - 1][upleft_x + 1]]);
        this._triangles[(row - 1) + '_' + (upleft_x + 2)].setColor(colorMap[bd[row - 1][upleft_x + 2]]);
        this._triangles[(row) + '_' + (downleft_x)].setColor(colorMap[bd[row][downleft_x]]);
        this._triangles[(row) + '_' + (downleft_x + 1)].setColor(colorMap[bd[row][downleft_x + 1]]);
        this._triangles[(row) + '_' + (downleft_x + 2)].setColor(colorMap[bd[row][downleft_x + 2]]);

        this._triangles[(row - 1) + '_' + (upleft_x)].draw();
        this._triangles[(row - 1) + '_' + (upleft_x + 1)].draw();
        this._triangles[(row - 1) + '_' + (upleft_x + 2)].draw();
        this._triangles[(row) + '_' + (downleft_x)].draw();
        this._triangles[(row) + '_' + (downleft_x + 1)].draw();
        this._triangles[(row) + '_' + (downleft_x + 2)].draw();

        game.isStarted = !game.check();

    }

    private onAddToStage(event: egret.Event) {
        this.initGraphic();

    }

    refresh() {
        for (let i = 0; i < Game.BOARD_DIM.length; i++) {
            for (let j = 0; j < Game.BOARD_DIM[i]; j++) {
                this._triangles[i + "_" + j].setColor(colorMap[game.Board[i][j]]);
                this._triangles[i + "_" + j].draw();
            }
        }
    }
}

class Main extends eui.UILayer {
    game: Game;
    gameBoard: GameBoard;
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();


    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    level: number;
    timecnt: egret.TextField;
    info: egret.TextField;
    levelSwith: eui.ToggleSwitch;
    timer: egret.Timer;

    protected createGameScene(): void {
        let sky = new egret.Bitmap();
        sky.texture = RES.getRes("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.65);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        this.addChild(topMask);

        let title = new egret.TextField();
        title.text = "旋转方块";
        title.x = 220;
        title.y = 30;
        title.fontFamily = "华文行楷";
        title.size = 45;
        this.addChild(title);

        let status = new egret.TextField();
        status.text = "简单";
        status.x = 80;
        status.y = 120;
        this.addChild(status);

        let abc = new egret.TextField();
        abc.text = "耗时(s) : ";
        abc.x = 380;
        abc.y = 120;
        this.addChild(abc);

        this.timecnt = new egret.TextField();
        this.timecnt.text = "0";
        this.timecnt.x = 500;
        this.timecnt.y = 120;
        this.addChild(this.timecnt);

        let levelSwith = new eui.ToggleSwitch();
        this.levelSwith = levelSwith;
        levelSwith.x = 160;
        levelSwith.y = 120;
        this.addChild(levelSwith);
        levelSwith.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.level = levelSwith.selected ? 2 : 1;
            status.text = levelSwith.selected ? "困难" : "简单";
        }, this);

        let button = new eui.Button();
        button.label = "开始游戏";
        button.x = 250;
        button.y = 110;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        this.gameBoard = new GameBoard();
        this.gameBoard.scaleY = 0.866;
        this.addChild(this.gameBoard);

        let t = new egret.TextField();
        t.text = "目标图形";
        t.x = 60;
        t.y = 820;
        this.addChild(t);

        this.info = new egret.TextField();
        this.info.text = "";
        this.info.textColor = 0xff0000;
        this.info.size = 34;
        this.info.x = 400;
        this.info.y = 820;
        this.addChild(this.info);

        let tbd = new GameBoard(true);
        tbd.x = 150;
        tbd.y = 800;
        tbd.scaleX = 0.4;
        tbd.scaleY = 0.346;
        this.addChild(tbd);

        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
    }

    /**
     * 
     * @summary 开始游戏
     */
    private onButtonClick(e: egret.TouchEvent) {


        game.start(this.levelSwith.selected ? 2 : 1)
        this.gameBoard.refresh();

        this.timecnt.text = '0';
        this.info.text = ""; 

        if (this.timer)
            this.timer.stop();
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
            if (!game.isStarted) { 
                this.info.text = "成功解答!"; 
                this.timer.stop();
                return; 
            }
            let cnt = parseInt(this.timecnt.text);
            this.timecnt.text = '' + (cnt + 1);
        }, this);
        this.timer.start();
    }
}
