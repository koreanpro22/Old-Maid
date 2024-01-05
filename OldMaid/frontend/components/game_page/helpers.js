class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

function cleanUpDupes(hand) {
    const obj = {}

    for (let card of hand) {
        if (obj[card.value]) {
            delete obj[card.value]
        } else {
            obj[card.value] = card
        }
    }
    
    return Object.values(obj)
}

function makeCards() {

    let arr = []
    let suit = ['diamond', 'club', 'heart', 'spade']
    let suitCounter = 0
    for (let i = 0; i < 52; i++) {
        if (i && !(i % 13)) suitCounter++

        const card = new Card(((i % 13) + 1).toString(), suit[suitCounter])
        arr.push(card)
    }
    return arr
}

function makeJoker() {
    let joker = new Card('joker', 'joker')
    return joker
}

function shuffleArray(arr) {
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}



export { 
    cleanUpDupes, 
    makeCards, 
    makeJoker, 
    shuffleArray,
    Card
}