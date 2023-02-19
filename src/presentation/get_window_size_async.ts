import UAParser from "ua-parser-js";

export async function getWindowSizeAsync(): Promise<{
  width: number;
  height: number;
}> {
  return new Promise((resolve) => {
    const timerId = window.setInterval(() => {
      // モバイルでは innerWidth/innerHeight でうまく値が取れないので window.screen を使用
      if (!!window.innerWidth && !!window.innerHeight) {
        window.clearInterval(timerId);

        let size = {
          width: 0,
          height: 0,
        };

        const parser = new UAParser();

        if (parser.getOS().name !== "iOS" && parser.getDevice().type === "mobile") {
          size.width = window.screen.width;
          size.height = window.screen.height;
        } else {
          size.width = window.innerWidth;
          size.height = window.innerHeight;
        }

        resolve(size);
      }
    }, 200);
  });
}
