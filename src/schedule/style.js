import {StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window');

export const stylesAdd = StyleSheet.create({
    containerScreen:{
        flex: 1,
        marginTop:12,
        justifyContent: 'center',
    },

    containerInput:{
        flexDirection: 'row',
        justifyContent: 'center'
    },  

    input:{
        fontSize: 16,
        paddingLeft: 10,
        alignSelf: 'center',
        marginBottom: 12,
        height: height *.05,
        width: width  * .3,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#000000'
    },

    inputClock:{
        fontSize: 16,
        paddingLeft: 10,
        alignSelf: 'center',
        marginBottom: 12,
        height: height *.05,
        width: width  * .2,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#000000',
        marginLeft: 10,
        //backgroundColor: '#C5C5C5'
    },

    messageError:{
        fontSize: 15, 
        color: '#E00000', 
        marginLeft: 60,
    },

    sendButton:{
        borderRadius: 7,
        paddingTop: width * .03,
        paddingBottom: width * .03,
        paddingLeft: width * .20,
        paddingRight: width * .20,
        backgroundColor: '#256D85',
        alignSelf: 'center',
    },

    sendButtonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

export const stylesUpdate =  StyleSheet.create({...stylesAdd})

export const stylesRelease = StyleSheet.create({...stylesAdd})
