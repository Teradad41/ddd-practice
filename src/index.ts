import { UserRegisterUserCase } from "./application/use-cases/user/user-register-usecase";
import { UserService } from "./domains/services/UserService";
import { UserRepository } from "./infrastructure/repositories/user/user-repository";

async function main() {
	const userRepository = new UserRepository();
	const userService = new UserService(userRepository);

	const useCase = new UserRegisterUserCase(userRepository, userService);

	try {
		await useCase.handle("寺田恭");
		console.log("正常に終了しました");
	} catch (error) {
		console.error(
			error instanceof Error ? `${error.message}\n` : "不明なエラー\n",
		);
		process.exit(1);
	}
}

main();
