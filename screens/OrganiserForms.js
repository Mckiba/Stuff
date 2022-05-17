import React, { Component } from 'react';
import {Alert, Button, Keyboard, Platform, StyleSheet, Text, TextInput, View, CheckBox, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-web';
import Checkbox from 'expo-checkbox';



export default class AddOrganiser extends Component {

  organiserNameInputRef = React.createRef();
  emailAddressRef = React.createRef();
  phoneNumberRef = React.createRef();
  countryRef = React.createRef();
  addressRef = React.createRef();
  parishRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      organiserName: '',
      organiserEmail: '',
      organiserPhone: '',
      organiserCountry: '',
      organiserAddress: '',
      organiserParish: '',
      dateUploaded: new Date().toLocaleString(),
      dateReviewed: null,
      termsSelected: false,
      policySelected: false,
    };
    this.submitPressed = this.submitPressed.bind(this);
  }


  inputs = () => {
    return [
      this.organiserNameInputRef,
      this.emailAddressRef,
      this.phoneNumberRef,
      this.countryRef,
      this.addressRef,
      this.parishRef,
    ];
  };

  editNextInput = () => {
    console.log("editNextInput")
    const activeIndex = this.getActiveInputIndex();
    if (activeIndex === -1) {
        return;
    }
    const nextIndex = activeIndex + 1;
    if (nextIndex < this.inputs().length && this.inputs()[nextIndex].current != null) {
        this.setFocus(this.inputs()[nextIndex], true);
    } else {
        this.finishEditing();
    }
  }

  handleNameChange = (organiserName) => {
    this.setState({organiserName});  
  }
  handleEmailChange = (organiserEmail) => {
    this.setState({organiserEmail});  
  }
  handlePhoneChange = (organiserPhone) => {
    this.setState({organiserPhone});  
  } 
  handleCountryChange = (organiserCountry) => {
    this.setState({organiserCountry});  
  } 
  handleAddressChange = (organiserAddress) => {
    this.setState({organiserAddress});  
  } 
  handleParishChange = (organiserParish) => {
    this.setState({organiserParish});  
  }
  setTermsSelection =  () => {
    this.state.termsSelected ? this.setState({termsSelected: false}) : this.setState({termsSelected: true}) 
  };
  setPolicySelection =  () => {
    this.state.policySelected ? this.setState({policySelected: false}) : this.setState({policySelected: true}) 
 };

  getActiveInputIndex = () => {
    const activeIndex = this.inputs().findIndex((input) => {
        if (input.current == null) {
            return false;
        }
        console.log("input: ", input);
        return input.current.isFocused();
    });
    console.log("activeIndex: ", activeIndex);
    return activeIndex;
  }

  finishEditing = () => {
    const activeIndex = this.getActiveInputIndex();
    if (activeIndex === -1) {
        return;
    }
    this.setFocus(this.inputs()[activeIndex], false);
  }

  setFocus(textInputRef, shouldFocus) {
    if (shouldFocus) {
        setTimeout(() => {
            textInputRef.current.focus();
        }, 100);
    } else {
        textInputRef.current.blur();
    }
  }

  Register = async (eventData) => {
    try{
        const response = await fetch(`http://localhost:3000/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify(eventData)
        });
        if(response.ok){
            return true;
        }
        const msg = await response.text()
        throw new Error(msg);
    } catch(err){
        throw err
    }
  }

   submitPressed = async() => {
     if(this.state.organiserAddress == '' || this.state.organiserName == '' , this.state.organiserPhone == '' ){
      alert("Enter All Required Feilds")
     }else {
        const eventParams = this.props.route.params;
        Keyboard.dismiss();
        let eventForms = {
          ...eventParams,
          ...this.state
        }
        const res = await this.Register(eventForms);
        if(res){
          this.props.navigation.navigate('Confirmation', this.state);
        }
     }
  }

  render() {
    return (
        <View style={{ backgroundColor: '#03A9F5', alignItems: "center", marginTop:0}}>
            <View style={{  flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
                <Text style={{color: '#FFFFFF',fontSize:12,fontFamily:'Helvetica Neue',letterSpacing:3.6,opacity: 1,marginBottom:20,marginTop:31}}>WELCOME TO</Text>
                <Image
                    source={require('../assets/logo.png')}   
                    style={{
                    width: 94,
                    height: 84,
                    marginBottom: 2
                }}
                />
                <Text style={{color: '#FFFFFF',fontSize:13,fontFamily:'Helvetica Neue',opacity:1, fontWeight:'bold'}}>LOCALE</Text>
             </View>
            <View style={styles.roundedContainer}>

        <View style={{flexDirection:'row',padding:10, display: 'flex',flexDirection:'row',marginBottom:20}}>
            <TouchableOpacity>           
            <Text onPress={()=>{this.props.navigation.navigate('AddEvent')}}  style={{fontSize:15,opacity:1,color:'#B1B1B1',fontFamily:'Helvetica Neue',textAlign:'left',marginRight:41,marginLeft:26}}>Event Details</Text>
            </TouchableOpacity>           
            <TouchableOpacity>            
            <Text style={{fontWeight:'bold',fontSize:15,fontFamily:'Helvetica Neue',color:'#505050',textAlign: 'left', textDecorationLine: 'underline', textDecorationColor: '#FFEC0D'}}>Organiser's Details</Text>
            </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          style={styles.container}
          contentOffset={{ x: 0, y: 24 }}
          ref={this._scrollViewRef}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: 24 }}
          contentInsetAdjustmentBehavior="always"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          enableOnAndroid={true}
          extraHeight={32}
          extraScrollHeight={Platform.OS == "android" ? 32 : 0}
          enableResetScrollToCoords={false}
          onKeyboardDidShow={this._keyboardDidShowHandler}
        >
            <View style={styles.container}>
                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Organiser’s Name</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onChangeText={this.handleNameChange}
                        ref={this.organiserNameInputRef}
                    />
                </View>
                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Email Address</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onChangeText={this.handleEmailChange}
                        ref={this.emailAddressRef}
                    />
                </View>
                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Phone Number</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handlePhoneChange}
                        ref={this.phoneNumberRef}
                    />
                </View>

                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Country</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleCountryChange}
                        ref={this.countryRef}
                      />
                </View>

                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Contact Address</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleAddressChange}
                        ref={this.addressRef}
                    />
                </View>

                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Parish/Province/State</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleParishChange}
                        ref={this.parishRef}
                      />
                </View>
                <View style={styles.checkboxContainer}>
                     <Checkbox
                          value={this.state.termsSelected}
                          onValueChange={this.setTermsSelection}
                          style={styles.checkbox}
                     />
                     <Text style={styles.label}>Terms of Use</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={this.state.policySelected}
                        onValueChange={this.setPolicySelection}
                        style={styles.checkbox}
                    />
                <Text style={styles.label}>Privacy Policy</Text>
                </View>
                <View style={styles.btnContainer}>
                  <Button title="Submit Details" onPress={this.submitPressed} />
                </View>

            </View>
        </KeyboardAwareScrollView>
        </View>
        </View>
      );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingBottom: 100,
    },
    roundedContainer: {
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: "white",
        marginTop: 10,
        width: '100%'
      },
    header: {
      fontSize: 36,
      padding: 24,
      margin: 12,
      textAlign: "center",
    },
    tabText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 15,
        fontWeight:'bold'
    },
    inputTextWrapper: {
      marginBottom: 24,
      flexDirection:'column'
    },
    text:{
        fontFamily: 'Helvetica Neue',
        color:'#717171',
        fontSize: 12,
        opacity: 1
    },
    textInput: {
        borderColor: "#D1D1D1",
        fontFamily: 'Helvetica Neue',
        color:'#717171',
        fontSize: 12,
        opacity: 1,
        borderBottomWidth: 1,
        paddingRight: 30,
        height: 40,
    },
    errorText: {
      color: 'red',
      fontSize: 10,
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop:36,
      borderRadius: 5,
      height: 43,
      width: 321
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
        color:'#A79E9E',
      },
      label: {
        fontFamily: 'Helvetica Neue',
        color:'#717171',
        opacity: 1,
        fontSize: 12,
        margin: 8,
      },
  });