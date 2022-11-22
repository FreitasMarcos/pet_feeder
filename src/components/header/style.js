import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#449F94',
        height: 50,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        padding: 10
    },
    HeaderContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexDirection: 'row',
    },
    logo: {
        backgroundColor:'#449F94',
        height: 30,
        width: 250,
        alignSelf: 'center'
    },
    backgroundHeaderIOS: {
        backgroundColor: '#449F94',
    }
})