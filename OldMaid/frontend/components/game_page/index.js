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
        <View style={styles.container}>
            <Text>Test Game Page</Text>
            <Button onPress={() => setReset(!reset)} style={styles.reset} title='Click here to reset'/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
      borderColor: 'green',
    },
    reset: {
        // flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },

    board: {
        

    },
  });

export default GamePage