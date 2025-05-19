import type { User } from "../../entities/User";

// ドメインサービスは状態を持たないクラス
export class UserService {
  public exists(user: User): boolean {
    return true;
  }
}
