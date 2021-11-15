import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FlatList, TextInput } from 'react-native-gesture-handler';

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           myLike: false,
           showModal: false,
           comment: '',
        }
    }
    
    componentDidMount(){ 
        if(this.props.postData.data.likes){
            this.setState({    
                likes: this.props.postData.data.likes.length,
                myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
            })
        }   
    }

    darLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes + 1,
                myLike: true,
            })
        })
    }

    quitarLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes - 1,
                myLike: false,
            })
        })
    }

    showModal(){
        this.setState({
            showModal: true,
        })
    }

    hideModal(){
        this.setState({
            showModal: false,
        })
    }

    guardarComentario(){
        let oneComment= {
            createdAt: Date.now(),
            author: auth.currentUser.email,
            comment: this.state.comment, 
        }
        db.collection('posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then( () =>{
            this.setState({
                comment: '',
            })
        })
    }

    render(){
        return(
            <View style={styles.contanier}>
             <Text>Texto del post: {this.props.postData.data.texto}</Text>
             <Text>user: {this.props.postData.data.owner} </Text>
             <Text>Likes: {this.state.likes} </Text>  

            { 
                this.state.myLike == false ?
                <TouchableOpacity onPress={()=>this.darLike()}>
                    <Text>Me gusta</Text>
                </TouchableOpacity> :
                <TouchableOpacity onPress={()=>this.quitarLike()}>
                <Text>Quitar Like</Text>
                </TouchableOpacity>
            } 

            <TouchableOpacity onPress={() => this.showModal()}>
            <Text>Ver Comentarios</Text>
            </TouchableOpacity>

            {
                this.state.showModal ?
               <Modal style={styles.modalContainer}
                   visible= {this.state.showModal}
                   animationType= 'slide'
                   transparent= {false}
                >
                    <TouchableOpacity onPress={() => this.hideModal()}>
                        <Text style={styles.closeButton}>X</Text>
                    </TouchableOpacity>

                    <FlatList 
                        data={this.props.postData.data.comments}
                        keyExtractor={ comment => comment.createdAt.toString()}
                        renderItem= {({item}) => <Text>{item.author}:{item.comment}</Text>}
                    />


                    <View>
                        <TextInput 
                            placeholder="Comentar..."
                            multiline
                            onChangeText= { text => this.setState({comment:text}) }
                            value={this.state.comment}
                        />
                        <TouchableOpacity onPress={() => this.guardarComentario()}>
                            <Text>Guardar comentario</Text>
                        </TouchableOpacity>
                    </View>
               </Modal> :
               <Text></Text>
            }
            
            </View>
        )
    }

}


const styles = StyleSheet.create({
    contanier:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
    },
    modalContainer:{
        width: '97%',
        borderRadius: 4,
        padding: 5,
        alignSelf: 'centre',
        boxShadow: 'rgb(204 204 204) 0px 0px 9px 7px',
        marginTop: 20, 
        marginBottom: 10,
    },
    closeButton:{
        color: '#fff',
        backgroundColor: '#dc3545',
        padding: 5,
        alignSelf: 'flex-end',
        borderRadius: 4,
        paddingHorizontal: 8,
    }
})

export default Post