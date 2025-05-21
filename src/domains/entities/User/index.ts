import { UserId } from "@/domains/value-objects/UserId";
import type { UserName } from "@/domains/value-objects/UserName";
import { v4 as uuidv4 } from "uuid";

/**
 * ユーザーを表すエンティティ
 * @class User
 * @description ユーザーIDにより一意に識別されるエンティティ。ユーザー名の変更のみ可能
 */
export class User {
	private readonly _userId: UserId;
	private _name: UserName;

	constructor(name: UserName, userId?: string) {
		this._userId = new UserId(userId ?? uuidv4());
		this._name = name;
	}

	public changeName(userName: UserName) {
		if (!userName) {
			throw new Error("name が不正です");
		}
		if (userName.value.length < 3) {
			throw new Error("名前は３文字以上である必要があります");
		}

		this._name = userName;
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

	get name(): UserName {
		return this._name;
	}
}
