class FullName {
	private readonly firstName: string;
	private readonly lastName: string;

	constructor(firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public getFirstName(): string {
		return this.firstName;
	}

	public getLastName(): string {
		return this.lastName;
	}

	public equals(fullName: FullName): boolean {
		return (
			this.firstName === fullName.firstName &&
			this.lastName === fullName.lastName
		);
	}
}
