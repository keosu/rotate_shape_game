var __reflect=this&&this.__reflect||function(e,t,i){e.__class__=t,i?i.push(t):i=[t],e.__types__=e.__types__?i.concat(e.__types__):i},__extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);i.prototype=t.prototype,e.prototype=new i},__awaiter=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(n,o){function a(e){try{h(r.next(e))}catch(t){o(t)}}function s(e){try{h(r["throw"](e))}catch(t){o(t)}}function h(e){e.done?n(e.value):new i(function(t){t(e.value)}).then(a,s)}h((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function i(e){return function(t){return r([e,t])}}function r(i){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,o&&(a=o[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(o,i[1])).done)return a;switch(o=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,o=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){h.label=i[1];break}if(6===i[0]&&h.label<a[1]){h.label=a[1],a=i;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(i);break}a[2]&&h.ops.pop(),h.trys.pop();continue}i=t.call(e,h)}catch(r){i=[6,r],o=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,o,a,s,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,i){function r(r){t.call(i,r,e)}if(RES.hasRes(e)){var n=RES.getRes(e);n?r(n):RES.getResAsync(e,r,this)}else RES.getResByUrl(e,r,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var NumberCell=function(e){function t(t,i,r){void 0===r&&(r=XColor.DarkGray);var n=e.call(this)||this;return n.value=t,n.size=i,n.color=r,n.addEventListener(egret.Event.ADDED_TO_STAGE,n.onAddToStage,n),n}return __extends(t,e),t.prototype.onAddToStage=function(){var e=XUI.RoundRect(this.size-10,this.size-10,this.color);this.addChild(e);var t=new Label(this.value.toString());t.width=t.height=this.size-10,t.size=this.size/2,this.addChild(t)},t}(egret.Sprite);__reflect(NumberCell.prototype,"NumberCell");var GamePage=function(e){function t(){var t=e.call(this)||this;return t.size=3,t.isGameStart=!1,t.data={},t.addEventListener(eui.UIEvent.COMPLETE,t.onUIComplete,t),t.skinName="resource/ui/GamePage.exml",t.r1.selected=!0,t}return __extends(t,e),t.prototype.onUIComplete=function(){var e=this;this.btNew.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtNewGameClick,this),this.data.cur=0,this.data.best=egret.localStorage.getItem("NPuzzle_best"+this.size)||"99999",this.initGridBox(),this.timer=new egret.Timer(1e3,0),this.timer.addEventListener(egret.TimerEvent.TIMER,function(){e.data.cur++},this)},t.prototype.onBtNewGameClick=function(e){this.r1.selected?this.size=3:this.r2.selected?this.size=4:this.r3.selected&&(this.size=5),this.data.best=egret.localStorage.getItem("NPuzzle_best"+this.size)||"99999",this.data.cur=0,this.game=new NPuzzle(this.size,this.size),this.game.randomMove(500),this.initGridBox(),this.updateGridBox(this.game.cells),this.gameOver.visible=!1,this.timer.start(),this.isGameStart=!0},t.prototype.initGridBox=function(){this.gridBox.removeChildren();var e=this.gridBox.width/this.size;this.grid=new Array(this.size*this.size-1);for(var t=0;t<this.grid.length;t++){this.grid[t]=new NumberCell(t+1,e);var i=t%this.size,r=(t-i)/this.size;this.grid[t].x=i*e,this.grid[t].y=r*e,this.grid[t].touchEnabled=!0,this.grid[t].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNumberClick,this),this.gridBox.addChild(this.grid[t])}},t.prototype.updateGridBox=function(e){for(var t=this.gridBox.width/this.size,i=0;i<e.length;i++)for(var r=e[i],n=0;n<r.length;n++){var o=r[n]-1;0>o||(this.grid[o].x!=n*t||this.grid[o].y!=i*t)&&egret.Tween.get(this.grid[o]).to({x:n*t,y:i*t},100)}},t.prototype.onNumberClick=function(e){if(this.isGameStart){var t=e.currentTarget,i=Math.floor(t.x*this.size/this.gridBox.width),r=Math.floor(t.y*this.size/this.gridBox.width);this.game.move(r,i)&&(this.updateGridBox(this.game.cells),this.game.check()&&(this.isGameStart=!1,this.gameOver.visible=!0,this.timer.reset(),this.data.cur<parseInt(this.data.best)&&egret.localStorage.setItem("NPuzzle_best"+this.size,this.data.cur.toString())))}},t}(eui.Component);__reflect(GamePage.prototype,"GamePage");var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.label=new egret.TextField,t.once(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(t,e),t.prototype.onAddToStage=function(){this.graphics.beginFill(1118481,.8),this.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight),this.graphics.endFill();var e=this.label;e.size=64,e.y=300,e.width=480,e.height=100,e.textAlign="center",this.placeCenter(e,0,-60),this.bar=new ProgressBar;var t=this.bar;this.placeCenter(t)},t.prototype.onProgress=function(e,t){this.label.text="Loading..."+e+"/"+t,this.bar.value=100*e/t},t.prototype.placeCenter=function(e,t,i){void 0===t&&(t=0),void 0===i&&(i=0);var r=this.stage.stageWidth,n=this.stage.stageHeight;e.x=(r-e.width)/2+t,e.y=(n-e.height)/2+i,this.addChild(e)},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()},egret.registerImplementation("eui.IAssetAdapter",new AssetAdapter),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.start()["catch"](function(e){console.log(e)})},t.prototype.start=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.loadResource()];case 1:return e.sent(),this.addChild(new GamePage),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t,i=this;return __generator(this,function(r){switch(r.label){case 0:return r.trys.push([0,4,,5]),e=new LoadingUI,this.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return r.sent(),[4,new Promise(function(e,t){var r=new eui.Theme("resource/default.thm.json",i.stage);r.addEventListener(eui.UIEvent.COMPLETE,function(){e()},i)})];case 2:return r.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return r.sent(),egret.Tween.get(e).to({alpha:0},300).call(function(){i.removeChild(e)}),[3,5];case 4:return t=r.sent(),console.error(t),[3,5];case 5:return[2]}})})},t}(eui.UILayer);__reflect(Main.prototype,"Main");var NPuzzle=function(){function e(e,t){this.rows=e,this.cols=t,this.cells=new Array(e);for(var i=0;e>i;i++){this.cells[i]=new Array(t);for(var r=0;t>r;r++)this.cells[i][r]=i*t+r+1}this.cells[e-1][t-1]=0,this.zero=[e-1,t-1]}return e.prototype.neighbors=function(){var e=[],t=this.zero[0],i=this.zero[1];if(i>0){var r=JSON.parse(JSON.stringify(this.cells));r[t][i]=r[t][i-1],r[t][i-1]=0,e.push(r)}if(i<this.cols-1){var n=JSON.parse(JSON.stringify(this.cells));n[t][i]=n[t][i+1],n[t][i+1]=0,e.push(n)}if(t>0){var o=JSON.parse(JSON.stringify(this.cells));o[t][i]=o[t-1][i],o[t-1][i]=0,e.push(o)}if(t<this.rows-1){var a=JSON.parse(JSON.stringify(this.cells));a[t][i]=a[t+1][i],a[t+1][i]=0,e.push(a)}return e},e.prototype.move=function(e,t){var i=0;if(e===this.zero[0]){if(this.zero[1]>t&&t>=0){for(var r=this.zero[1];r>t;r--)this.cells[e][r]=this.cells[e][r-1],i++;this.cells[e][t]=0,this.zero[1]=t}else if(this.zero[1]<t&&t<this.cols){for(var r=this.zero[1];t>r;r++)this.cells[e][r]=this.cells[e][r+1],i++;this.cells[e][t]=0,this.zero[1]=t}}else if(t===this.zero[1])if(this.zero[0]>e&&e>=0){for(var r=this.zero[0];r>e;r--)this.cells[r][t]=this.cells[r-1][t],i++;this.cells[e][t]=0,this.zero[0]=e}else if(this.zero[0]<e&&e<this.rows){for(var r=this.zero[0];e>r;r++)this.cells[r][t]=this.cells[r+1][t],i++;this.cells[e][t]=0,this.zero[0]=e}return i},e.prototype.randomMove=function(e){for(var t=[[-1,0],[1,0],[0,-1],[0,1]],i=0;e>i;i++)for(var r=this.zero[0],n=this.zero[1],o=Math.floor(4*Math.random());0===this.move(r+t[o][0],n+t[o][1]);)o=(o+1)%4},e.prototype.check=function(){for(var e=0;e<this.rows-1;e++)for(var t=0;t<this.cols;t++)if(this.cells[e][t]!=e*this.cols+t+1)return!1;for(var i=this.rows-1,t=0;t<this.cols-1;t++)if(this.cells[i][t]!=i*this.cols+t+1)return!1;return!0},e}();__reflect(NPuzzle.prototype,"NPuzzle");var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,i,r){function n(e){t.call(r,e)}function o(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),i.call(r))}var a=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){t.call(r,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(e,i){window.JSONParseClass.setData(e),egret.callLater(function(){t.call(r,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(e.indexOf(".exml")>-1){var s=e.split("/");s.pop();var h=s.join("/")+"_EUI.json";generateJSON.paths[e]?egret.callLater(function(){t.call(r,generateJSON.paths[e])},this):RES.getResByUrl(h,function(i){window.JSONParseClass.setData(i),egret.callLater(function(){t.call(r,generateJSON.paths[e])},a)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){t.call(r,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(e,n,this,RES.ResourceItem.TYPE_TEXT)},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var TextField=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.TextField);__reflect(TextField.prototype,"TextField");var Sprite=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Sprite);__reflect(Sprite.prototype,"Sprite");var Shape=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Shape);__reflect(Shape.prototype,"Shape");var DisplayObject=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.DisplayObject);__reflect(DisplayObject.prototype,"DisplayObject");var DisplayObjectContainer=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.DisplayObjectContainer);__reflect(DisplayObjectContainer.prototype,"DisplayObjectContainer");var Point=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Point);__reflect(Point.prototype,"Point");var Rectangle=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Rectangle);__reflect(Rectangle.prototype,"Rectangle");var Bitmap=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Bitmap);__reflect(Bitmap.prototype,"Bitmap");var BitmapData=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.BitmapData);__reflect(BitmapData.prototype,"BitmapData");var Stage=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Stage);__reflect(Stage.prototype,"Stage");var Tween=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Tween);__reflect(Tween.prototype,"Tween");var Ease=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.Ease);__reflect(Ease.prototype,"Ease");var XColor=function(){function e(){}return Object.defineProperty(e,"random",{get:function(){return 16777215*Math.random()},enumerable:!0,configurable:!0}),e.getRandomArray=function(t){for(var i=[],r=0;t>r;r++)i.push(e.random);return i},e.setColorBrightness=function(e,t){var i=(e>>16)+t;i>255?i=255:0>i&&(i=0);var r=(e>>8&255)+t;r>255?r=255:0>r&&(r=0);var n=(255&e)+t;return n>255?n=255:0>n&&(n=0),n|r<<8|i<<16},e.LightPink=16758465,e.Pink=16761035,e.Crimson=14423100,e.LavenderBlush=16773365,e.PaleVioletRed=14381203,e.HotPink=16738740,e.DeepPink=16716947,e.MediumVioletRed=13047173,e.Orchid=14315734,e.Thistle=14204888,e.Plum=14524637,e.Violet=15631086,e.Magenta=16711935,e.Fuchsia=16711935,e.DarkMagenta=9109643,e.Purple=8388736,e.MediumOrchid=12211667,e.DarkVoilet=9699539,e.DarkOrchid=10040012,e.Indigo=4915330,e.BlueViolet=9055202,e.MediumPurple=9662683,e.MediumSlateBlue=8087790,e.SlateBlue=6970061,e.DarkSlateBlue=4734347,e.Lavender=15132410,e.GhostWhite=16316671,e.Blue=255,e.MediumBlue=205,e.MidnightBlue=1644912,e.DarkBlue=139,e.Navy=128,e.RoyalBlue=4286945,e.CornflowerBlue=6591981,e.LightSteelBlue=11584734,e.LightSlateGray=7833753,e.SlateGray=7372944,e.DoderBlue=2003199,e.AliceBlue=15792383,e.SteelBlue=4620980,e.LightSkyBlue=8900346,e.SkyBlue=8900331,e.DeepSkyBlue=49151,e.LightBlue=11393254,e.PowDerBlue=11591910,e.CadetBlue=6266528,e.Azure=15794175,e.LightCyan=14811135,e.PaleTurquoise=11529966,e.Cyan=65535,e.Aqua=65535,e.DarkTurquoise=52945,e.DarkSlateGray=3100495,e.DarkCyan=35723,e.Teal=32896,e.MediumTurquoise=4772300,e.LightSeaGreen=2142890,e.Turquoise=4251856,e.Auqamarin=8388522,e.MediumAquamarine=64154,e.MediumSpringGreen=16121850,e.MintCream=65407,e.SpringGreen=3978097,e.SeaGreen=3050327,e.Honeydew=15794160,e.LightGreen=9498256,e.PaleGreen=10025880,e.DarkSeaGreen=9419919,e.LimeGreen=3329330,e.Lime=65280,e.ForestGreen=2263842,e.Green=32768,e.DarkGreen=25600,e.Chartreuse=8388352,e.LawnGreen=8190976,e.GreenYellow=11403055,e.OliveDrab=5597999,e.Beige=7048739,e.LightGoldenrodYell=16448210,e.Ivory=16777200,e.LightYellow=16777184,e.Yellow=16776960,e.Olive=8421376,e.DarkKhaki=12433259,e.LemonChiffon=16775885,e.PaleGodenrod=15657130,e.Khaki=15787660,e.Gold=16766720,e.Cornislk=16775388,e.GoldEnrod=14329120,e.FloralWhite=16775920,e.OldLace=16643558,e.Wheat=16113331,e.Moccasin=16770229,e.Orange=16753920,e.PapayaWhip=16773077,e.BlanchedAlmond=16772045,e.NavajoWhite=16768685,e.AntiqueWhite=16444375,e.Tan=13808780,e.BrulyWood=14596231,e.Bisque=16770244,e.DarkOrange=16747520,e.Linen=16445670,e.Peru=13468991,e.PeachPuff=16767673,e.SandyBrown=16032864,e.Chocolate=13789470,e.SaddleBrown=9127187,e.SeaShell=16774638,e.Sienna=10506797,e.LightSalmon=16752762,e.Coral=16744272,e.OrangeRed=16729344,e.DarkSalmon=15308410,e.Tomato=16737095,e.MistyRose=16770273,e.Salmon=16416882,e.Snow=16775930,e.LightCoral=15761536,e.RosyBrown=12357519,e.IndianRed=13458524,e.Red=16711680,e.Brown=10824234,e.FireBrick=11674146,e.DarkRed=9109504,e.Maroon=8388608,e.White=16777215,e.WhiteSmoke=16119285,e.Gainsboro=14474460,e.LightGrey=13882323,e.Silver=12632256,e.DarkGray=11119017,e.Gray=8421504,e.DimGray=6908265,e.Black=0,e}();__reflect(XColor.prototype,"XColor");var Label=function(e){function t(t,i,r){void 0===i&&(i=""),void 0===r&&(r="");var n=e.call(this)||this;return n.pre="",n.post="",n.str=t,n.pre=i,n.post=r,n.text=i+t+r,n.textAlign=egret.HorizontalAlign.CENTER,n.verticalAlign=egret.VerticalAlign.MIDDLE,n.multiline=!0,n}return __extends(t,e),Object.defineProperty(t.prototype,"intVal",{get:function(){return parseInt(this.str)},set:function(e){this.str=e.toString(),this.text=this.pre+this.str+this.post},enumerable:!0,configurable:!0}),t}(egret.TextField);__reflect(Label.prototype,"Label");var ButtonShape;!function(e){e[e.SHP_ROUNDRECT=0]="SHP_ROUNDRECT",e[e.SHP_RECT=1]="SHP_RECT",e[e.SHP_CIRCLE=2]="SHP_CIRCLE"}(ButtonShape||(ButtonShape={}));var Button=function(e){function t(i,r,n,o){void 0===r&&(r=t.defWidth),void 0===n&&(n=t.defHeight),void 0===o&&(o=t.defColor);var a=e.call(this)||this;return a.width=r,a.height=n,a.bgColor=o,a.label=new Label(i),a.label.width=r,a.label.height=n,a.bg=XUI.RoundRect(r,n,o),a.shape=ButtonShape.SHP_ROUNDRECT,a.once(egret.Event.ADDED_TO_STAGE,a.addToStage,a),a}return __extends(t,e),t.prototype.addToStage=function(){this.enable(),this.draw()},t.prototype.draw=function(){this.removeChildren(),this.addChild(this.bg),this.addChild(this.label)},t.prototype.enable=function(){this.disable(),this.touchEnabled=!0,this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this),this.setGray(!1)},t.prototype.disable=function(){this.touchEnabled=!1,this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this),this.stage&&this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this),this.setGray(!0)},Object.defineProperty(t.prototype,"size",{set:function(e){this.width=e[0]||t.defWidth,this.height=e[1]||t.defHeight,this.label.width=this.shape==ButtonShape.SHP_CIRCLE?this.height:this.width,this.label.height=this.height,this.draw()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textColor",{set:function(e){this.label.textColor=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"text",{get:function(){return this.label.text},set:function(e){this.label.text=e},enumerable:!0,configurable:!0}),t.prototype.setStyle=function(e,t,i,r,n){switch(void 0===t&&(t=XColor.DeepSkyBlue),void 0===i&&(i=!1),void 0===r&&(r=250),void 0===n&&(n=60),e){case ButtonShape.SHP_ROUNDRECT:i?this.bg=XUI.LineRoundRect(r,n,t):this.bg=XUI.RoundRect(r,n,t);break;case ButtonShape.SHP_RECT:i?this.bg=XUI.LineRect(r,n,t):this.bg=XUI.Rect(r,n,t);break;case ButtonShape.SHP_CIRCLE:i?(this.bg=XUI.LineCircle(n,t),this.bg.x=this.bg.y=n/2):(this.bg=XUI.Circle(n,t),this.bg.x=this.bg.y=n/2)}this.shape=e,this.size=[r,n],this.bgColor=t,this.draw()},t.prototype.onTouch=function(e){e.type==egret.TouchEvent.TOUCH_BEGIN?(this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this),this.scaleX=this.scaleY=.95,this.x+=2,this.y+=2):(this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this),this.scaleX=this.scaleY=1,this.x-=2,this.y-=2)},t.prototype.setGray=function(e){e?this.filters=[new egret.ColorMatrixFilter([.3,.6,.08,0,0,.3,.6,.08,0,0,.3,.6,.08,0,0,0,0,0,1,0])]:this.filters=null},t.defWidth=250,t.defHeight=60,t.defColor=XColor.DeepSkyBlue,t}(DisplayObjectContainer);__reflect(Button.prototype,"Button");var Switch=function(e){function t(t){void 0===t&&(t=!0);var i=e.call(this,"")||this;return i.isEnable=!0,i.isEnable=t,i.isEnable?i.bg=XUI.Switch(XColor.SkyBlue,XColor.White,1):i.bg=XUI.Switch(XColor.Gray,XColor.White,0),i}return __extends(t,e),t.prototype.onTouch=function(e){e.type==egret.TouchEvent.TOUCH_BEGIN&&(this.isEnable=!this.isEnable,this.isEnable?this.bg=XUI.Switch(XColor.SkyBlue,XColor.White,1):this.bg=XUI.Switch(XColor.Gray,XColor.White,0),this.draw())},t}(Button);__reflect(Switch.prototype,"Switch");var ProgressBar=function(e){function t(t,i){void 0===t&&(t=1e3),void 0===i&&(i=50);var r=e.call(this)||this;return r.minVal=0,r.maxVal=100,r.curVal=0,r.color=XColor.Purple,r.width=t,r.height=i,r.once(egret.Event.ADDED_TO_STAGE,r.onAddToStage,r),r}return __extends(t,e),t.prototype.onAddToStage=function(){this.bg=XUI.LineRect(this.width,this.height,XColor.Gray),this.fg=XUI.Rect(1,this.height,this.color),this.addChild(this.bg),this.addChild(this.fg)},Object.defineProperty(t.prototype,"width",{get:function(){return this.bg.width},set:function(e){this.bg=XUI.LineRect(e,this.height,XColor.Gray)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"value",{get:function(){return this.curVal},set:function(e){this.curVal=e;var t=this.bg.width*(e-this.minVal)/(this.maxVal-this.minVal);this.removeChild(this.fg),this.fg=XUI.Rect(t,this.height,this.color),this.addChild(this.fg)},enumerable:!0,configurable:!0}),t}(DisplayObjectContainer);__reflect(ProgressBar.prototype,"ProgressBar");var Tip=function(e){function t(t,i){void 0===i&&(i=2e3);var r=e.call(this)||this;return r.text=new Label(t),r.closeTime=i,r.addEventListener(egret.Event.ADDED_TO_STAGE,r.onAddToStage,r),r}return __extends(t,e),t.prototype.onAddToStage=function(e){var t=XUI.RoundRect(300,60,XColor.Gray);this.addChild(t),this.text.x=(300-this.text.width)/2,this.text.y=(60-this.text.height)/2,this.addChild(this.text),this.x=(this.stage.stageWidth-this.width)/2,this.y=(this.stage.stageHeight-this.height)/2,Tween.get(this).to({alpha:.9},200).wait(200).to({alpha:0},this.closeTime-200).call(this.callback,this)},t.prototype.callback=function(){Tween.removeTweens(this),this.parent&&this.parent.removeChild(this)},t}(egret.Sprite);__reflect(Tip.prototype,"Tip");var XUI=function(){function e(){}return e.TickMark=function(e){void 0===e&&(e=XColor.Green);var t=new Sprite,i=t.graphics;return i.beginFill(3355443,.7),i.lineStyle(2,2434341),i.drawCircle(0,0,20),i.endFill(),i.lineStyle(4,e),i.moveTo(-10,-3),i.lineTo(-2,8),i.lineTo(10,-8),t},e.ErrorMark=function(e){void 0===e&&(e=XColor.Red);var t=new Sprite,i=t.graphics;return i.beginFill(3355443,.7),i.lineStyle(2,2434341),i.drawCircle(0,0,20),i.endFill(),i.lineStyle(4,e),i.moveTo(-8,-8),i.lineTo(8,8),i.moveTo(-8,8),i.lineTo(8,-8),t},e.LineRect=function(e,t,i,r,n,o){void 0===i&&(i=0),void 0===r&&(r=1),void 0===n&&(n=0),void 0===o&&(o=0);var a=new Sprite;return a.graphics.lineStyle(r,i),a.graphics.drawRect(n,o,e,t),a.graphics.endFill(),a},e.RoundRect=function(e,t,i,r,n,o,a){void 0===i&&(i=0),void 0===r&&(r=25),void 0===n&&(n=25),void 0===o&&(o=0),void 0===a&&(a=0);var s=new Sprite;return s.graphics.beginFill(i),s.graphics.drawRoundRect(o,a,e,t,r,n),s.graphics.endFill(),s},e.LineRoundRect=function(e,t,i,r,n,o,a){void 0===i&&(i=0),void 0===r&&(r=25),void 0===n&&(n=25),void 0===o&&(o=0),void 0===a&&(a=0);var s=new Sprite;return s.graphics.lineStyle(1,i),s.graphics.drawRoundRect(o,a,e,t,r,n),s},e.Circle=function(e,t,i,r){void 0===t&&(t=0),void 0===i&&(i=0),void 0===r&&(r=0);var n=new Sprite;return n.graphics.beginFill(t),n.graphics.drawCircle(i,r,e),n.graphics.endFill(),n},e.Switch=function(t,i,r){void 0===t&&(t=16777215),void 0===i&&(i=0),void 0===r&&(r=0);var n=e.RoundRect(80,50,t,60,60);return n.addChild(e.Circle(22,i,0==r?25:55,25)),n},e.LineCircle=function(e,t,i,r,n){void 0===t&&(t=0),void 0===i&&(i=1),void 0===r&&(r=0),void 0===n&&(n=0);var o=new Sprite;return o.graphics.lineStyle(i,t),o.graphics.drawCircle(r,n,e),o.graphics.endFill(),o},e.MatrixRect=function(e,t,i,r,n){void 0===i&&(i=0),void 0===r&&(r=0),void 0===n&&(n=0);var o=new Sprite,a=new egret.Matrix;return a.createGradientBox(e,t,Math.PI*n,0,0),o.graphics.beginGradientFill(egret.GradientType.LINEAR,[i,r],[1,1],[0,255],a),o.graphics.drawRect(0,0,e,t),o.graphics.endFill(),o},e.Rect=function(e,t,i,r,n){void 0===i&&(i=0),void 0===r&&(r=0),void 0===n&&(n=0);var o=new Sprite;return o.graphics.beginFill(i),o.graphics.drawRect(r,n,e,t),o.graphics.endFill(),o},e.RectAndX=function(e,t,i,r,n){void 0===i&&(i=0),void 0===r&&(r=0),void 0===n&&(n=0);var o=this.Rect(e,t,i,r,n);return o.addChild(this.CloseButton(e,t,i,1,r,n)),o},e.CloseButton=function(e,t,i,r,n,o){void 0===i&&(i=0),void 0===r&&(r=1),void 0===n&&(n=0),void 0===o&&(o=0);var a=new Sprite,s=new Sprite;s.graphics.lineStyle(r,i),s.graphics.moveTo(0,0),s.graphics.lineTo(e,t);var h=new Sprite;return h.graphics.lineStyle(r,i),h.graphics.moveTo(e,0),h.graphics.lineTo(0,t),a.addChild(s),a.addChild(h),a},e.Polygon=function(e,t,i,r){void 0===e&&(e=3),void 0===t&&(t=10),void 0===i&&(i=0),void 0===r&&(r=0);var n=new Sprite;n.rotation=r,n.graphics.beginFill(i);for(var o=0;e>=o;o++){var a=Math.cos(o*(360/e)*Math.PI/180)*t,s=Math.sin(o*(360/e)*Math.PI/180)*t;0==o?n.graphics.moveTo(a,s):n.graphics.lineTo(a,s)}return n.graphics.endFill(),n},e.ArrowRoundRect=function(e,t,i,r,n){void 0===r&&(r=0),void 0===n&&(n=0);var o=new Sprite;o.addChild(this.RoundRect(e,t,i));var a=this.Polygon(3,e/3,r,30+n);return a.x=o.width>>1,a.y=o.height>>1,o.addChild(a),o},e.ScrollLineBar=function(e,t,i){for(var r=new Sprite,n=t/3,o=0;3>o;o++){var a=this.Rect(e,1,i,0,o*n);r.addChild(a)}return r},e.AddRoundRect=function(e,t,i){var r=new Sprite;r.addChild(this.RoundRect(e,t,i));var n=this.Rect(e/2,2,0,e/4,t/2-1),o=this.Rect(2,t/2,0,e/2-1,t/4);return r.addChild(n),r.addChild(o),r},e.RemoveRoundRect=function(e,t,i){var r=new Sprite;r.addChild(this.RoundRect(e,t,i));var n=this.Rect(e/2,2,0,e/4,t/2-1);return r.addChild(n),r},e.RoundRectText=function(e,t,i,r){void 0===r&&(r="click");var n=new Sprite;n.addChild(this.RoundRect(e,t,i));var o=new TextField;return o.name="text",o.text=r,o.x=n.width-o.width>>1,o.y=n.height-o.height>>1,n.addChild(o),n},e.CheckBoxRect=function(e,t,i){void 0===e&&(e=16777215),void 0===t&&(t=0),void 0===i&&(i=0);var r=new Sprite;if(r.addChild(this.Rect(40,40,e)),1==i){var n=new Sprite;n.graphics.beginFill(t),n.graphics.moveTo(0,20),n.graphics.lineTo(20,36),n.graphics.lineTo(44,8),n.graphics.lineTo(36,0),n.graphics.lineTo(20,18),n.graphics.lineTo(12,8),n.graphics.lineTo(0,20),r.addChild(n)}return r},e.RadioCircle=function(e,t,i){void 0===e&&(e=16777215),void 0===t&&(t=0),void 0===i&&(i=0);var r=new Sprite;if(r.addChild(this.Circle(16,e,16,16)),r.graphics.lineStyle(1,0),1==i){var n=this.Circle(8,t,16,16);r.addChild(n)}return r},e.Gridding=function(e,t){void 0===t&&(t=0);var i=new Sprite;i.graphics.lineStyle(.1,t);for(var r=e.width/e.x,n=e.height/e.y,o=0;o<e.x;o++)i.graphics.moveTo(0,o*n),i.graphics.lineTo(e.width,o*n);for(var o=0;o<e.y;o++)i.graphics.moveTo(o*r,0),i.graphics.lineTo(o*r,e.height);return i},e.Heart=function(e,t){void 0===e&&(e=15),void 0===t&&(t=16711680);var i=new Sprite;return i.graphics.beginFill(t),i.graphics.moveTo(0,0),i.graphics.lineTo(0,2*-e),i.graphics.cubicCurveTo(e,2.5*-e,2*e,1.5*-e,0,0),i.graphics.moveTo(0,0),i.graphics.lineTo(0,2*-e),i.graphics.cubicCurveTo(-e,2.5*-e,2*-e,1.5*-e,0,0),i.graphics.endFill(),i.anchorOffsetX=-i.width/2,i.anchorOffsetY=-i.height,i},e}();__reflect(XUI.prototype,"XUI");var Theme=function(){function e(){}return Object.defineProperty(e,"btnNormal",{get:function(){return XUI.RoundRect(200,60,e.btnColorNormal)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"btnDown",{get:function(){return XUI.RoundRect(200,60,e.btnColorDown)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"switchOn",{get:function(){return XUI.Switch(e.btnColorNormal,XColor.White,1)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"switchOff",{get:function(){return XUI.Switch(e.swithColorOff,XColor.White)},enumerable:!0,configurable:!0}),e.btnColorNormal=XColor.DeepSkyBlue,e.btnColorDown=XColor.LightSteelBlue,e.swithColorOff=XColor.Gray,e}();__reflect(Theme.prototype,"Theme");var MoonEvent=function(e){function t(t,i,r){void 0===t&&(t=""),void 0===i&&(i=null),void 0===r&&(r=null);var n=e.call(this)||this;return n.type=t,n.data=i,n.currentTarget=r,n}return __extends(t,e),t.MOUSE_OVER="event-over",t.MOUSE_OUT="event-out",t.MOUSE_DOWN="event-down",t.MOUSE_MOVE="event-move",t.MOUSE_UP="event-up",t.CLICK="event-click",t.CHANGE="change",t.COMPLETE="complete",t.ERROR="error",t.RENDER_COMPLETE="render complete",t.UPDATE="update",t.START="start",t.MOVE="move",t.OVER="over",t.PAUSE="pause",t.STOP="stop",t.PLAY="play",t.OPEN="open",t.CLOSE="close",t}(egret.EventDispatcher);__reflect(MoonEvent.prototype,"MoonEvent");var Container=function(e){function t(){var t=e.call(this)||this;return t.dataEvent=new Object,t.init(),t.once(egret.Event.ADDED_TO_STAGE,t.addToStage,t),t}return __extends(t,e),t.prototype.addToStage=function(){this.render()},t.prototype.init=function(){},t.prototype.render=function(){this.stageWidth=this.stage.stageWidth,this.stageHeight=this.stage.stageHeight},t.prototype.createBgGradientFill=function(e,t){void 0===e&&(e=XColor.Blue),void 0===t&&(t=XColor.BlueViolet);var i=this.stageWidth,r=this.stageHeight,n=new egret.Matrix;n.createGradientBox(2*i,2*r,Math.PI/2);var o=new Sprite;return o.graphics.beginGradientFill(egret.GradientType.RADIAL,[e,t],[1,1],[0,255],n),o.graphics.drawRect(0,0,i,r),this.addChild(o),o},t.prototype.dispEvent=function(e,t,i){if(void 0===t&&(t=null),void 0===i&&(i=null),this.dataEvent){var r=this.dataEvent[e];if(null!=r){var n=new MoonEvent;n.currentTarget=this,n.data=t,n.type=e,n.dataType=i,r["this"]?r.apply(r["this"],[n]):r(n)}}},t.prototype.addEvent=function(e,t,i){void 0===i&&(i=null),this.dataEvent&&null==this.dataEvent[e]&&(t["this"]=i,this.dataEvent[e]=t)},t.prototype.removeEvent=function(e,t){this.dataEvent&&this.dataEvent[e]&&delete this.dataEvent[e]},t.prototype.removeFromParent=function(e){void 0===e&&(e=!1);var t=this.parent;e&&this.dispose(),t&&t.contains(this)&&t.removeChild(this),t=null},t.prototype.removeChildren=function(e){for(void 0===e&&(e=!1);this.numChildren>0;)this.removeChildIndex(0,e)},t.prototype.removeChildIndex=function(e,i){if(e>=0||e<this.numChildren){var r=this.getChildAt(e);if(r instanceof t)r.removeFromParent(i);else{var n=this.getChildAt(e);n.parent&&n.parent.removeChild(n)}}},t.prototype.dispose=function(){this.removeChildren(!0),this.dataEvent=null,this.stageWidth=null,this.stageHeight=null},t}(egret.DisplayObjectContainer);__reflect(Container.prototype,"Container");var Layout=function(){function e(){}return e.placeCenter=function(e,t){t.x=(e.stage.stageWidth-t.width)/2,t.y=(e.stage.stageHeight-t.height)/2,e.addChild(t)},e.place=function(e,t,i,r){t.x=i,t.y=r,e.addChild(t)},e}();__reflect(Layout.prototype,"Layout");var Dialog=function(e){function t(t){var i=e.call(this)||this;return i.bgColor=XColor.LightBlue,i.bgAlpha=.9,i.dlgBorderColor=XColor.White,i.dlgBgColor=XColor.Gray,i.dlgWidth=400,i.dglHeight=300,i.text=new Label(t),i}return __extends(t,e),t.prototype.init=function(){},t.prototype.render=function(){var e=this;this.touchEnabled=!0;var t=XUI.Rect(this.stage.stageWidth,this.stage.stageHeight,this.bgColor);t.alpha=this.bgAlpha,this.addChild(t);var i=XUI.LineRoundRect(this.dlgWidth,this.dglHeight,this.dlgBorderColor);Layout.placeCenter(this,i);var r=XUI.RoundRect(this.dlgWidth,this.dglHeight,this.dlgBgColor);Layout.placeCenter(this,r),this.dlgBG=r;var n=this.text;n.width=400,n.height=200,r.addChild(n);var o=new Button("确定");o.x=(r.width-o.width)/2,o.y=220,r.addChild(o),o.addEventListener(egret.TouchEvent.TOUCH_TAP,function(t){e.parent.removeChild(e)},this)},t}(Container);__reflect(Dialog.prototype,"Dialog");