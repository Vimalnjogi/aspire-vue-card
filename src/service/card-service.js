import { cards } from '@/constant/card-constant.js';
export default class card {
    static addCard(card) {
        return true
    }
    static updateCard(card) {
        return true
    }
    static cancelCard(cardNumber) {
        return true
    }
    static getCards() {
        return cards
    }
}