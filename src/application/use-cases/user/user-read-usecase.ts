import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import { UserId } from "@/domains/value-objects/UserId";
import { UserDTO } from "./dto/user-dto";

export class UserReadUseCase {
	private readonly _userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this._userRepository = userRepository;
	}

	public async handle(userId: string): Promise<UserDTO | null> {
		const targetId = new UserId(userId);
		const user = await this._userRepository.find(targetId);

		if (!user) {
			return null;
		}

		return new UserDTO(user);
	}
}
