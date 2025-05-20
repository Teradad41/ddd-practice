import { supabase } from "../../../../lib/db";
import { User } from "../../../domains/entities/User";
import type { IUserRepository } from "../../../domains/repositories/i-userRepository";

export class UserRepository implements IUserRepository {
	async save(user: User): Promise<void> {
		const { error } = await supabase.from("users").insert({
			user_id: user._userId.get(),
			name: user._name,
		});

		if (error) {
			throw new Error(
				`ユーザーの保存中にエラーが発生しました: ${error.message}`,
			);
		}
	}

	async find(name: string): Promise<User> {
		const { data, error } = await supabase
			.from("users")
			.select("*")
			.eq("name", name)
			.single();

		if (error) {
			throw new Error(`Error: ${error}`);
		}

		if (!data) {
			throw new Error(`ユーザー ${name} が見つかりませんでした`);
		}

		return new User(data.user_id, data.name);
	}
}
