import { Application, Container, Sprite, Assets } from "pixi.js";
import { getWindowSizeAsync } from "./get_window_size_async";

/**
 * 画面関連の操作を担当する
 */
export class Screen {
  private gameScreen: Container;  // 別クラスに切り出す
  // TODO: BackgroundLayer -> GameLayer -> UILayer の順に下から3層が重なる
  //       スマホ用: 横持ちはGG風、縦持ちはGB風のスキン、16:10、バーチャルキー常時表示
  //       タブレット用: スーパーゲームボーイ風のスキン、16:10、バーチャルキーは半透明で重ねる
  //       SteamDeck用: 16:10、バーチャルキーなし

  public constructor(private app: Application) {
    this.gameScreen = new Container();
    this.app.stage.addChild(this.gameScreen);

    const sprite = new Sprite(Assets.get("test").textures["grass.png"]);
    this.gameScreen.addChild(sprite);
    this.gameScreen.scale.set(2.0);
  }

  public async onResize() {
    const clientSize = await getWindowSizeAsync();
    this.app.renderer.resize(clientSize.width, clientSize.height);
    const canvas = this.app.view as HTMLCanvasElement;
    canvas.style.width = `${clientSize.width}px`;
    canvas.style.height = `${clientSize.height}px`;
    canvas.style.position = "absolute";
    canvas.style.margin = "auto";
    canvas.style.inset = "0px";
  }
}
