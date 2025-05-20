import { UserId } from "@/domains/value-objects/UserId";
import type { UserName } from "@/domains/value-objects/UserName";

// userId により一意に識別されるエンティティ
export class User {
	private readonly _userId: UserId;
	private _name: UserName;

	constructor(name: UserName) {
		this._userId = new UserId(Math.floor(Math.random() * 1000000) + 1);
		this._name = name;
	}

	public changeName(name: string) {
		if (!name) {
			throw new Error("name が不正です");
		}
		if (name.length < 3) {
			throw new Error("名前は３文字以上である必要があります");
		}

		this._name = name;
	}

	public equals(other: User): boolean {
		if (!other) {
			return false;
		}
		// エンティティでは比較の対象は識別子だけ
		return this._userId.equals(other._userId);
	}

	get userId(): UserId {
		return this._userId;
	}

	get name(): string {
		return this._name;
	}
}
