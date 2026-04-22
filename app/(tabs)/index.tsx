import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password must be at least 4 characters long')
    .max(32, 'Password must be at most 32 characters long')
    .required('Length is required'),
});

export default function index() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const theme = useColorScheme() ?? 'light';

  const generatePasswordString = (passwordLength: number) => {
    let characters = '';
    if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characters += '0123456789';
    if (symbols) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (characters.length === 0) {
      Alert.alert('Error', 'Please select at least one character type');
      return;
    }

    const createdPassword = createPassword(characters, passwordLength);
    setPassword(createdPassword);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const copyToClipboard = () => {
    Alert.alert('Copied!', 'Password copied to clipboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Password Generator</ThemedText>
          <ThemedText style={styles.subtitle}>
            Generate secure passwords with custom options
          </ThemedText>
        </ThemedView>

        <Formik
          initialValues={{ passwordLength: '12' }}
          validationSchema={PasswordSchema}
          onSubmit={(values) => {
            generatePasswordString(parseInt(values.passwordLength));
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <ThemedView style={styles.form}>
              <ThemedView style={styles.inputGroup}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  Password Length
                </ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme === 'light' ? Colors.light.text : Colors.dark.text,
                      backgroundColor: theme === 'light' ? '#f5f5f5' : '#2a2a2a',
                      borderColor: errors.passwordLength && touched.passwordLength ? '#ff6b6b' : (theme === 'light' ? '#ddd' : '#444')
                    }
                  ]}
                  onChangeText={handleChange('passwordLength')}
                  onBlur={handleBlur('passwordLength')}
                  value={values.passwordLength}
                  keyboardType="numeric"
                  placeholder="Enter length (4-32)"
                  placeholderTextColor={theme === 'light' ? '#999' : '#666'}
                />
                {errors.passwordLength && touched.passwordLength && (
                  <ThemedText style={styles.errorText}>{errors.passwordLength}</ThemedText>
                )}
              </ThemedView>

              {/* Character Options */}
              <ThemedView style={styles.optionsGroup}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  Include Characters
                </ThemedText>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setLowercase(!lowercase)}
                >
                  <View style={[styles.checkbox, lowercase && styles.checkboxChecked]}>
                    {lowercase && (
                      <IconSymbol name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <ThemedText style={styles.checkboxLabel}>Lowercase (a-z)</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setUppercase(!uppercase)}
                >
                  <View style={[styles.checkbox, uppercase && styles.checkboxChecked]}>
                    {uppercase && (
                      <IconSymbol name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <ThemedText style={styles.checkboxLabel}>Uppercase (A-Z)</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setNumbers(!numbers)}
                >
                  <View style={[styles.checkbox, numbers && styles.checkboxChecked]}>
                    {numbers && (
                      <IconSymbol name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <ThemedText style={styles.checkboxLabel}>Numbers (0-9)</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setSymbols(!symbols)}
                >
                  <View style={[styles.checkbox, symbols && styles.checkboxChecked]}>
                    {symbols && (
                      <IconSymbol name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <ThemedText style={styles.checkboxLabel}>Symbols (!@#$%^&*)</ThemedText>
                </TouchableOpacity>
              </ThemedView>

              
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.generateButton,
                  { backgroundColor: Colors.light.tint }
                ]}
                onPress={() => handleSubmit()}
              >
                <IconSymbol name="wand.and.stars" size={20} color="white" />
                <ThemedText style={styles.buttonText}>Generate Password</ThemedText>
              </TouchableOpacity>

              
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.resetButton,
                  {
                    backgroundColor: theme === 'light' ? '#666' : '#999',
                    borderColor: theme === 'light' ? '#666' : '#999'
                  }
                ]}
                onPress={resetPasswordState}
              >
                <IconSymbol name="arrow.clockwise" size={20} color="white" />
                <ThemedText style={styles.buttonText}>Reset</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </Formik>

        
        {isPassGenerated && (
          <ThemedView style={styles.passwordDisplay}>
            <ThemedText type="defaultSemiBold" style={styles.passwordLabel}>
              Generated Password:
            </ThemedText>
            <ThemedView style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordText,
                  {
                    color: theme === 'light' ? Colors.light.text : Colors.dark.text,
                    backgroundColor: theme === 'light' ? '#f0f0f0' : '#1a1a1a'
                  }
                ]}
                value={password}
                editable={false}
                multiline
                selectTextOnFocus
              />
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}
              >
                <IconSymbol name="doc.on.doc" size={20} color={Colors.light.tint} />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  form: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 4,
  },
  optionsGroup: {
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  generateButton: {
    backgroundColor: Colors.light.tint,
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  passwordDisplay: {
    marginTop: 20,
  },
  passwordLabel: {
    marginBottom: 8,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  passwordText: {
    flex: 1,
    padding: 16,
    fontSize: 18,
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});