import type { User } from "../../entities/User";
import type { IUserRepository } from "../../repositories/i-userRepository";

// ドメインサービスは状態を持たないクラス
export class UserService {
	private _userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this._userRepository = userRepository;
	}

	public async exists(name: string): Promise<boolean> {
		try {
			await this._userRepository.find(name);
			return true;
		} catch (error) {
			return false;
		}
	}
}
