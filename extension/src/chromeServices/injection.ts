import { IDelayer } from '../interfaces/IDelayer.interface';
import { IStatus } from '../interfaces/IStatus.interface';
import { IShortcutService } from './shortcutServices/IShortcutService';
import { ShortcutServiceFactory } from './shortcutServices/ShortcutServiceFactory';
import { ShortcutServiceType } from './shortcutServices/ShortcutServiceType';

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
    service: 50,
  };

  private isPressing: boolean = false;

  private shortcutService!: IShortcutService;

  getButtonBar() {
    return document.querySelector('.SGP0hd.kunNie');
  }

  getMicroButton() {
    return document.querySelector('[jsname="Dg9Wp"] [data-is-muted]') as HTMLButtonElement;
  }

  getCameraButton() {
    return document.querySelector('[jsname="R3GXJb"] [data-is-muted]') as HTMLButtonElement;
  }

  async init() {
    this.startup();
    this.addUI();
    this.runService();

    this.shortcutService = ShortcutServiceFactory.getShortcutService(ShortcutServiceType.LOCAL);
    this.shortcutService.init((message) => console.log(message));
  }

  startup() {
    setTimeout(() => {
      const microButton = this.getMicroButton();
      const cameraButton = this.getCameraButton();

      if (!microButton && !cameraButton) this.startup();

      if (
        microButton &&
        this.startupStatus.turnOffMicroEnabled &&
        this.checkMutedButton(microButton) !== this.startupStatus.turnOffMicroEnabled
      ) {
        microButton.click();
      }

      if (
        cameraButton &&
        this.startupStatus.turnOffCameraEnabled &&
        this.checkMutedButton(cameraButton) !== this.startupStatus.turnOffCameraEnabled
      ) {
        cameraButton.click();
      }
    }, this.delayer.startup);
  }

  checkMutedButton(button: HTMLButtonElement): boolean {
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

    if (this.pushToTalkEnabled) this.shortcutService.enable();
    else this.shortcutService.disable();

    const btn: HTMLButtonElement = document.querySelector(
      `.${this.pushToTalkClassName}`,
    ) as HTMLButtonElement;

    const icon: HTMLImageElement = btn.querySelector('img.btn-icon') as HTMLImageElement;
    icon.src = chrome.runtime.getURL(`icons/auto-mute${!autoMute ? '-disabled' : ''}.png`);
  }

  runService() {
    setTimeout(() => {
      this.runMicroService();

      this.shortcutService.run(
        () => {
          this.isPressing = true;
        },
        () => {
          this.isPressing = false;
        },
      );

      this.runService();
    }, this.delayer.service);
  }

  private async runMicroService() {
    const microButton = this.getMicroButton();
    if (!microButton) return;

    if (!this.pushToTalkEnabled) return;

    const status = this.checkMutedButton(microButton);

    if (this.isPressing) {
      if (status) microButton.click();
    } else {
      if (!status) microButton.click();
    }
  }
}
new InjectScript().init();

export {};
