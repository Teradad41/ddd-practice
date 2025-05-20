import { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import type { UserId } from "@/domains/value-objects/UserId";
import { UserName } from "@/domains/value-objects/UserName";
import { supabase } from "lib/db";

export class UserRepository implements IUserRepository {
	async save(user: User): Promise<void> {
		const { error } = await supabase.from("users").insert({
			user_id: user.userId,
			name: user.name,
		});

		if (error) {
			throw new Error(
				`ユーザーの保存中にエラーが発生しました: ${error.message}`,
			);
		}
	}

	async find(param: UserName | UserId): Promise<User | null> {
		let query = supabase.from("users").select("*");

		if (param instanceof UserName) {
			query = query.eq("name", param.value);
		} else {
			query = query.eq("user_id", param.value);
		}

		const { data, error } = await query.single();

		if (error) {
			throw new Error(`Error: ${error}`);
		}

		if (!data) {
			return null;
		}

		return new User(new UserName(data.name));
	}

	delete(user: User): void {}
}
