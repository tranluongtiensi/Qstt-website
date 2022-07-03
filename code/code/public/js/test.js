module.exports = class Helper {
    req: any
    constructor(req: any) {
        autoBind(this);
        this.req = req;
    }

    getObject() {
        return {
            req: this.req,
            viewPath: this.viewPath,
            hasPermission: this.hasPermission,
            isValid: this.isValid,
            getInputValue: this.getInputValue,
            showError: this.showError,
            Date: this.Date,
            globalError: this.globalError,
            translate: this.translate,
            getSiteName : this.getSiteName

        };
    }

};