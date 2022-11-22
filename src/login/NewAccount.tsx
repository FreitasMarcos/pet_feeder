import React, { useState } from 'react'
import { View, TextInput, ActivityIndicator, TouchableOpacity, Text, Image } from 'react-native'

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navigation, { TypeScreen } from '../../route/Navigation';
import api from '../../db/supabase';
import { Formik } from 'formik'
import * as yup from 'yup'
import { styleNewAccount } from './style';

type login = NativeStackNavigationProp<TypeScreen, 'Login'>

const SignupSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
})

const apieky = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY3F5YnhvZXlzb25lbG51bXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4OTc4NzcsImV4cCI6MTk4MDQ3Mzg3N30.QwjXgHDsbAa1PtezSRfzpx12XRN3-L6SdJYv-XbzqdA';

export function NewAccount() {

    const navigation = useNavigation<login>();


    return (
        <Formik
            validationSchema={SignupSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={
                async function (values) {
                    await api.post('auth/v1/signup', {
                        email: values.email,
                        password: values.password
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": apieky

                        },
                    }).then(async function (response) {
                        setTimeout(() => {
                            navigation.navigate("Login");
                        }, 1000)
                    }).catch(function (error) {
                        values.email = ''
                        values.password = ''
                    })
                }
            }
        >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors }) => (

                <View style={styleNewAccount.containerScreen}>

                    <Text style={{ color: '#fff', marginLeft: 20, fontSize: 15, marginEnd: 15, marginBottom: 10 }}>Será necessário fazer a verificação por e-mail, para que possamos validar se o e-mail é válido.</Text>
                    {/*                     <Image
                        source={require('../../assets/img/logo/logo.png')}
                        style={styleNewAccount.logo}
                    /> */}
                    {
                        errors.email &&
                        <Text style={styleNewAccount.errorSingUpMessage}>*{errors.email}</Text>
                    }
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="email@address.com"
                        autoCapitalize={'none'}
                        style={styleNewAccount.input}
                    />
                    {
                        errors.password &&
                        <Text style={styleNewAccount.errorSingUpMessage}>*{errors.password}</Text>
                    }
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize={'none'}
                        style={styleNewAccount.input}
                    />
                    {
                        isSubmitting
                            ?
                            <ActivityIndicator size="large" color='#fff' />
                            :
                            <TouchableOpacity style={styleNewAccount.ButtonCreateAccount} onPress={handleSubmit}>
                                <Text style={styleNewAccount.buttonTextCreateAccount}>Criar Conta</Text>
                            </TouchableOpacity>
                    }
                </View>
            )}
        </Formik>
    )
}