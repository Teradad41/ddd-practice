import type { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import { UserDTO } from "./dto/user-dto";

export class UserListUseCase {
	private readonly _userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this._userRepository = userRepository;
	}

	public async handle(): Promise<User[]> {
		const res = await this._userRepository.findAll();

		return res;
	}
}
