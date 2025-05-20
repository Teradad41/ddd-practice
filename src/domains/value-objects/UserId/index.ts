export class UserId {
	public _userId: number;

	constructor(userId: number) {
		if (!userId) {
			throw new Error("userId の値が不正です");
		}
		this._userId = userId;
	}

	public equals(other: UserId): boolean {
		if (!other) {
			return false;
		}
		return this._userId === other._userId;
	}

	get(): number {
		return this._userId;
	}
}
