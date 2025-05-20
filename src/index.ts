import { User } from "./domains/entities/User";
import type { IUserRepository } from "./domains/repositories/i-userRepository";
import { UserService } from "./domains/services/UserService";
import { UserId } from "./domains/value-objects/UserId";
import { UserRepository } from "./infrastructure/repositories/user/user-repository";

export class Program {
  private _userRepository: IUserRepository;
  private _userService: UserService;

  constructor() {
    this._userRepository = new UserRepository();
    this._userService = new UserService(this._userRepository);
  }

  public async createUser(userName: string) {
    if (await this._userService.exists(userName)) {
      throw new Error(`${userName}は既に存在しています`);
    }

    const user = new User(new UserId(5), userName);
    await this._userRepository.save(user);
  }
}

async function main() {
  const program = new Program();

  try {
    await program.createUser("奥原駿太");
    console.log("ユーザーが正常に作成されました");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("エラーが発生しました:", error.message);
    } else {
      console.error("予期せぬエラーが発生しました");
    }
  }
}

main();
