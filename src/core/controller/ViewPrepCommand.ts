/**
  * 注册mediator
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

  export class ViewPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

    public constructor() {
      super();
    }
    public execute(notification: puremvc.INotification): void {
      var main = GameLayerManager.gameLayer().panelLayer;
      this.facade.registerMediator(new VideoMediator());
      this.facade.registerMediator(new TimeFinishMediator());
      this.facade.registerMediator(new TrimMediator());
      this.facade.registerMediator(new PauseMediator());
      this.facade.registerMediator(new ResultMediator());
      this.facade.registerMediator(new TaskTypeMediator());
      this.facade.registerMediator(new TimeTypeMediator());
      this.facade.registerMediator(new ReadyMediator());
      this.facade.registerMediator(new LoginMediator());
      this.facade.registerMediator(new SetUpMediator());
      this.facade.registerMediator(new TeachMediator());
    }
  }
}