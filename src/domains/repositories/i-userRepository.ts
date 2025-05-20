import type { User } from "../entities/User";

// リポジトリの責務はあくまでオブジェクトの抽象化
export interface IUserRepository {
	save(user: User): Promise<void>;
	find(name: string): Promise<User>;
}
