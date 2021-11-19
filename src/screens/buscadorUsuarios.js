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
            // searched: false,
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
    placeholder="Buscar"
    keyboardType="default"
    onChangeText={text => this.setState({ usuariosBuscador: text }) }
     />
    <TouchableOpacity onPress= {()=>this.buscarUsuario()} style={styles.botonBuscadorUsuario}></TouchableOpacity>
    <FlatList 
          data= { this.state.posteos }
          keyExtractor = { post => post.id}
          renderItem = { ({item}) => <Post postData={item} />}
        />
     </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    formContainer: {
        backgroundColor: '#ccc',
        marginHorizontal: 10,
        padding: 10,
    },
    field: {
        borderColor: '#444',
        borderWidth: 1,
        borderStyle: 'solid',
        height: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    image: {
        height: 250,
    },
    touchable: {
        backgroundColor: '#ccc',
        borderRadius: 4,
        marginVertical: 10,
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
        
    },
})

export default buscadorUsuarios;
