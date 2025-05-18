export class Money {
	private readonly amount: number;
	private readonly currency: string;

	constructor(amount: number, currency: string) {
		this.amount = amount;
		this.currency = currency;
	}

	public getAmount(): number {
		return this.amount;
	}

	public getCurrency(): string {
		return this.currency;
	}

	public add(arg: Money): Money {
		if (!arg) {
			throw new Error("引数が必要です");
		}

		if (this.currency !== arg.currency) {
			throw new Error("通貨は同じである必要があります");
		}

		return new Money(this.amount + arg.amount, this.currency);
	}
}
