export class FullName {
  private readonly _firstName: string;
  private readonly _lastName: string;

  constructor(firstName: string, lastName: string) {
    if (firstName.length < 1) {
      throw new Error("FirstName は１文字以上である必要があります");
    }

    if (lastName.length < 1) {
      throw new Error("LastName は１文字以上である必要があります");
    }

    this._firstName = firstName;
    this._lastName = lastName;
  }

  public equals(fullName: FullName): boolean {
    return (
      this._firstName === fullName.firstName &&
      this._lastName === fullName.lastName
    );
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }
}
