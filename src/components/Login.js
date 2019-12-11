import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const dark = '#297ac3';
const white = '#fff';

const appFont = 'Titillium-Semibold';

class Login extends Component {

    state = {
        heightOfInnerContainer: 0,
        user: '',
        password: '',
        isEmail: false,
        isPassword: false,
        isEmailEmpty: false,
        isPasswordEmpty: false,
        wrongCredentials: false,
        isChecked: true,
    }

    static navigationOptions = {
        header: null,
    }

    handleLogin = () => {

        //if (this.state.email == '') {
        //    this.setState({ isEmailEmpty: true })
        //}

        //if (this.state.password == '') {
        //    this.setState({ isPasswordEmpty: true })
        //}

        if (this.state.user.toLowerCase() == 'meezanhq' && this.state.password.toLowerCase() == 'hqmeezan') {
            this.props.navigation.navigate('dashboard');
        }
        else if (this.state.user == '' && this.state.password == '') {
            ToastAndroid.showWithGravity(
                'Please fill all the fields!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else {
            ToastAndroid.showWithGravity(
                'Wrong Credentials!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

    }

    handleClick = () => {
        this.setState({ isChecked: !this.state.isChecked });
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
            >

                <StatusBar backgroundColor={dark} barStyle="light-content" />

                <Image source={require('../assets/icon.png')} style={{ height: screenHeight * 0.4, width: screenHeight * 0.4, }} />

                <View style={styles.inputsContainer}>

                    <View style={{ marginVertical: screenHeight * 0.02 }}>
                        <Text style={styles.inputTitle}>User</Text>

                        <View style={styles.innerContainer}>

                            <TextInput
                                style={styles.textInput}
                                placeholder='User Name'
                                onFocus={() => this.setState({ isEmail: !this.state.isEmail })}
                                onBlur={() => this.setState({ isEmail: !this.state.isEmail })}
                                onChangeText={(user) => this.setState({ user })}
                            />
                            <MaterialIcon name='person' size={26} color={this.state.isEmail ? dark : '#bbb'} />

                        </View>

                    </View>

                    <View style={{ marginVertical: screenHeight * 0.02 }}>
                        <Text style={styles.inputTitle}>Password</Text>

                        <View style={styles.innerContainer}>

                            <TextInput
                                secureTextEntry={this.state.isChecked}
                                style={styles.textInput}
                                placeholder='Your Password'
                                onFocus={() => this.setState({ isPassword: !this.state.isPassword })}
                                onBlur={() => this.setState({ isPassword: !this.state.isPassword })}
                                onChangeText={(password) => this.setState({ password })}
                            />
                            <MaterialIcon name='lock' size={26} color={this.state.isPassword ? dark : '#bbb'} />

                        </View>

                    </View>

                    <View style={styles.showPassword}>

                        <CheckBox
                            style={{ padding: 10 }}
                            onClick={this.handleClick}
                            isChecked={!this.state.isChecked}
                            checkBoxColor={dark}
                        />

                        <Text style={styles.text}>Show Password</Text>

                    </View>

                    <TouchableOpacity
                        onPress={this.handleLogin}
                        style={styles.button}
                    >
                        <MaterialIcon name='keyboard-arrow-right' size={40} color={white} />
                    </TouchableOpacity>

                </View>

            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
    },
    logoContainer: {
        height: screenHeight * 0.4, width: screenHeight * 0.4, left: -screenHeight * 0.05, top: -screenHeight * 0.1, borderRadius: screenHeight * 0.2,
        backgroundColor: dark, alignItems: 'center', justifyContent: 'center', elevation: 6,
    },
    title: {
        color: white, fontSize: screenHeight * 0.05, fontFamily: appFont,
    },
    inputsContainer: {
        marginHorizontal: screenWidth * 0.1, marginVertical: screenHeight * 0.05,
    },
    inputTitle: {
        fontFamily: appFont, color: dark,
    },
    gradientContainer: {
        borderRadius: screenHeight * 0.02,
    },
    innerContainer: {
        borderRadius: screenHeight * 0.02, marginVertical: screenHeight * 0.001, flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenWidth * 0.04,
        justifyContent: 'space-between', backgroundColor: white, width: '99%', alignSelf: 'center', elevation: 3,
    },
    textInput: {
        width: '90%'
    },
    button: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: dark, alignSelf: 'flex-end', height: screenWidth * 0.13, width: screenWidth * 0.25,
        borderRadius: screenWidth * 0.75, elevation: 3, marginVertical: screenHeight * 0.01, marginTop: screenHeight * 0.02
    },
    buttonText: {
        color: white, fontSize: screenHeight * 0.03, fontFamily: appFont,
    },
    text: {
        fontFamily: appFont, color: dark,
    },
    showPassword: {
        flexDirection: 'row', alignItems: 'center'
    }
});

export default Login;

