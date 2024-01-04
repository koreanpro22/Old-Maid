import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const GamePage = () => {
    console.log('hitting game page')

    const panGesture = Gesture.Pan()
        .onStart((e) => {
            console.log('dragging')
        })
        // .onUpdate((e) => {
        // })
        // .onEnd((e) => {
        // });
    
    const [reset, setReset] = useState(true)
    const [compHand, setCompHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [turn, setTurn] = useState()

    useEffect(() => {
        makeHands(cards, joker);
    }, [reset])

    // useEffect(() => {
    // }, [playerHand]);

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
    async function makeHands(cards, joker) {
        // Shuffle the array
        cards = shuffleArray(cards);

        // Select the first half of the shuffled array
        const player1Hand = cards.slice(0, Math.floor(cards.length / 2));
        // Select the second half of the shuffled array
        const player2Hand = cards.slice(Math.floor(cards.length / 2));

        let res = [player1Hand, player2Hand];
        let randInt = Math.floor(Math.random() * 2);
        randInt ? await setTurn("Comp") : await setTurn("Player") 
        res[randInt].push(joker)
        await setCompHand(res[0])
        await setPlayerHand(res[1])
        return res;

    }
    function handsComponent(hand) {
        return (
            <View style={styles.playingSide}>
                <View style={styles.cards}>
                    {hand.length > 0 && hand.map(card => (
                        <GestureDetector gesture={panGesture}>
                            <View style={styles.singleCard} key={`${card.value}-${card.suit}`}>
                                <Text>
                                    {card.value} {card.suit.slice(0, 5)}
                                </Text>
                            </View>
                        </GestureDetector>
                    ))}
                </View>
            </View>
        );
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

    // function handleDragSelection(x, y) {
    //     if ()
    // }

    const cards = makeCards();
    const joker = makeJoker();

    //idk why this works
    if (compHand.length === 0 && playerHand.length === 0) {
        makeHands(cards, joker);
    }

    const noDupePlayerHand = cleanUpDupes(playerHand.slice())
    const noDupeCompHand = cleanUpDupes(compHand.slice())

    // console.log(noDupePlayerHand)
    // console.log(noDupeCompHand)
    // console.log(turn)

    return (
        <GestureHandlerRootView>
            <View>
                <View style={styles.board}>
                    {compHand.length && handsComponent(compHand)}

                    <View style={styles.midBoard}>
                    </View>

                    {handsComponent(playerHand)}
                </View>
                <View style={styles.reset}>
                    <Button onPress={() => {
                        let newHand = shuffleArray(playerHand.slice())
                        setPlayerHand(newHand)
                    }} title="Shuffling Hand" />
                    <Button onPress={() => setReset(!reset)} title='Click here to reset' />
                </View>
            </View>
        </GestureHandlerRootView>

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
        borderColor: 'blue',
        // flexDirection: 'row',
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        borderWidth: 5,
    },
    midBoard: {
        borderColor: 'red',
        flex: 1,
        flexDirection: 'row',
        height: 300,
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
    },
});

export default GamePage
