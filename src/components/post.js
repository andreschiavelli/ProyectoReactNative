import React, { Component } from 'react';
<<<<<<< Updated upstream
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Image} from 'react-native';
=======
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList} from 'react-native';
>>>>>>> Stashed changes
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           myLike:false,
           showModal: false, //Para la vista del modal
           comment:'', //para limpiar el campo después de enviar.
        }
    }
    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
            likes:this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email),  
        })
        }
        
    }

    darLike(){
        //Agregar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.state.likes + 1,
                myLike: true,
            })
        })
    }
    quitarLike(){
        //Quitar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.state.likes - 1,
                myLike: false,
            })
        })
    }
    showModal(){
        this.setState({
            showModal:true,
        })
    }

    hideModal(){
        this.setState({
            showModal:false,
        })
    }

    guardarComentario(){
        console.log('Guardadno comentario...');
        let oneComment = {
            createdAt: Date.now(),
            author: auth.currentUser.email,
            comment: this.state.comment, 
        }
        //identifacar el documento que queremos modificar.
         db.collection('posts').doc(this.props.postData.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
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
            <View>Photo: {this.state.likes} </View> 
            <Image 
                style={styles.img}
                source={this.props.postData.data.photo}
            />
             {/* Cambio de botones me gusta/ me dejó de gustar */}
            {
                this.state.myLike == false ?
                <TouchableOpacity onPress={()=>this.darLike()}>
                    <Text>Me gusta</Text>
                </TouchableOpacity> :
                <TouchableOpacity onPress={()=>this.quitarLike()}>
                    <Text>Quitar like</Text>
                </TouchableOpacity>                       
            }
            {/* Ver modal */}
            <TouchableOpacity onPress={()=>this.showModal()}>
                <Text>Ver Comentarios</Text>
            </TouchableOpacity>

            {/* Modal para comentarios */}
            {   this.state.showModal ?
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
                    {/* Formulario para nuevo comentarios */}
                    <View>
                        <TextInput placeholder="Comentar..."
                            keyboardType="default"
                            multiline
                            onChangeText={text => this.setState({comment: text})}
                            value={this.state.comment}
                        />
                        <TouchableOpacity onPress={()=>{this.guardarComentario()}}>
                            <Text>Guadar comentario</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>    :
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
<<<<<<< Updated upstream
    img:{
        flex:1
=======
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
>>>>>>> Stashed changes
    }
})

export default Post