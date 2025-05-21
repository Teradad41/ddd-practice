/**
 * ユーザー名を表す値オブジェクト
 *
 * @class UserName
 * @description ユーザーの名前を表現する値オブジェクト
 */
export class UserName {
	private readonly _userName: string;

	constructor(userName: string) {
		if (!userName) {
			throw new Error("userName の値が不正です");
		}
		if (userName.length < 1) {
			throw new Error("userName は1文字以上である必要があります");
		}
		this._userName = userName;
	}

	/**
	 * 他のUserNameインスタンスとの等価性を比較します
	 *
	 * @param {UserName} other - 比較対象のUserNameインスタンス
	 * @returns {boolean} 等価な場合はtrue、そうでない場合はfalse
	 */
	public equals(other: UserName): boolean {
		if (!other) {
			return false;
		}
		return this._userName === other.value;
	}

	get value(): string {
		return this._userName;
	}
}
