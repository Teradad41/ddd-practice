import { Money } from "./domains/value-objects/Money";

const money1 = new Money(3000, "JPY");
const money2 = new Money(10000, "USD");
const result = money1.add(money2);

console.log(result.getAmount());
