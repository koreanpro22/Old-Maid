import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

const SplashPage = () => {
    const handleButtonPress = () => {
        console.log('Button pressed!');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/old-maid.jpg')} />
            <Button title='Game-ON' color="green" onPress={handleButtonPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default SplashPage;
