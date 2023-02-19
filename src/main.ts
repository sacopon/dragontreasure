import init, { greet, greet_to_pixi } from "../wasm/pkg";
import { Application, Text, Assets, Sprite, Texture, BaseTexture } from "pixi.js";
import { disableOuterCanvasTouchEvent } from "./presentation/disable_touch_event";
import { Screen } from "./presentation/screen";

// Rust 側から呼び出すことが可能なメソッドを設定する
const bindFunction = (name: string, func: any) => {
  (window as any)[name] = func;
}

class Main {
  private screen: Screen | null = null;

  public async run() {

    // TypeScript からコンソールへの出力
    console.log("Hello from TypeScript");
    // コンソールへの出力メソッドをWebAssembly(Rust)から呼び出せるようにする
    bindFunction("jsConsoleLog", (msg: string) => console.log(msg));
  
    // wasm 初期化
    await init();
    // wasm 呼び出し(コンソールへの出力)
    greet("WebAssembly");
  
    // pixi.js 初期化
    const app = new Application({
      backgroundColor: 0xFFFFFF,
    });
    document.body.appendChild(app.view as unknown as Node);
    disableOuterCanvasTouchEvent();

    // フォントの読み込み
    const font = new FontFace(
      "PixelMplus12",
      "url(/PixelMplus12-Bold.ttf)",
      { style: "normal", weight: "bold" }
    );
    await font.load();
    document.fonts.add(font);
  
    // 画像のロード/描画
    Assets.addBundle("resources", {
      cat: "/cat.jpg",
      test: "/test.json",
    });
    await Assets.loadBundle("resources");
    const background = new Sprite(new Texture(Assets.get("cat") as BaseTexture));
    app.stage.addChild(background);

    // pixi.js のキャンバスへの文字列描画
    const text1 = new Text("Hello pixi.js!!", { fontFamily: "PixelMplus12", fontWeight: "bold" });
    app.stage.addChild(text1);
  
    const text2 = new Text("", { fontFamily: "PixelMplus12", fontWeight: "bold" });
    text2.y = 30;
    app.stage.addChild(text2);
    // pixi.js のキャンバスへの文字列描画メソッドをWebAssembly(Rust)から呼び出せるようにする
    bindFunction("jsPrintPixiText", (msg: string) => { text2.text = msg; });
    // wasm 呼び出し(pixi.js のキャンバスへの文字列描画)
    greet_to_pixi("pixi.js");

    this.screen = new Screen(app);
    window.addEventListener("resize", () => this.screen!.onResize());
    // 最初の描画
    window.dispatchEvent(new Event("resize"));
  }

  public static async run() {
    const instance = new Main();
    await instance.run();
  }
}

window.addEventListener("DOMContentLoaded", Main.run);
