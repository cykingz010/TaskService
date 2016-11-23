var DialoguePanel = (function () {
    function DialoguePanel(stage, taskService) {
        this.backColor = 0xE3CF57;
        this.panelX = 50;
        this.panelY = 200;
        this.panelWidth = 300;
        this.panelHeight = 500;
        this.taskNameTextFieldText = "";
        this.taskNameTextFieldX = this.panelWidth / 2 - 50;
        this.taskNameTextFieldY = 50;
        this.taskNameTextFieldWidth = 200;
        this.taskNameTextFieldColor = 0x000000;
        this.taskInformationTextFieldText = "";
        this.taskInformationTextFieldX = 10;
        this.taskInformationTextFieldY = 100;
        this.taskInformationTextFieldWidth = 220;
        this.taskInformationTextFieldColor = 0x000000;
        this.buttonColor = 0x802A2A;
        this.buttonX = this.panelWidth / 2 - 70;
        this.buttonY = this.panelHeight - 100;
        this.buttonWidth = 160;
        this.buttonHeight = 70;
        this.buttonTextFieldText = "确认";
        this.buttonTextFieldX = this.buttonX + 15;
        this.buttonTextFieldY = this.buttonY + 10;
        this.buttonTextFieldWidth = 120;
        this.buttonTextFieldColor = 0xFFFAFA;
        this.stage = stage;
        this.taskService = taskService;
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskInformationField = new egret.TextField();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.drawPanel();
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.setText = function () {
        this.taskNameTextField.text = this.taskNameTextFieldText;
        this.taskNameTextField.x = this.taskNameTextFieldX;
        this.taskNameTextField.y = this.taskNameTextFieldY;
        this.taskNameTextField.width = this.taskNameTextFieldWidth;
        this.taskNameTextField.bold = true;
        this.taskNameTextField.textColor = this.taskNameTextFieldColor;
        this.taskInformationField.text = this.taskInformationTextFieldText;
        this.taskInformationField.x = this.taskInformationTextFieldX;
        this.taskInformationField.y = this.taskInformationTextFieldY;
        this.taskInformationField.width = this.taskInformationTextFieldWidth;
        this.taskInformationField.bold = false;
        this.taskInformationField.textColor = this.taskInformationTextFieldColor;
        this.taskInformationField.textAlign = egret.HorizontalAlign.CENTER;
    };
    p.drawButtonBack = function () {
        this.buttonBack.graphics.beginFill(this.buttonColor, 1);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();
    };
    p.drawBackground = function () {
        this.backGround.graphics.beginFill(this.backColor, 1);
        this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.backGround.graphics.endFill();
    };
    p.setButtonText = function () {
        this.buttonTextField.text = this.buttonTextFieldText;
        this.buttonTextField.x = this.buttonTextFieldX;
        this.buttonTextField.y = this.buttonTextFieldY;
        this.buttonTextField.width = this.buttonTextFieldWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextFieldColor;
    };
    p.drawPanel = function () {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        this.drawButton();
        this.drawBackground();
        this.setText();
        this.panel.addChild(this.backGround);
        this.panel.addChild(this.taskNameTextField);
        this.panel.addChild(this.taskInformationField);
        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.drawButton = function () {
        this.drawButtonBack();
        this.setButtonText();
        this.button.addChild(this.buttonBack);
        this.button.addChild(this.buttonTextField);
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.taskService.accept(this.currentTaskId);
                break;
            case TaskStatus.DURING:
                break;
            case TaskStatus.CAN_SUBMIT:
                this.taskService.finish(this.currentTaskId);
                break;
            default:
        }
        this.stage.removeChild(this.panel);
    };
    p.showPanel = function () {
        this.stage.addChild(this.panel);
    };
    p.removePanel = function () {
        this.stage.removeChild(this.panel);
    };
    p.dialogueOpen = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
        this.showPanel();
    };
    p.changeTaskText = function (name, desc) {
        this.taskNameTextField.text = name;
        this.taskInformationField.text = desc;
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.buttonTextField.text = "接受任务";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "提交任务";
                break;
            default:
                this.buttonTextField.text = "";
        }
    };
    return DialoguePanel;
}());
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map