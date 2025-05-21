import { UserDeleteUseCase } from "./application/use-cases/user/user-delete-usecase";
import { UserListUseCase } from "./application/use-cases/user/user-list-usecase";
import { UserReadUseCase } from "./application/use-cases/user/user-read-usecase";
import { UserRegisterUserCase } from "./application/use-cases/user/user-register-usecase";
import { UserService } from "./domains/services/UserService";
import { UserRepository } from "./infrastructure/repositories/user/user-repository";

async function main() {
	const userRepository = new UserRepository();
	const userService = new UserService(userRepository);

	const createUseCase = new UserRegisterUserCase(userRepository, userService);
	const readUseCase = new UserReadUseCase(userRepository);
	const listUseCase = new UserListUseCase(userRepository);
	const deleteUseCase = new UserDeleteUseCase(userRepository);

	try {
		// ユーザー登録
		// await createUseCase.handle("澤登生");
		// console.log("ユーザー登録が完了しました");

		// 登録されたユーザーの確認
		const users = await listUseCase.handle();
		console.log("登録されているユーザー:");
		for (const user of users) {
			console.log(`- ID: ${user.userId.value}, 名前: ${user.name.value}`);
		}

		// ID によるユーザー検索
		const user = await readUseCase.handle(
			"2ecec107-f3ca-4538-bf4d-2ebc79bfa51c",
		);

		if (!user) {
			throw new Error("ユーザーが存在しません");
		}

		// ユーザー削除
		await deleteUseCase.handle(user);
	} catch (error) {
		console.error(
			error instanceof Error ? `${error.message}\n` : "不明なエラー\n",
		);
		process.exit(1);
	}
}

main();
