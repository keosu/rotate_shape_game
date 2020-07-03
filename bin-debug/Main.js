var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RotateCtrlBt = (function (_super) {
    __extends(RotateCtrlBt, _super);
    function RotateCtrlBt(row, col) {
        var _this = _super.call(this) || this;
        _this._row = row;
        _this._col = col;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    RotateCtrlBt.prototype.onAddToStage = function (event) {
        this.draw();
    };
    RotateCtrlBt.prototype.draw = function () {
        this.graphics.beginFill(0x3377AA, 1);
        this.graphics.lineStyle(2, 0xff77);
        this.graphics.drawCircle(0, 0, 15);
        this.graphics.drawCircle(0, 0, 9);
        this.graphics.endFill();
        this.touchEnabled = true;
    };
    return RotateCtrlBt;
}(egret.Shape));
__reflect(RotateCtrlBt.prototype, "RotateCtrlBt");
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(x1, y1, x2, y2, x3, y3, color) {
        var _this = _super.call(this) || this;
        _this.x1 = x1;
        _this.x2 = x2;
        _this.x3 = x3;
        _this.y1 = y1;
        _this.y2 = y2;
        _this.y3 = y3;
        _this.color = color;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Triangle.prototype.onAddToStage = function (event) {
        this.draw();
    };
    Triangle.prototype.setColor = function (color) {
        this.color = color;
    };
    Triangle.prototype.draw = function () {
        this.graphics.lineStyle(2, 0xffffff);
        this.graphics.beginFill(this.color, 1);
        this.graphics.moveTo(this.x1, this.y1);
        this.graphics.lineTo(this.x2, this.y2);
        this.graphics.lineTo(this.x3, this.y3);
        this.graphics.lineTo(this.x1, this.y1);
        this.graphics.endFill();
    };
    return Triangle;
}(egret.Shape));
__reflect(Triangle.prototype, "Triangle");
var Game = (function () {
    function Game() {
        this._board = Game.target_board;
        this.isStarted = false;
    }
    Object.defineProperty(Game.prototype, "Board", {
        /**
         * @summary Get Game Board
         */
        get: function () {
            return this._board;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game, "target_board", {
        get: function () {
            return [[1, 2, 2, 2, 2, 2, 3],
                [1, 1, 1, 2, 2, 2, 3, 3, 3],
                [1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3],
                [4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6],
                [4, 4, 4, 5, 5, 5, 6, 6, 6],
                [4, 5, 5, 5, 5, 5, 6]];
            ;
        },
        enumerable: true,
        configurable: true
    });
    Game.Vertexes = function () {
        var vertexes = [];
        for (var i = 0; i < Game.VERTEX_DIM.length; i++) {
            var row = [];
            for (var j = 0; j < Game.VERTEX_DIM[i]; j++) {
                var x = Math.abs(i - 3) * 50 + 100 * j;
                row.push([x, i * 100]);
            }
            vertexes.push(row);
        }
        return vertexes;
    };
    /**
     *
     * @summary 根据设定的难度等级开始游戏
     * @level   难度等级：1为简单
     */
    Game.prototype.start = function (level) {
        var step = (level == 1) ? 10 : 50;
        for (var i = 0; i < step; i++) {
            var x = Math.floor(Math.random() * Game.CTRL_DIM.length) + 1;
            var y = Math.floor(Math.random() * Game.CTRL_DIM[x - 1]) + 1;
            this.rotate(x, y);
        }
        this.isStarted = true;
    };
    /**
     * @param row: 1-based
     * @param col: 1-based
     */
    Game.prototype.rotate = function (row, col) {
        egret.log("init click:" + row + " , " + col);
        if (row < 1 || row > Game.CTRL_DIM.length)
            return;
        if (col < 1 || col > Game.CTRL_DIM[row])
            return;
        var upleft_x = (row <= 3) ? col * 2 - 2 : col * 2 - 1;
        var downleft_x = (row <= 2) ? col * 2 - 1 : col * 2 - 2;
        var tmp = this._board[row][downleft_x];
        this._board[row][downleft_x] = this._board[row][downleft_x + 1];
        this._board[row][downleft_x + 1] = this._board[row][downleft_x + 2];
        this._board[row][downleft_x + 2] = this._board[row - 1][upleft_x + 2];
        this._board[row - 1][upleft_x + 2] = this._board[row - 1][upleft_x + 1];
        this._board[row - 1][upleft_x + 1] = this._board[row - 1][upleft_x];
        this._board[row - 1][upleft_x] = tmp;
    };
    Game.prototype.check = function () {
        for (var i = 0; i < Game.target_board.length; i++) {
            for (var j = 0; j < Game.target_board[i].length; j++) {
                if (this._board[i][j] != Game.target_board[i][j]) {
                    egret.log("check faled: " + i + " , " + j + ":" + this._board[i][j] + " vs " + Game.target_board[i][j]);
                    return false;
                }
            }
        }
        egret.log("check OK!");
        return true;
    };
    Game.VERTEX_DIM = [4, 5, 6, 7, 6, 5, 4];
    Game.BOARD_DIM = [7, 9, 11, 11, 9, 7];
    Game.CTRL_DIM = [3, 4, 5, 4, 3];
    return Game;
}());
__reflect(Game.prototype, "Game");
var colorMap = {
    1: 0xFF0000,
    2: 0xFFFF,
    3: 0xFF,
    4: 0xFFFF00,
    5: 0xFF00,
    6: 0xFF00FF
};
var game = new Game();
var GameBoard = (function (_super) {
    __extends(GameBoard, _super);
    function GameBoard(isPreview) {
        if (isPreview === void 0) { isPreview = false; }
        var _this = _super.call(this) || this;
        _this.isPreviw = isPreview;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameBoard.prototype.initGraphic = function () {
        var _this = this;
        this._rotatebts = [];
        this._triangles = {};
        var vertexes = Game.Vertexes();
        for (var i = 0; i < Game.BOARD_DIM.length; i++) {
            for (var j = 0; j < Game.BOARD_DIM[i]; j++) {
                var x1 = void 0, x2 = void 0, x3 = void 0;
                var y1 = void 0, y2 = void 0, y3 = void 0;
                if (i < Game.BOARD_DIM.length / 2 && j % 2 != 0) {
                    _a = vertexes[i][(j - 1) / 2], x1 = _a[0], y1 = _a[1];
                    _b = vertexes[i][(j - 1) / 2 + 1], x2 = _b[0], y2 = _b[1];
                    _c = vertexes[i + 1][(j + 1) / 2], x3 = _c[0], y3 = _c[1];
                }
                else if (i < Game.BOARD_DIM.length / 2 && j % 2 == 0) {
                    _d = vertexes[i][(j) / 2], x1 = _d[0], y1 = _d[1];
                    _e = vertexes[i + 1][(j) / 2 + 1], x2 = _e[0], y2 = _e[1];
                    _f = vertexes[i + 1][(j) / 2], x3 = _f[0], y3 = _f[1];
                }
                else if (i >= Game.BOARD_DIM.length / 2 && j % 2 != 0) {
                    _g = vertexes[i][(j - 1) / 2 + 1], x1 = _g[0], y1 = _g[1];
                    _h = vertexes[i + 1][(j - 1) / 2], x2 = _h[0], y2 = _h[1];
                    _j = vertexes[i + 1][(j - 1) / 2 + 1], x3 = _j[0], y3 = _j[1];
                }
                else if (i >= Game.BOARD_DIM.length / 2 && j % 2 == 0) {
                    _k = vertexes[i][(j) / 2], x1 = _k[0], y1 = _k[1];
                    _l = vertexes[i][(j) / 2 + 1], x2 = _l[0], y2 = _l[1];
                    _m = vertexes[i + 1][(j) / 2], x3 = _m[0], y3 = _m[1];
                }
                var color = colorMap[Game.target_board[i][j]];
                var trian = new Triangle(x1, y1, x2, y2, x3, y3, color);
                trian.y = 250;
                trian.x = 20;
                trian.alpha = 0.4;
                this._triangles[i + '_' + j] = trian;
                this.addChild(trian);
                // this.setChildIndex(trian, 10);
            }
        }
        if (!this.isPreviw) {
            for (var i = 0; i < 5; i++) {
                var n = 5 - Math.abs(i - 2);
                var _loop_1 = function (j) {
                    var x = 100 + Math.abs(i - 2) * 50 + 100 * j;
                    var y = (i + 1) * 100;
                    var bt = new RotateCtrlBt(i + 1, j + 1);
                    bt.x = x + 20;
                    bt.y = y + 250;
                    this_1._rotatebts.push(bt);
                    this_1.addChild(bt);
                    // this.setChildIndex(bt, 100);
                    bt.addEventListener(egret.TouchEvent.TOUCH_TAP, function (src) {
                        bt = src.currentTarget;
                        if (game.isStarted)
                            _this.rotate(bt._row, bt._col);
                    }, this_1);
                };
                var this_1 = this;
                for (var j = 0; j < n; j++) {
                    _loop_1(j);
                }
            }
        }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    };
    GameBoard.prototype.rotate = function (row, col) {
        if (row < 1 || row > Game.CTRL_DIM.length)
            return;
        if (col < 1 || col > Game.CTRL_DIM[row - 1])
            return;
        var upleft_x = (row <= 3) ? col * 2 - 2 : col * 2 - 1;
        var downleft_x = (row <= 2) ? col * 2 - 1 : col * 2 - 2;
        var bd = game.Board;
        var tmp = bd[row][downleft_x];
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
    };
    GameBoard.prototype.onAddToStage = function (event) {
        this.initGraphic();
    };
    GameBoard.prototype.refresh = function () {
        for (var i = 0; i < Game.BOARD_DIM.length; i++) {
            for (var j = 0; j < Game.BOARD_DIM[i]; j++) {
                this._triangles[i + "_" + j].setColor(colorMap[game.Board[i][j]]);
                this._triangles[i + "_" + j].draw();
            }
        }
    };
    return GameBoard;
}(eui.Component));
__reflect(GameBoard.prototype, "GameBoard");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.createGameScene = function () {
        var _this = this;
        var sky = new egret.Bitmap();
        sky.texture = RES.getRes("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.65);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        this.addChild(topMask);
        var title = new egret.TextField();
        title.text = "旋转方块";
        title.x = 220;
        title.y = 30;
        title.fontFamily = "华文行楷";
        title.size = 45;
        this.addChild(title);
        var status = new egret.TextField();
        status.text = "简单";
        status.x = 80;
        status.y = 120;
        this.addChild(status);
        var abc = new egret.TextField();
        abc.text = "耗时(s) : ";
        abc.x = 380;
        abc.y = 120;
        this.addChild(abc);
        this.timecnt = new egret.TextField();
        this.timecnt.text = "0";
        this.timecnt.x = 500;
        this.timecnt.y = 120;
        this.addChild(this.timecnt);
        var levelSwith = new eui.ToggleSwitch();
        this.levelSwith = levelSwith;
        levelSwith.x = 160;
        levelSwith.y = 120;
        this.addChild(levelSwith);
        levelSwith.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.level = levelSwith.selected ? 2 : 1;
            status.text = levelSwith.selected ? "困难" : "简单";
        }, this);
        var button = new eui.Button();
        button.label = "开始游戏";
        button.x = 250;
        button.y = 110;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.gameBoard = new GameBoard();
        this.gameBoard.scaleY = 0.866;
        this.addChild(this.gameBoard);
        var t = new egret.TextField();
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
        var tbd = new GameBoard(true);
        tbd.x = 150;
        tbd.y = 800;
        tbd.scaleX = 0.4;
        tbd.scaleY = 0.346;
        this.addChild(tbd);
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
    };
    /**
     *
     * @summary 开始游戏
     */
    Main.prototype.onButtonClick = function (e) {
        var _this = this;
        game.start(this.levelSwith.selected ? 2 : 1);
        this.gameBoard.refresh();
        this.timecnt.text = '0';
        this.info.text = "";
        if (this.timer)
            this.timer.stop();
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
            if (!game.isStarted) {
                _this.info.text = "成功解答!";
                _this.timer.stop();
                return;
            }
            var cnt = parseInt(_this.timecnt.text);
            _this.timecnt.text = '' + (cnt + 1);
        }, this);
        this.timer.start();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map