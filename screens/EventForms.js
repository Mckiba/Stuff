import React, { Component } from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View, CheckBox, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-web';
import * as ImagePicker from 'expo-image-picker';


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
        image: null,
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
    // No permissions request is necessary for launching the image library
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
                <Text style={{color: '#FFFFFF',fontSize:12,fontFamily:'Helvetica Neue',letterSpacing:3.6,opacity: 1,marginBottom:20,marginTop:31}}>WELCOME TO</Text>
                <Image
                    source={require('../assets/logo.png')}   
                    style={{
                    width: 94,
                    height: 84,
                    //marginRight: 10,
                    marginBottom: 2
                }}
                />
                <Text style={{color: '#FFFFFF',fontSize:13,fontFamily:'Helvetica Neue',opacity:1, fontWeight:'bold'}}>LOCALE</Text>
             </View>
            <View style={styles.roundedContainer}>

        <View style={{flexDirection:'row',padding:10, display: 'flex',flexDirection:'row',marginBottom:20}}>
            <TouchableOpacity>           
                <Text style={{fontWeight:'bold',fontSize:15,fontFamily:'Helvetica Neue',color:'#505050',textAlign: 'left',opacity:1,marginRight:41,marginLeft:26, textDecorationLine: 'underline', textDecorationColor: '#FFEC0D'}}>Event Details</Text>
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
          extraHeight={32}
          extraScrollHeight={Platform.OS == "android" ? 32 : 0}
          enableResetScrollToCoords={false}
          onKeyboardDidShow={this._keyboardDidShowHandler}
        >
            <View style={styles.container}>
                <View style={styles.inputTextWrapper}>
                    <Text style={styles.text}>Event Name</Text>
                    <TextInput
                        //placeholder="Event Name"
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onChangeText={this.handleNameChange}
                        ref={this.eventNameInputRef}
                    />
                    {this.state.eventName <1 &&
                        <Text style={styles.errorText}>Please enter event name.</Text>
                    }
                </View>
                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Event Details</Text>
                    <TextInput
                        multiline 
                        style={styles.textInput2}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onChangeText={this.handleDetailsChange}
                        ref={this.detailsInputRef}
                    />
                    {this.state.eventDetails < 1 &&
                        <Text style={styles.errorText}>Please enter Event Details.</Text>
                    }
                </View>
            <View style={{flexDirection:'row'}}>
                <View style={styles.inputTextWrapper,{marginRight: 10}}> 
                <Text style={styles.text}>Event Date</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleDateChange}
                        ref={this.dateInputRef}
                    />
                    {this.state.eventDate<1 &&
                        <Text style={styles.errorText}>Please enter Event Date.</Text>
                    }
                </View>

                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Event Time</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleTimeChange}
                        ref={this.timeInputRef}
                      />
                    {this.state.eventTime < 1 &&
                        <Text style={styles.errorText}>Please enter Event Time.</Text>
                    }
            </View>

                </View>

                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Event Ticket Cost</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleCostChange}
                        ref={this.costInputRef}
                    />
                    {this.state.eventCost <1 &&
                        <Text style={styles.errorText}>Please enter Ticket Cost.</Text>
                    }
                </View>

                <View style={styles.inputTextWrapper}>
                <Text style={styles.text}>Country</Text>
                    <TextInput
                        style={styles.textInput}
                        returnKeyType="next"
                        onSubmitEditing={this.editNextInput}
                        onFocus={this.onInputFocus}
                        onChangeText={this.handleCountryChange}
                        ref={this.countryInputRef}
                      />
                    {this.state.eventCountry < 1 &&
                        <Text style={styles.errorText}>Please enter Event Country.</Text>
                    }
                </View>

                <View style={styles.inputTextWrapper}>
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
                    {this.state.eventLocation < 1 &&
                        <Text style={styles.errorText}>Please enter Event Location.</Text>
                    }
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
                        //returnKeyType="done"
                        //onSubmitEditing={this.editNextInput}
                        //onFocus={this.onInputFocus}
                        //onChangeText={this.onChangeInputHandler}
                        ref={this.flierRef}
                    />
                </View>
                <TouchableOpacity onPress={this.pickImage}>
                <Image
                    source={require('../assets/upload.png')}
                    style={{
                        width:17.31,
                        height: 16.97,
                    }}
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
                     <CheckBox
                          style={styles.checkbox}
                     />
                     <Text style={styles.label}>Terms of Use</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        //value={isSelected}
                        //onValueChange={setSelection}
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
        opacity: 1
    },
    textInput2: {
      height: 70,
      borderColor: "#D1D1D1",
      borderBottomWidth: 1,
      paddingRight: 30,
      fontFamily: 'Helvetica Neue',
      fontSize: 12,
      color:'#717171',
      opacity: 1
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
        opacity: 1      },
  });