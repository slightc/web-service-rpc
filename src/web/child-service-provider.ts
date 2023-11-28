import { ServiceProvider } from "../common/service-provider";

export class ChildServiceProvider extends ServiceProvider {
  private dispose: (() => void)[] = [];
  constructor(parent: Window) {
    super(
      (message) => parent.postMessage(message, "*"),
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
