export class UserInfo {
    constructor({userName, userInfo}) {
        this._userName = userName;
        this._userInfo = userInfo;
    }

    getUserInfo () {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        }
    }

    setUserInfo (formData) {
        this._userName.textContent = formData.popupName;
        this._userInfo.textContent = formData.popupJob;
    }
}