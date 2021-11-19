import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/post'



class buscadorUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            usuariosBuscador: '',
            blanco: '',
        }
    }
    buscarUsuario() {
        console.log(this.state.usuariosBuscador)
        db.collection('posts').where('owner', '==', this.state.usuariosBuscador).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                    this.setState({
                        posteos: posts,
                        // searched: true
                    })
                })
            }


        )

    }

    render() {
        return (
    <View style={styles.container}>
        <TextInput style={styles.input}
    placeholder="Buscar usuario..."
    keyboardType="default"
    onChangeText={text => this.setState({ usuariosBuscador: text }) }
     />
    <TouchableOpacity onPress= {()=>this.buscarUsuario()} style={styles.botonBuscadorUsuario}>
        <Text style={styles.textButton}>Buscar</Text>
    </TouchableOpacity>
        { this.state.usuariosBuscador ?
          <FlatList 
            data= { this.state.posteos }
            keyExtractor = { post => post.id}
            renderItem = { ({item}) => <Post postData={item} 
            value= { this.state.blanco }
            />}
        />  

            :
            <View style={styles.Foto}>
            <Image source={require('../../assets/search.svg')} style={styles.foto}/>   
            </View>
            }
     </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: '#A2DBFA',
        paddingBottom: '60%',
    },
    botonBuscadorUsuario:{
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
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginTop: '30px',
        marginBottom: '15px',
        width: '80%',
        marginLeft: '10%',
        backgroundColor: 'white',
    },
    foto: {
        width: '300px',
        height: '300px',
        marginTop: '10px',
    },
    Foto: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default buscadorUsuarios;
