export class UserInfo {
    constructor({userName, userInfo, userAvatar}) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._userAvatar = userAvatar;
    }

    getUserInfo () {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        }
    }

    setUserInfo (name, job, url) {
        this._userName.textContent = name;
        this._userInfo.textContent = job;
        this._userAvatar.src = url;
    }
}