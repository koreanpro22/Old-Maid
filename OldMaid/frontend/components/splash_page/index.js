import { StyleSheet, Text, View,Button } from 'react-native';

const SplashPage = () => {

    return (
        <>
            <View style={styles.container}>
                <Text>
                    Imagehere
                </Text>
            </View>
            <Button
            title='Start'
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SplashPage
