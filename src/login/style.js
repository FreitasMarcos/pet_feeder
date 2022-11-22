import {StyleSheet, Dimensions} from 'react-native'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const stylesLogin = StyleSheet.create({
    containerScreen:{
        flex: 1,
        backgroundColor: '#256D85',
        justifyContent: 'center',
    },

    logo:{
        marginBottom:20,
        alignSelf: 'center',
        width: width *.8,
        height: height / 3,
    },

    input:{
        backgroundColor: '#fff',
        padding: 10,
        alignSelf: 'center',
        width: width * .9,
        height: height * .05,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#fafafa',
    },

    errorLoginMessage:{
        fontSize: 15, 
        color: '#E00000', 
        marginLeft: 20
    },  

    ButtonSignIn:{
        borderRadius: 7,
        marginTop: 15,
        padding: 10,
        width: width * .9,
        alignSelf: 'center',
        backgroundColor: '#fff'
    },

    buttonTextSignIn:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#256D85',
        alignSelf: 'center',
    },

    ButtonSignUp:{
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        marginTop: 15,
        padding: 10,
        width: width * .9,
        alignSelf: 'center',
        backgroundColor: '#256D85'
    },

    line:{
        marginTop: 20,
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    buttonTextSignUp:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center',
    },

    
});

export const styleNewAccount = StyleSheet.create({
    containerScreen:{
        flex: 1,
        backgroundColor: '#256D85',
        justifyContent: 'center',
    },

    logo:{
        marginBottom:20,
        alignSelf: 'center',
        width: width *.8,
        height: height / 3,
    },

    input:{
        backgroundColor: '#fff',
        padding: 10,
        alignSelf: 'center',
        width: width * .9,
        height: height * .05,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#fafafa',
    },

    errorSingUpMessage:{
        fontSize: 15, 
        color: '#E00000', 
        marginLeft: 20
    },  

    ButtonCreateAccount:{
        borderRadius: 7,
        marginTop: 15,
        padding: 10,
        width: width * .9,
        alignSelf: 'center',
        backgroundColor: '#fff'
    },

    buttonTextCreateAccount:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#256D85',
        alignSelf: 'center',
    },
})