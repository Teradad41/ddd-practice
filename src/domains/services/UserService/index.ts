import type { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";

// ドメインサービスは状態を持たないクラス
export class UserService {
	private readonly _userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this._userRepository = userRepository;
	}

	public async exists(user: User): Promise<boolean> {
		try {
			const duplicatedUser = await this._userRepository.find(user.userId);
			return duplicatedUser !== null;
		} catch (error) {
			return false;
		}
	}
}
