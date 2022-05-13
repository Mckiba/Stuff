import React, { Component } from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-web';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import {Picker} from '@react-native-picker/picker';

export default class AddEvent extends Component {
  eventNameInputRef = React.createRef();
  detailsInputRef = React.createRef();
  dateInputRef = React.createRef();
  timeInputRef = React.createRef();
  costInputRef = React.createRef();
  countryInputRef = React.createRef();
  locationInputRef = React.createRef();
  checkoutLinkInputRef = React.createRef();
  flierRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
        eventName: '',
        eventDetails: '',
        eventDate: '',
        eventTime: '',
        eventCost: '',
        eventCountry: '',
        eventLocation: '',
        checkoutLink: '',
        status: 'Pending',
        image: null,
        termsSelected: false,
        policySelected: false,
    };
    this.submitPressed = this.submitPressed.bind(this);
  }

  inputs = () => {
    return [
      this.eventNameInputRef,
      this.detailsInputRef,
      this.dateInputRef,
      this.timeInputRef,
      this.costInputRef,
      this.countryInputRef,
      this.locationInputRef,
      this.checkoutLinkInputRef,
      this.flierRef
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

  handleDateChange = (date) => {
    this.setState({date});
  }

  handleTimeChange = (time) => {
    this.setState({time});
  }

  handleNameChange = (eventName) => {
    this.setState({eventName});  
  }

  handleDetailsChange = (eventDetails) => {
    this.setState({eventDetails});  
  }
  handleDateChange = (eventDate) => {
    this.setState({eventDate});  
  }
  handleTimeChange = (eventTime) => {
    this.setState({eventTime});  
  }
  handleCostChange = (eventCost) => {
    this.setState({eventCost});  
  }
  handleCountryChange = (eventCountry) => {
    this.setState({eventCountry});  
  }
  handleLocationChange = (eventLocation) => {
    this.setState({eventLocation});  
  }
  handleCheckoutlinkChange = (checkoutLink) => {
    this.setState({checkoutLink});  
  }

  onChangeInputHandler = (name, value) => {
    this.setState({
        [name]: value,
    });
  }

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

   pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri })   
    }
  };

  deleteImage =  () => {
      this.setState({ image: null })   
  };

  setTermsSelection =  () => {
    this.state.termsSelected ? this.setState({termsSelected: false}) : this.setState({termsSelected: true}) 
  };

  setPolicySelection =  () => {
    this.state.policySelected ? this.setState({policySelected: false}) : this.setState({policySelected: true}) 
 };

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

  submitPressed() {
    console.log("submitPressed this.state: ", this.state);
    Keyboard.dismiss();
    this.props.navigation.navigate('AddOrganiser', this.state); 
  }

  render() {
    return (
      
        <View style={{ backgroundColor: '#03A9F5', alignItems: "center", marginTop:0}}>
            <View style={{  flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
                <Text style={styles.headerText}>WELCOME TO</Text>
                <Image
                    source={require('../assets/logo.png')}   
                    style={{  width: 94, height: 84, marginBottom: 2}}
                />
                <Text style={{color: '#FFFFFF',fontSize:13,fontFamily:'Helvetica Neue',opacity:1, fontWeight:'bold'}}>LOCALE</Text>
            </View>  
            <View style={styles.roundedContainer}>
              <View style={{flexDirection:'row',padding:10, display: 'flex',flexDirection:'row',marginBottom:20}}>
                  <TouchableOpacity>           
                      <Text style={styles.eventText}>Event Details</Text>
                  </TouchableOpacity>           
                  <TouchableOpacity>            
                      <Text  onPress={()=>{this.props.navigation.navigate('AddOrganiser')}} style={{fontSize:15,opacity:1,color:'#B1B1B1',fontFamily:'Helvetica Neue',textAlign:'left'}}>Organiser's Details</Text>
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
                //extraHeight={32}
                extraScrollHeight={Platform.OS == "android" ? 32 : 0}
                enableResetScrollToCoords={false}
                onKeyboardDidShow={this._keyboardDidShowHandler}
              >
                  <View style={styles.container}>
                      <View style={styles.inputTextWrapper}>
                      {this.state.eventName <1 &&
                              <Text style={styles.errorText}>*</Text>
                          }
                          <Text style={styles.text}>Event Name</Text>
                          <TextInput
                              style={styles.textInput}
                              returnKeyType="next"
                              onSubmitEditing={this.editNextInput}
                              onChangeText={this.handleNameChange}
                              ref={this.eventNameInputRef}
                          />
                      </View>
                      <View style={styles.inputTextWrapper}>
                      {this.state.eventDetails <1 &&
                              <Text style={styles.errorText}>*</Text>
                          }
                      <Text style={styles.text}>Event Details</Text>
                          <TextInput
                              multiline 
                              style={styles.textInput2}
                              returnKeyType="next"
                              onSubmitEditing={this.editNextInput}
                              onChangeText={this.handleDetailsChange}
                              ref={this.detailsInputRef}
                          />
                    </View>

                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <View style={styles.inputTextWrapper}> 
                        <Text style={styles.text}>Event Date</Text>
                        <View style={{flexDirection:'row'}}>
                          <TextInput
                              style={styles.textInput}
                              returnKeyType="next"
                              onSubmitEditing={this.editNextInput}
                              onFocus={this.onInputFocus}
                              onChangeText={this.handleDateChange}
                              ref={this.dateInputRef}
                          />
                          <Image style={styles.icon} source={require('../assets/date.png')} />
                        </View>
                        {this.state.eventDate <1 &&
                            <Text style={styles.errorText}>*</Text>
                        }
                      </View>

                      <View style={styles.inputTextWrapper}>
                        <Text style={styles.text}>Event Time</Text>
                        <View style={{flexDirection:'row'}}>
                          <TextInput
                              style={styles.textInput}
                              returnKeyType="next"
                              onSubmitEditing={this.editNextInput}
                              onFocus={this.onInputFocus}
                              onChangeText={this.handleTimeChange}
                              ref={this.timeInputRef}
                            />
                            <Image style={styles.icon} source={require('../assets/time.png')} />
                        </View>
                         {this.state.eventTime <1 &&
                             <Text style={styles.errorText}>*</Text>
                          }
                     </View>
                  </View>

                  <View style={styles.inputTextWrapper}>
                    {this.state.eventCost <1 &&
                        <Text style={styles.errorText}>*</Text>
                      }
                    <Text style={styles.text}>Event Ticket Cost</Text>
                      <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleCostChange}
                        ref={this.costInputRef}
                      />
                  </View>

                      <View style={styles.inputTextWrapper}>
                      {this.state.eventCountry <1 &&
                              <Text style={styles.errorText}>*</Text>
                          }
                      <Text style={styles.text}>Country</Text>
                        <View style={styles.textInput}>
                          <Picker
                              style={styles.picker} itemStyle={styles.pickerItem}
                              selectedValue={this.state.language}
                              onValueChange={(itemValue) => this.setState({eventCountry: itemValue})}
                            >
                            <Picker.Item label="Jamaica" value="Jamaica" />
                            <Picker.Item label="Aruba" value="Aruba" />
                            <Picker.Item label="Trinidad" value="Trinidad" />
                            <Picker.Item label="St Lucia" value="St Lucia" />
                          </Picker>    
                          </View>                
                      </View>

                      <View style={styles.inputTextWrapper}>
                          {this.state.eventLocation <1 &&
                            <Text style={styles.errorText}>*</Text>
                          }
                        <Text style={styles.text}>Event Location</Text>
                        <TextInput
                          style={styles.textInput}
                          returnKeyType="next"
                          keyboardType='numeric'
                          onSubmitEditing={this.editNextInput}
                          onFocus={this.onInputFocus}
                          onChangeText={this.handleLocationChange}
                          ref={this.locationInputRef}
                        />
                      </View>

                      <View style={styles.inputTextWrapper}>
                        <Text style={styles.text}>Check Out Link</Text>
                        <TextInput
                            style={styles.textInput}
                            returnKeyType="done"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.handleCheckoutlinkChange}
                            ref={this.checkoutLinkInputRef}
                          />
                      </View>
                      <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                      <View style={styles.inputTextWrapper}>
                        <Text style={styles.text}>Upload Flier</Text>
                            <TextInput
                                style={styles.textInput}
                                ref={this.flierRef}
                            />
                      </View>
                      <TouchableOpacity onPress={this.pickImage}>
                      <Image
                          source={require('../assets/upload.png')}
                          style={{width:17.31, height: 16.97}}
                      />
                      </TouchableOpacity > 
                      </View>
                      <View style={{alignContent: 'flex-start'}}>      
                          {this.state.image && <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                              <Image source={{ uri: this.state.image }} style={{ width: 284, height: 285 }}  /> 
                              <TouchableOpacity  onPress={this.deleteImage}>
                                  <Image 
                                      source={require('../assets/bin.png')}
                                      style={{width:33,height:33}}
                                  />
                              </TouchableOpacity>
                              </View>}
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
                        <Button title="Continue" onPress={this.submitPressed} />
                      </View>
                  </View>
              </KeyboardAwareScrollView>
            </View>
        </View>
      );}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingBottom: 100,
    },
    headerText: {
      color: '#FFFFFF',fontSize:12,fontFamily:'Helvetica Neue',letterSpacing:3.6,opacity: 1,marginBottom:20,marginTop:31
    },
    eventText: {
      fontWeight:'bold',fontSize:15,
      fontFamily:'Helvetica Neue',color:'#505050',
      textAlign: 'left',opacity:1,marginRight:41,marginLeft:26, 
      textDecorationLine: 'underline', textDecorationColor: '#FFEC0D'
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
      flexDirection:'column',
    },
    text:{
        fontFamily: 'Helvetica Neue',
        fontSize: 12,
        color:'#717171',
        opacity: 1
    },
    textInput: {
        height: 40,
        borderColor: "#D1D1D1",
        borderBottomWidth: 1,
        paddingRight: 30,
        fontFamily: 'Helvetica Neue',
        fontSize: 12,
        color:'#717171',
        opacity: 1,
    },
    textInput2: {
      height: 100,
      borderColor: "#D1D1D1",
      borderBottomWidth: 1,
      paddingRight: 30,
      fontFamily: 'Helvetica Neue',
      fontSize: 12,
      color:'#717171',
      opacity: 1,
  },
    errorText: {
      color: 'red',
      fontSize: 10,
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop:36,
      borderRadius:5,
      height: 43,
      width: 321
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
      fontFamily: 'Helvetica Neue',
      fontSize: 12,
      color:'#717171',
      opacity: 1      
    },
    icon:{
      width:19,height:21, position: 'absolute',marginLeft: '90%'
    },
    picker: {
      width: '100%',
      height: 40,
      backgroundColor: 'white',
      borderColor: 'white'
    },
    pickerItem: {
      color: '#717171',
      fontSize: 12,
      fontWeight: 'normal'
    },
  });