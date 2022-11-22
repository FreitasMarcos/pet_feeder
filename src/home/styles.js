import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fafafa'
    },

    button:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 15,
        paddingLeft: 10,
        borderRadius: 7,
        backgroundColor: '#009092'
    },

    text:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    card:{
        marginVertical: 10,
        width: width ,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 4,
        backgroundColor: '#fafafa'
    },

    alignContent:{
        flexDirection: 'column',
        alignSelf: 'center',
    },

    buttonSet:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        paddingLeft: 10,
        borderRadius: 7,
        width: width * .12,
    },

})