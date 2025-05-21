import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import type { UserService } from "@/domains/services/UserService";
import { UserId } from "@/domains/value-objects/UserId";
import { UserName } from "@/domains/value-objects/UserName";

export class UserUpdateUseCase {
	private readonly _userRepository: IUserRepository;
	private readonly _userService: UserService;

	constructor(userRepository: IUserRepository, userService: UserService) {
		this._userRepository = userRepository;
		this._userService = userService;
	}

	public async handle(userId: string, name: string): Promise<void> {
		const targetId = new UserId(userId);
		const user = await this._userRepository.find(targetId);

		if (!user) {
			throw new Error("ユーザーは存在しません");
		}

		const newUserName = new UserName(name);
		user.changeName(newUserName);

		const isExists = await this._userService.exists(user);

		if (isExists) {
			throw new Error("そのユーザー名は既に存在しています");
		}

		this._userRepository.save(user);
	}
}
