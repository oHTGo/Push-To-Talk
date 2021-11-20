import { IDelayer } from '../interfaces/IDelayer.interface';
import { IStatus } from '../interfaces/IStatus.interface';

class InjectScript {
  private readonly pushToTalkClassName = 'push-to-talk';

  private startupStatus: IStatus = {
    turnOffCameraEnabled: true,
    turnOffMicroEnabled: true,
  };

  private pushToTalkEnabled: boolean = false;

  private delayer: IDelayer = {
    startup: 250,
    ui: 1000,
    service: 500,
  };

  getButtonBar() {
    return document.querySelector('.SGP0hd.kunNie');
  }

  getMicroButton() {
    return document.querySelector('[jsname="Dg9Wp"] [data-is-muted]') as HTMLButtonElement;
  }

  getCameraButton() {
    return document.querySelector('[jsname="R3GXJb"] [data-is-muted]') as HTMLButtonElement;
  }

  delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async init() {
    this.startup();
    this.addUI();
    this.runService();
  }

  startup() {
    setTimeout(() => {
      const microButton = this.getMicroButton();
      const cameraButton = this.getCameraButton();

      if (!microButton && !cameraButton) this.startup();

      if (
        microButton &&
        this.startupStatus.turnOffMicroEnabled &&
        this.checkStatusButton(microButton) !== this.startupStatus.turnOffMicroEnabled
      ) {
        microButton.click();
      }

      if (
        cameraButton &&
        this.startupStatus.turnOffCameraEnabled &&
        this.checkStatusButton(cameraButton) !== this.startupStatus.turnOffCameraEnabled
      ) {
        cameraButton.click();
      }
    }, this.delayer.startup);
  }

  checkStatusButton(button: HTMLButtonElement): boolean {
    const status = button.getAttribute('data-is-muted');
    if (!status) return false;

    return status === 'true';
  }

  async addUI() {
    setTimeout(() => {
      const buttonBar = this.getButtonBar();
      if (!buttonBar) this.addUI();

      const checkUI = document.querySelector(`.${this.pushToTalkClassName}`);
      if (!checkUI) this.addPushToTalkModeButton();
    }, this.delayer.ui);
  }

  createButton(tooltip: string, icon: string, additionalClass: string) {
    const template = document.createElement('template');

    template.innerHTML = `
    <div class="r6xAKc ${additionalClass}">
      <span data-is-tooltip-wrapper="true">
        <button class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc" title="${tooltip}" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">
          <div class="VfPpkd-Bz112c-Jh9lGc"></div>
          <img class="btn-icon" src="${icon}" style="width: 1em; height: 1em;" />
        </button>
        <div class="EY8ABd-OWXEXe-TAWMXe" role="tooltip" aria-hidden="true" id="tt-c9">${tooltip}</div>
      </span>
    </div>`;

    return template.content.firstElementChild;
  }

  addPushToTalkModeButton() {
    const buttonBar = this.getButtonBar();

    if (!buttonBar) {
      return;
    }

    const tooltip = 'Enable push to talk';
    const icon = chrome.runtime.getURL(
      `icons/auto-mute${!this.pushToTalkEnabled ? '-disabled' : ''}.png`,
    );

    const btn: HTMLButtonElement = this.createButton(
      tooltip,
      icon,
      this.pushToTalkClassName,
    ) as HTMLButtonElement;
    btn.addEventListener('click', () => this.onPushToTalkModeButtonClick());

    buttonBar.insertBefore(btn, null);
  }

  onPushToTalkModeButtonClick() {
    const autoMute = (this.pushToTalkEnabled = !this.pushToTalkEnabled);

    const btn: HTMLButtonElement = document.querySelector(
      `.${this.pushToTalkClassName}`,
    ) as HTMLButtonElement;

    const icon: HTMLImageElement = btn.querySelector('img.btn-icon') as HTMLImageElement;
    icon.src = chrome.runtime.getURL(`icons/auto-mute${!autoMute ? '-disabled' : ''}.png`);
  }

  async runService() {
    setTimeout(() => {
      const microButton = this.getMicroButton();
      if (microButton && this.pushToTalkEnabled && !this.checkStatusButton(microButton))
        microButton.click();

      this.runService();
    }, this.delayer.service);
  }
}
new InjectScript().init();

export {};
