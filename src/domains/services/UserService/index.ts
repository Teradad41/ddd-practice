import type { User } from "@/domains/entities/User";
import type { IUserRepository } from "@/domains/repositories/i-userRepository";

/**
 * ユーザーに関するドメインサービス
 *
 * @class UserService
 * @description ユーザーエンティティに関する複雑なドメインロジックを扱うサービスです。
 * リポジトリを使用してユーザーの存在確認や重複チェックを行います。
 */
export class UserService {
	private readonly _userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this._userRepository = userRepository;
	}

	/**
	 * 指定されたユーザーが既に存在するかどうかを確認します
	 *
	 * @param {User} user - 確認対象のユーザー
	 * @returns {Promise<boolean>} ユーザーが存在する場合はtrue、存在しない場合はfalse
	 * @throws {Error} リポジトリからのエラーが発生した場合
	 */
	public async exists(user: User): Promise<boolean> {
		try {
			const existingUser = await this._userRepository.find(user.userId);
			return existingUser !== null;
		} catch (error) {
			throw new Error(
				`ユーザーの存在確認中にエラーが発生しました: ${
					error instanceof Error ? error.message : "不明なエラー"
				}`,
			);
		}
	}
}
