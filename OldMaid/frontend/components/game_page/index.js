import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { cleanUpDupes, makeCards, makeJoker, shuffleArray } from './helpers';

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
    
    const [compHand, setCompHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [turn, setTurn] = useState('')

    useEffect(() => {
        makeHands(makeCards(), makeJoker());
        const noDupePlayerHand = cleanUpDupes(playerHand.slice())
        const noDupeCompHand = cleanUpDupes(compHand.slice())

        setPlayerHand(noDupePlayerHand)
        setCompHand(noDupeCompHand)

    }, [])

    function makeHands(cards, joker) {
        // Shuffle the array
        cards = shuffleArray(cards);
    
        // Select the first half of the shuffled array
        const player1Hand = cards.slice(0, Math.floor(cards.length / 2));
        // Select the second half of the shuffled array
        const player2Hand = cards.slice(Math.floor(cards.length / 2));
    
        let res = [player1Hand, player2Hand];
        let randInt = Math.floor(Math.random() * 2);
        randInt ? setTurn("Comp") : setTurn("Player") 
        res[randInt].push(joker)
        setCompHand(res[0])
        setPlayerHand(res[1])
        return res;
    }

    function handsComponent(hand, side) {
        return (
            <View style={styles.playingSide}>
                <View style={styles.cards}>
                    {hand.length > 0 && hand.map((card, idx) => (
                        (side === 'Player') ? <GestureDetector gesture={panGesture}>
                            <View>
                                <View style={styles.singleCard} key={`${card.value}-${card.suit}-${idx}`}>
                                    <Text>
                                        {card.value} {card.suit}
                                    </Text>
                                </View>
                            </View>
                        </GestureDetector> :
                        <View>
                            <View style={styles.singleCard} key={`${card.value}-${card.suit}-${idx}`}>
                                <Text>
                                    {card.value} {card.suit} {idx}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    //idk why this works
    if (compHand.length === 0 && playerHand.length === 0) {
        makeHands(makeCards(), makeJoker());
    }



    return (
        <GestureHandlerRootView>
            <View>
                <View style={styles.board}>
                    {compHand.length && handsComponent(compHand, "Player")}

                    <View style={styles.midBoard}>
                    </View>
                    {playerHand.length && handsComponent(playerHand)}
                </View>
                <View style={styles.reset}>
                    <Button onPress={() => {
                        let newHand = shuffleArray(playerHand.slice())
                        setPlayerHand(newHand)
                    }} title="Shuffling Hand" />
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
