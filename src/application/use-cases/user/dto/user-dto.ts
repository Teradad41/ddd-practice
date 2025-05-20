import type { User } from "@/domains/entities/User";

export class UserDTO {
	public id: string;
	public name: string;
	// DTO クラスがドメインオブジェクトに依存するのは問題ない
	constructor(user: User) {
		this.id = user.userId.value;
		this.name = user.name;
		// 新しいプロパティはコンストラクタ内で追加していくだけ
	}
}
