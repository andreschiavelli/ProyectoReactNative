import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:'',
            
        }
    }
    
    render(){
        return(
            <View style={styles.todo}>
            <View style={styles.container}>
                 <View style={styles.Foto}>
                    <Image source={require('../../assets/register.svg')} style={styles.foto}/>   
                </View>
                
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'/>
                    <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />

               <Text style={styles.textError}> {this.props.errorMessage.message}</Text>
               
               {this.state.email.length == 0 || this.state.password.length == 0 || this.state.userName.length == 0 ?
                <TouchableOpacity style={styles.buttonDisabled} disabled={true} onPress={() => this.props.register(this.state.email, this.state.password, this.state.userName)}>
                <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password, this.state.userName)} >
                    <Text style={styles.textButton}>Registrarse</Text>   
                </TouchableOpacity>
                }
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    todo:{
        backgroundColor: '#E8F0F2',
    },
    container:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor: '#E8F0F2',
        paddingBottom: '15%',
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        backgroundColor: 'white',
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width: '40%',
        marginLeft: '30%',
    },
    textButton:{
        color: '#fff'
    },
    textError:{
        color: 'red',
    },
    buttonDisabled: {
        backgroundColor:'gray',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'gray',
        width: '40%',
        marginLeft: '30%',
    },
    foto: {
        width: '300px',
        height: '300px',
    },
    Foto: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Register;