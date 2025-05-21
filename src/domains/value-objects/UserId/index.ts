/**
 * ユーザーIDを表す値オブジェクト
 *
 * @class UserId
 * @description ユーザーを一意に識別するためのIDを表現する値オブジェクト
 */
export class UserId {

	private readonly _userId: string;

	constructor(userId: UUIDTypes) {
		if (!userId) {
			throw new Error("userId の値が不正です");
		}
		this._userId = userId;
	}

	/**
	 * 他のUserIdインスタンスとの等価性を比較します
	 *
	 * @param {UserId} other - 比較対象のUserIdインスタンス
	 * @returns {boolean} 等価な場合はtrue、そうでない場合はfalse
	 */
	public equals(other: UserId): boolean {
		if (!other) {
			return false;
		}
		return this._userId === other.value;
	}


	get value(): string {
		return this._userId;
	}
}
