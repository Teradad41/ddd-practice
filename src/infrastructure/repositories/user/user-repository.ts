import { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";
import type { UserId } from "@/domains/value-objects/UserId";
import { UserName } from "@/domains/value-objects/UserName";
import { supabase } from "lib/db";

type UserRecord = {
	user_id: string;
	name: string;
	created_at: string;
};

export class UserRepository implements IUserRepository {
	private toRecord(user: User): UserRecord {
		return {
			user_id: user.userId.value,
			name: user.name.value,
			created_at: new Date().toISOString(),
		};
	}

	/**
	 * データベースレコードをドメインモデルに変換
	 */
	private toEntity(record: UserRecord): User {
		return new User(new UserName(record.name), record.user_id);
	}

	async save(user: User): Promise<void> {
		const record = this.toRecord(user);
		const { error } = await supabase.from("users").insert(record);

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

		const { data, error } = await query.maybeSingle();

		if (error) {
			throw new Error(
				`ユーザーの検索中にエラーが発生しました: ${error.message}`,
			);
		}

		if (!data) {
			return null;
		}

		return this.toEntity(data as UserRecord);
	}

	async findAll(): Promise<User[]> {
		const { data, error } = await supabase.from("users").select("*");

		if (error) {
			throw new Error(
				`ユーザーの一覧取得中にエラーが発生しました: ${error.message}`,
			);
		}

		if (!data) {
			return [];
		}

		return data.map((record) => this.toEntity(record));
	}

	async delete(user: User): Promise<void> {
		const { error } = await supabase
			.from("users")
			.delete()
			.eq("user_id", user.userId.value);

		if (error) {
			throw new Error(
				`ユーザーの削除中にエラーが発生しました: ${error.message}`,
			);
		}
	}
}
