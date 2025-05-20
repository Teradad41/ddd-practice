export class UserName {
	private _userName: string;
	constructor(userName: string) {
		if (!userName) {
			throw new Error("userName の値が不正です");
		}
		if (userName.length < 1) {
			throw new Error("userName は2文字以上である必要があります");
		}
		this._userName = userName;
	}

	get value(): string {
		return this._userName;
	}
}
