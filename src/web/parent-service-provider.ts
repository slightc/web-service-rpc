import { ServiceProvider } from "../common/service-provider";

export class ParentServiceProvider extends ServiceProvider {
  private dispose: (() => void)[] = [];
  constructor(child: Window | (() => Window)) {
    super(
      (message) => {
        const w = typeof child === "function" ? child() : child;
        w.postMessage(message, "*");
      },
      (handler) => {
        window.addEventListener("message", handler);
      }
    );
  }

  destroy() {
    this.dispose.forEach((execer) => {
      try {
        execer();
      } catch (error) {}
    });
  }
}
