import React, { useContext, useState } from 'react'
import { View, TextInput, ActivityIndicator, TouchableOpacity, Text, Image } from 'react-native'

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TypeScreen } from '../../route/Navigation';
import api from '../../db/supabase';
import { Formik } from 'formik'
import * as yup from 'yup'
import { stylesLogin } from './style';
import { UserContext } from '../Contexts/UserContext';

type home = NativeStackNavigationProp<TypeScreen, 'Home'>
type newAccount = NativeStackNavigationProp<TypeScreen, 'NewAccount'>

const SignInSchema = yup.object().shape({
    email: yup.string().required('E-mail is required'),
    password: yup.string().required('Password is required'),
})

const apieky = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY3F5YnhvZXlzb25lbG51bXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4OTc4NzcsImV4cCI6MTk4MDQ3Mzg3N30.QwjXgHDsbAa1PtezSRfzpx12XRN3-L6SdJYv-XbzqdA';

export function Login() {

    const navigation = useNavigation<home>();
    const navigationNewAccount = useNavigation<newAccount>();

    const [erroSignUp, setErroSignUp] = useState<boolean>(false);
    /* const [userId, setUserId] = useState(); */
    const { setUserToken } = useContext(UserContext)


    return (
        <Formik
            validationSchema={SignInSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={
                async function (values) {
                    await api.post(`auth/v1/token?grant_type=password`, {
                        email: values.email,
                        password: values.password
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": apieky
                        },
                    }).then(async function (response) {
                        setUserToken(response.data.user.id)
                        /*  setUserId(response.data.user.id); */
                        setErroSignUp(false);
                        navigation.navigate("Home", response.data.user);
                    }).catch(function (error) {
                        console.log(error)
                        setErroSignUp(true);
                        values.email = '';
                        values.password = '';
                    })
                }
            }
        >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors }) => (

                <View style={stylesLogin.containerScreen}>
                    {/*                     <Image
                        source={require('../../assets/img/logo/logo.png')}
                        style={stylesLogin.logo}
                    /> */}

                    {
                        errors.email &&
                        <Text style={stylesLogin.errorLoginMessage}>*{errors.email}</Text>
                    }
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="email@address.com"
                        autoCapitalize={'none'}
                        style={stylesLogin.input}
                    />
                    {
                        errors.password &&
                        <Text style={{ fontSize: 15, color: '#E00000', marginLeft: 20 }}>*{errors.password}</Text>
                    }
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize={'none'}
                        style={stylesLogin.input}
                    />
                    {
                        erroSignUp &&
                        <Text style={stylesLogin.errorLoginMessage}>*Email ou Senha inválidos</Text>
                    }
                    {
                        isSubmitting
                            ?
                            <ActivityIndicator size="large" color='#fff' />
                            :
                            <TouchableOpacity style={stylesLogin.ButtonSignIn} onPress={handleSubmit}>
                                <Text style={stylesLogin.buttonTextSignIn}>Entrar</Text>
                            </TouchableOpacity>
                    }
                    <View
                        style={stylesLogin.line}
                    />
                    <TouchableOpacity style={stylesLogin.ButtonSignUp} onPress={() => navigationNewAccount.navigate('NewAccount')}>
                        <Text style={stylesLogin.buttonTextSignUp}>Novo Usuário</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}