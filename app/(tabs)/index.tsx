import { StyleSheet, Text, View , } from 'react-native'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordlength: Yup.number().min(4, 'Password must be at least 4 characters long').max(16, 'Password must be at most 16 characters long')
  .required('Length is required'),
});
export default function index() {

  const [password , setPassword] = useState('')
  const [isPassGenerated , setIsPassGenerated] = useState(false)

  const [lowercase , setLowercase] = useState(true)
  const [uppercase , setUppercase] = useState(false)
  const [numbers , setNumbers] = useState(false)
  const [symbols , setSymbols] = useState(false)

  const generatePasswordString = () => (passwordLength: number) => {
    let characters = '';
    if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characters += '0123456789';
    if (symbols) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if(uppercase){
      characters += uppercase

    }
    if (lowercase){
      characters += lowercase
    }
    if (numbers){
      characters += numbers
    }
    if (symbols){
      characters += symbols
    }
    const createdPassword = createPassword(characters , passwordLength)

    setPassword(createdPassword)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string , passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++){
      const characterIndex  = Math.random() * characters.length;
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowercase(true)
    setUppercase(false)
    setNumbers(false)
    setSymbols(false)

  }

  return (
    <SafeAreaView>
      <View>
        <Text style = {styles.headingText}>App</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color : 'white'
  }})