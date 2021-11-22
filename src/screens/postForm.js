import { NavigationRouteContext } from '@react-navigation/core';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import MyCamera from '../components/myCamera';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            textoPost: '',
            showCamera: true,
            url: '',
        };
    }

    submitPost(){
        console.log('posteando...');
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            photo: this.state.url,
        })
        .then( () =>{
            this.setState({
                textoPost: '',
            })
            this.props.drawerProps.navigation.navigate('Home')
        })
        .catch()
    }

    onImageUpload(url){
        this.setState({
            showCamera: false,
            url: url,
        })
    }
    
    render() {
        return (
        <View style={styles.wrap}>
        {
            this.state.showCamera ?
            <MyCamera onImageUpload={(url) => {this.onImageUpload(url)}}/> :
        
        <View>
            <Text style={styles.descripcion}>Agrega una descripción:</Text>
            <TextInput style={styles.input} 
            keyboardType='default'
            placeholder='Escriba aqui'
            multiline
            value={this.state.textoPost}
            onChangeText={ text => this.setState({textoPost:text}) }/>
 
            <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()}>
                    <Text style={styles.textButton}>Todo listo, ¡Publicar Foto!</Text>    
            </TouchableOpacity>
        </View>
        }
        </View>
        );
    }
}
const styles = StyleSheet.create({
    wrap:{
        flex: 1,
        backgroundColor: '#E8F0F2',
    },
    input:{
        Altura: 400,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor:'#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        width: '80%',
        marginLeft: '10%',
        marginTop: '20px',
        backgroundColor: 'white',
    },
    button:{
        backgroundColor: '#053742',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        width: '30%',
        marginLeft: '35%',
        marginTop: '20px',
        borderStyle: 'solid',
        borderColor: '#053742',
    },
    textButton:{
        color: '#fff'
    },
    descripcion:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '50px',
        marginLeft: '10%',
        textAlign: 'left',
    },
})

export default PostForm;