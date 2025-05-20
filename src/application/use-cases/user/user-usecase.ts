import { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import type { UserService } from "@/domains/services/UserService";
import { UserId } from "@/domains/value-objects/UserId";
import { UserName } from "@/domains/value-objects/UserName";
import { UserDTO } from "./dto/user-dto";

export class UserUseCase {
	private readonly _userRepository: IUserRepository;
	private readonly _userService: UserService;

	constructor(userRepository: IUserRepository, userService: UserService) {
		this._userRepository = userRepository;
		this._userService = userService;
	}

	public async create(name: string): Promise<void> {
		const user = new User(new UserName(name));
		const isExists = await this._userService.exists(user);

		if (isExists) {
			throw new Error(`${user.name}は既に存在しています`);
		}

		this._userRepository.save(user);
	}

	public async read(userId: string): Promise<UserDTO | null> {
		const targetId = new UserId(userId);
		const user = await this._userRepository.find(targetId);

		if (!user) {
			return null;
		}

		return new UserDTO(user);
	}

	public async update(userId: string, name: string): Promise<void> {
		const targetId = new UserId(userId);
		const user = await this._userRepository.find(targetId);

		if (!user) {
			throw new Error("ユーザーは存在しません");
		}

		const newUserName = new UserName(name);
		// user.changeName(newUserName);

		const isExists = await this._userService.exists(user);

		if (isExists) {
			throw new Error("そのユーザー名は既に存在しています");
		}

		this._userRepository.save(user);
	}

	public async delete(user: User): Promise<void> {
		const targetId = new UserId(user.userId.value);
		const foundUser = await this._userRepository.find(targetId);

		if (!foundUser) {
			// 対象が見つからなかったため成功とする
			return;
		}

		this._userRepository.delete(foundUser);
	}
}
