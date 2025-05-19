import type { UserId } from "../../value-objects/UserId";

// userId により一意に識別されるエンティティ
export class User {
  public readonly _userId: UserId;
  public _name: string;

  constructor(userId: UserId, name: string) {
    this._userId = userId;
    this._name = name;
  }

  public changeName(name: string) {
    if (!name) {
      throw new Error("name が不正です");
    }
    if (name.length < 3) {
      throw new Error("名前は３文字以上である必要があります");
    }

    this._name = name;
  }

  public equals(other: User): boolean {
    if (!other) {
      return false;
    }
    // エンティティでは比較の対象は識別子だけ
    return this._userId.equals(other._userId);
  }
}
