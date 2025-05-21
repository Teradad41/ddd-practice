import type { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import { UserId } from "@/domains/value-objects/UserId";

export class UserDeleteUseCase {
	private readonly _userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this._userRepository = userRepository;
	}

	public async handle(user: User): Promise<void> {
		const targetId = new UserId(user.userId.value);
		const foundUser = await this._userRepository.find(targetId);

		if (!foundUser) {
			// 対象が見つからなかったため成功とする
			return;
		}

		this._userRepository.delete(foundUser);
	}
}
