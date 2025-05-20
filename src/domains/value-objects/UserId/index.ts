export class UserId {
	private _userId: string;

	constructor(userId: string) {
		if (!userId) {
			throw new Error("userId の値が不正です");
		}
		this._userId = userId;
	}

	get value(): string {
		return this._userId;
	}

	public equals(other: UserId): boolean {
		if (!other) {
			return false;
		}
		return this._userId === other._userId;
	}
}
