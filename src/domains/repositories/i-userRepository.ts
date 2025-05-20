import type { User } from "../entities/User";
import type { UserId } from "../value-objects/UserId";
import type { UserName } from "../value-objects/UserName";

// リポジトリの責務はあくまでオブジェクトの抽象化
export interface IUserRepository {
	save(user: User): Promise<void>;
	find(arg: UserName | UserId): Promise<User | null>;
	delete(user: User): void;
}
