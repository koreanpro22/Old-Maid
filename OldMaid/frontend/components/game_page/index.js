import { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native"

const GamePage = () => {

    const [reset, setReset] = useState(true)
    class Card {
        constructor(value, suit) {
            this.value = value;
            this.suit = suit;
        }
    }
    function makeCards() {
        let arr = []
        let suit = ['diamond', 'club', 'heart', 'spade']
        let suitCounter = 0
        for (let i = 0 ; i < 52; i++) {
            if (i && !(i%13)) suitCounter++
            
            const card = new Card(((i%13)+1).toString(), suit[suitCounter])
            arr.push(card)
        }

        return arr

    }
    function makeJoker() {
        let joker = new Card('joker', 'joker')

        return joker
    }
    function makeHands(cards, joker) {
        function shuffleArray() {
            // Fisher-Yates (Knuth) shuffle algorithm
            for (let i = cards.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [cards[i], cards[j]] = [cards[j], cards[i]];
            }
        }
          
        // Shuffle the array
        shuffleArray();
        
        // Select the first half of the shuffled array
        const player1Hand = cards.slice(0, Math.floor(cards.length / 2));
        // Select the second half of the shuffled array
        const player2Hand = cards.slice(Math.floor(cards.length / 2));
        
        let res = [player1Hand, player2Hand];
        let randInt = Math.floor(Math.random()*2);

        res[randInt].push(joker)
        return res;
        
    }

    const cards = makeCards();
    const joker = makeJoker();
    const playerHands = makeHands(cards,joker);

    return (
        <View>
            <View style={styles.reset}>
                <Button onPress={() => setReset(!reset)} title='Click here to reset'/>
            </View>
            <View style={styles.board}>
                <View style={styles.playingSide}>
                    <View style={styles.cards}>
                        
                        {playerHands[0].map(card => {
                            return (
                                <Text>
                                    {card.value}
                                </Text>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.midBoard}>

                </View>
                <View style={styles.playingSide}>
                    <View style={styles.cards}>
                        {playerHands[1].map(card => {
                            return (
                                <View style={styles.singleCard}>
                                    <Text>
                                        {card.value}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      borderWidth: 5,
      borderColor: 'green',
    },
    reset: {
        // flex: 1,
        position: 'absolute',
        top: 350,
        right: 50,
        width: 150,
        zIndex: 1,
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    
    board: {
        flexDirection: 'column',
        borderWidth: 5,
        borderColor: 'green',
        height: 800,
    },
    
    playingSide: {
        // flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        borderColor: 'blue',
        borderWidth: 5,
    },
    midBoard: {
        flex: 1,
        flexDirection: 'row',
        height: 300,
        borderColor: 'red',
        borderWidth: 5,
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
    },
    singleCard: {
        borderColor: 'black',
        height: 55,
        width: 42,
        borderWidth: 1,
        padding: 2,
    }
  });

export default GamePage