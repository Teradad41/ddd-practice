import { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import type { UserService } from "@/domains/services/UserService";
import { UserName } from "@/domains/value-objects/UserName";

export class UserRegisterUserCase {
	private readonly _userRepository: IUserRepository;
	private readonly _userService: UserService;

	constructor(userRepository: IUserRepository, userService: UserService) {
		this._userRepository = userRepository;
		this._userService = userService;
	}

	public async handle(name: string): Promise<void> {
		const user = new User(new UserName(name));
		const isExists = await this._userService.exists(user);

		if (isExists) {
			throw new Error(`${user.name}は既に存在しています`);
		}

		this._userRepository.save(user);
	}
}
