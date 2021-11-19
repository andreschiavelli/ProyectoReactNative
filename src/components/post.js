import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Image, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           myLike: false,
           showModal: false, 
           comment:'', 
        }
    }

    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
            likes: this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email),  
            })
        }
        if(this.props.postData.data.comment){
            this.setState({
            comment:this.props.postData.data.comment.length,
            myComment: this.props.postData.data.comment.includes(auth.currentUser.email),  
            })
        } 
    }

    darLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.props.postData.data.likes.length,
                myLike: true,
            })
        })
    }

    quitarLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.props.postData.data.likes.length,
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
        console.log('Guardando comentario...');
        let oneComment = {
            createdAt: Date.now(),
            author: auth.currentUser.email,
            comment: this.state.comment, 
            comments:this.props.postData.data.comment.length,
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
        console.log(this.props.postData.data.photo)
        return(
         <View style={styles.todo}> 
            <View style={styles.contanier}>
                
                <Text style={styles.usuario}>{this.props.postData.data.owner}</Text> 

            <View style={styles.foto}>
             <Image 
                style={styles.img}
                source={{uri:this.props.postData.data.photo}}/>
            </View> 
            
            <View style={styles.nombre}>
                <Text style={styles.user}>{this.props.postData.data.owner}: </Text> <Text>{this.props.postData.data.texto}</Text>
            </View> 
            <Image style={styles.line} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAMUlEQVRIie3NoQEAIAwEsYe52B7k71RUbWVBXBaIBADAb4btLWk1v2c2hykevQAAFC6/1AUqX0goLAAAAABJRU5ErkJggg=="}}></Image>
            <View style={styles.iconos}>
                {/* Cambio de botones me gusta/ me dejó de gustar */}
                {
                    this.state.myLike == false ?
                    <TouchableOpacity style={styles.logos} onPress={()=>this.darLike()}>
                        <Text style={styles.numero}>{this.state.likes}  </Text>
                        <Image style={styles.icons} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADzklEQVRoge2ZTWgVVxiGn0k09QdRNFgliFWrVkU0oWgUCyqKgrhwVxCrIkjBirsgjSItIlrRlqKilNa/rlwKLkyLiAv/St1YdRVLCcbfmMQ01hiT18X5Jpkkc++de+/cO13cF4Y7d8457/fMzJkz53wDJZVUUklJysumsqAMmAhMAiqBDqDRgxe5BJfzmAGMwXk8AZ56oFz80gVaITgleCxQyNYoOCKYGcFrpuCotQnzahacFCyPA7xa8HvAvEdwT9AguCC4NAjkncGNDvEaLfje6gRP/JJ5NQjuWwy/vEGwMFf4bYKuQKAv5bpOWN2PBHsEz6z+Q0F1oLxG8LeVPRPUC6am8JpssfwL80awNVv4fda4W1AnqIjYbpzgZ2vbYuA1gpd27CfB2IheFYLdxiDB3qjwGwW9gnbBqkiNhnrsNI8Wg+8VfJWj12rBK/P4PFPlaYL/rB+uyyVgwKs+0Je/ztNrvTG9TtX1/Iq/WsCD+QQ0rzLBZduyGq5T+H1nbOdSVfjYzvJ51H4aIegUwZSYvMYJXhjjdP94WaDOBvv/iwftcQT1oMmDppi82oDTOMYNQyoIrtktWhpHwEJIsMwYr4YVPrHbMywBtkgSDDfG5lQFjxNii6zBF9p/BkbafmdiZNHViWMd2XdE4NkbryUxrIgStAreDhmaBU9tovVBQmwZJRgxuKsHh9G/gHJynf0VRzU45rv+geAJ3LbfJcUkylK19vvHkBLBKhtjrxeXKboEN41xZVhhueCRzfpmJcCXVoJPDL5JgZ7Tt+NBD3DW7eY3eyyQfKbTHvSG1hBU2ty7WzCveGzpJZhvI2S7YEKmyt/4z4IGPuSJyLr2LWPaF6XBCMEDa1BfBMZMPP7y9l7kd5Sg1t52PYK1BWZMx7HOGLoEi7JtvMPO/N8kptiCRYIOY9ieq8lxM3iuIr6h5TIZLRb7x3yMygTnzai1GHfCFi1tFvNM3utpwTAzklzGYlNMrGGxNlsMyeWXyuMy9gSH1Z8mORrnys0u0g8B/0N5X/kUgTbJ5WYk+E3wYQyekwRXzLNTsDEO1nQBF8jlPv085/o8vNbIZaMl+EfwaZys6QJPkMsqyyZ/xxRc4mVuP0pwwtpKcFEwvpDMqUC+CIzVjYLPIrRZHHjTvxbsKkh/jyq5DxY31J/N3q+QbLZctvmA+r8PXJf7OpO8bBTZLZfLl+BPBdYUgtmCO4GhuC62ITJOCeaqf+bYIdhim9/NbgrmJM2ZVnY3vtXAT0Xv5Kbp/7+rnkqClTZENgtWJM2TkwRVgqqkOUoqpN4DXKFZ5cK3azwAAAAASUVORK5CYII="}}></Image>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.logos} onPress={()=>this.quitarLike()}>
                        <Text style={styles.numero}>{this.state.likes}  </Text>
                        <Image style={styles.icons} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACnElEQVRoge2ZS2tTQRiGn5NaarWIi3qroFgVLxtb3HvBjYIuvBREFyKu/QUqBeuuiCIIdaHg1rULbxtXLlwrXjDgQq2a4ibGltS8LuacOInNZcaTTAJ54YM5J8M3z5uZnDPzBXrqqaeeQipy6SzIAGuB9cAwkAeyEXzzGVwm1ygwBOSAWeBrBPLJV2+gg4I7gi8CLRHvBFOCXU3k2h33fV8j12fBjOBAGuDjgmc1BloqSoK7MrNTnWs4/qzkkO+JYMwX/oJgwWEwO3KCI1auQ4I5z1zzgvOu8JOeg9lRFEwIDgsKKeS70iz8WcdprhcL8TeYRq6S4HQj+C2CXykN2IooCDbbzJkqD9eA5S7Lrc0aBKbsG+X3gGAb8JZ/TXWaSsD2CLJQCXuCzocHw3jcvkh0tP0s3jqWNGwDOwKA+KrMGgEI+oF5umMJgfkdDESwmACvoHvgwbCuhL8z0AcshiRylIBlEZQyABH8BubCMjkpF5llVLFsXgeC8dGrpGEbeBkAxFdlVtvA4wAgvnqUNOytRD/wEdgQgshBs8CmCIpgzUB8434oKgfdS+Ch6lAvWIPZJA21m6pJ5YGtdhGh4uUVwXfgZrupHDTdsAIiGFTtikHIeCMYaMqmYEzwswOg7ZPYXqe5kjkbhwZP4pwTvGXiegfAT3vBxwYiwa2A8DP6311ybOJGAPjbcqzdNjJyVenVi+pFSTCZGniViQlBvoXwecGplsBbJsYF2RbAfxDsaSm8ZWKVTLk9LfgHgtVtga8yclKmEu0L/kNwpu3gVSbWCR56wD8VbAwKn0jmUXtRzZXRC3Hf9B6RaUkwKnheB/6FYGdozroS9Akuy/zBkYAXBZdkyjfdIcF+wac49oXm8ZJgRDASmqOnVuoPOvCVPRaKmOwAAAAASUVORK5CYII="}}></Image>
                    </TouchableOpacity>                       
                }
                
                {/* Ver modal */}
                <TouchableOpacity onPress={()=>this.showModal()}>
                    <Image style={styles.icons} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEWElEQVRoge2aTUxcVRiG3+/cYaoLrakxpmnwp8y0YGsXDNjgjKYx/ja6cMHKhQtbGEpt4tImjX+VJpqYaooUNNGVC41pbWJJWBhsShG4FBOERmYEbU1LF9A0bSIMM+d1ATOdgZnLvXf+aMKz+u653zn3fTnnzr3nuwDrrLOOFVKQUUgJdE3uFJ14WiB1FFRBsFWI+wnct3ShWxpyU8ApAlElYlLjghmuGoMI85WQl5FAZ6RWaXmTwtcBVLoc5jIhp5TS3w41bfvdrRZXRmo7Jl5VIocBNLi9cA76ANVmhqvOOu3oyEjtl5O7lIq3AxJyeiGHnAOl1Wzx/WG3gy0jjd/TmJqJHoHgMIAK1/KcESP40fC0vw3vi14teVUjDV+PbYrHvd8ReKkw+hxCdM/T+8bogUdvWKVZGtn91eTDCR3vAWVXYdU5g8C4Xki8MPJ29dVcOTmNPHXi0oPaU9EHcHtx5DlEcKnCiIX69+2YzXZaZWv0fRHZQE/FqTVjAgCImoW498dAp5n1Hs1qZKOXRwk+U1xlrtgDbvwg24kVS6uuIxqE8BxymFwDJLRG6OIB/2/pjZliSYHw0xXtawtDKRwHmTEJGYLrOqKvofBP62KwO9AV2ZvekPmXVzxUUjl5IJSDGcfJoKHjzy0Loq6gUG/ExUdLwrNlqPXxaSBtRuIw9uLuMQEAiiqeWl5pS0sHy6EmLxSCd8JUJDvLIiYfNJ9MhneM0MnGiGcNA5WGgUoQ3aXLW4bII6kwGdSdjMwB2GCnv2GgcmC//18AqG+PVtLg5VLkZWHODPvvBTJ/fvPeN5eTtBmJXgW42VYvolu0NAMADXYBeLkkeSuZNsP+zQDgSRvtGgB7RgSv2Jr+Qucth7ySDNOX1ojjgcqNktFUmAyEMlAeNXmg0ZcMU0aUR50BkCiLIHdow2P8nDxIGRnYv/U6wN7yaHJFz6LmRZbtO4zPSq3GLRSeSD/OfEkkpb4rOkQiUFJVzuk3m33B9Jpx5oyIUIOtWNv3SoLCd5YXvldsaYebtw0A+LxkshxC4JMljRlk3Zv/tyn2LoC1eOP3Qm6+l+3EKgU6z3kA1UWT5QAC4zHtDeUqneaslgwerJmp8MSCAAaLps4mBMYhC89b1X8tyz79+3bMUtSLEJwpvDybEN0x7Q0NNz9xzSrN3h6dlPrOyCFCjhdEnD1ioHxoXq86Zuezgr1CnAgNJn7KW5pdiF9BCZgtvo/tmAAyXuOticPznHtlduF5KNVmNvnsb3eXsG0Egkang9sc9x9STpfkY2ht+0SNMmRslfx5CI6BeAhgNSCPAXgAi5+nlQC3CNwQ4G8N/AXBoBL0DzX5x9yKT8fWjChDHQFoZWJWUxovhn2/FEKUG1adkfqTE88S0muR22MYeCtZBSkXlkb2fDN1z+35+AiyP91HhTg6FPb9UIj/XMgXy6V1OxZvw6KJOQIzQkQpuCDUp82W7YtP/JYSqFznLuR/mRuPVCpiEN8AAAAASUVORK5CYII="}}></Image>
                </TouchableOpacity>
            </View>
            
            {/* Modal para comentarios */}
            {   this.state.showModal ?
                    <Modal style={styles.modalContainer}
                        visible= {this.state.showModal}
                        animationType= 'slide'
                        transparent= {false}
                    >   
                    <TouchableOpacity onPress={() => this.hideModal()}>
                        <Image style={styles.closeButton} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACe0lEQVRYhe2XwU4TURSGv9MpSyWtLUOJtGl0xQOwAykmvIHhGWjiElYmhuJKt9pXIMb4ALIQEFc8gC6MaRBi6bRAIhsT2x4XLYGZ3jszLSRs+JPZzD33/N/MPXfuGbjTLUuGCVZI4vIEZQl42L8AjoAjhC0a7Aq0bxRAU4yTZI0EKyipiIxndKnS4bWc8ufaAOqyjPIWyMSBvaIWSlmafAgLSliNQTTLBsrmCOYAGYT3OkFFQx7UOqBZNhBejGBsUkU8XsYG6L/2zTDAIaUoy6blGDDQFOOM8RN4cEPmF2rR5lGwMAdrIMma1VzZBrwQE68fY1IGh9XgTR+AwhgJVizmO9JkEYdZoGaIqOEwK00WEXaNOYSyQtIKgMu8dZ8LM5qjIHUOcCgFIGo4lKTOgeYooMwYc0CaSebsAL0vnE0TdNg2QPjNO2wDWWuWgEcyMJiPqPtiH+LCsAQQMC+GZlDydgBhKnTyJcQXdVmQem8ZdIo8bT5HmvcAfB7+JRA0BsCg/qIQe64vLlgDv2MkqOEwLw1qmqOgOQpyyiEOTzHvDr+Euh1A+BXD3F9w5sIMA/B5BD9EWyFTPUO1F7kszKsQzRCAT3aABnsIZ8aJyreQavdDwHeL/QnHfLUCCPyjS9VCvqAuO3TYx1ztRTrsq8sOMG8BqAa7pcHDKMM9EvwAXEuSUdWkzePIw0hanKM8J/62iiMFVkwtmrEj6p/br24QoCIeH00D1paMXgezwfXehALreKzbAqKb0izPEN4RdsCY5QFl25PHBgDQNPdxWEUoA+mI8BOgSpc30uI8KvfwPyaTzKEsoUwD0/2hQ4RDhC2O2Rvmx+ROt67/+w3nK4VBbIQAAAAASUVORK5CYII="}}></Image>
                    </TouchableOpacity> 

                    {
                        this.props.postData.data.comments ?
                        <FlatList
                            data={this.props.postData.data.comments}
                            keyExtractor={ comment => comment.createdAt.toString()}
                            renderItem= {({item}) => <View style={styles.com}><Text style={styles.user}>{item.author}: </Text><Text>{item.comment}</Text></View>}
                        />
                        :
                        <Text style={styles.opinar}>Aún no hay comentarios. Sé el primero en opinar.</Text>
                    }


                    {/* Formulario para nuevo comentarios */}
                    <View>
                        <TextInput style={styles.input}
                            placeholder="Comentar..."
                            keyboardType="default"
                            multiline
                            onChangeText={text => this.setState({comment: text})}
                            value={this.state.comment}
                        />
                        
                        {this.state.comment.length == 0 ?
                        <TouchableOpacity disabled={true} onPress={()=>{this.guardarComentario()}} style={styles.buttonDisabled}>
                            <Text style={styles.textButton}>Guadar comentario</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>{this.guardarComentario()}} style={styles.button}>
                            <Text style={styles.textButton}>Guadar comentario</Text>
                        </TouchableOpacity>
                }
                    </View>

                </Modal>    :
                <Text></Text>
            }
            </View>   
        </View> 
        )
    }

}


const styles = StyleSheet.create({
    todo:{
        backgroundColor: 'grey',
    },
    contanier:{
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '15%',
        borderColor: "#f0f0f0",
        borderWidth: 2,
        padding: 10,
        width: '70%',
        alignItems: 'centre',
        flex: 1,
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    foto:{
        width: '100%',
        height: 200,
        borderColor: '#00ADB5',
        marginBottom: 5,
    },  
    img:{
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    modalContainer:{
        width: '90%',
        borderRadius: 4,
        marginLeft: '5%',
        padding: 5,
        alignSelf: 'centre',
        boxShadow: 'rgb(23 23 23 / 20%) 0px 10px 10px',
        marginTop: 20, 
        marginBottom: 10,
    },
    closeButton:{
        padding: 5,
        alignSelf: 'flex-end',
        borderRadius: 4,
        paddingHorizontal: 8,
        width: '30px',
        height: '30px',
    },
    input:{
        height:20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 5,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
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
    },
    iconos:{
        flexDirection: 'row', 
        width: "100%",
        justifyContent: "space-around",
        margin: 7,
    },
    icons:{
        width: '23px',
        height: '23px',
    },
    nombre:{
        textAlign: 'left',
        flexDirection: 'row', 
        marginTop: '8px',
        marginBottom: '8px',
    },
    usuario:{
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '3px',
        marginBottom: '8px',
        textAlign: 'center',
    },
    user:{
        fontWeight: 'bold',
    },
    numero:{
        fontWeight: 'bold',
        marginTop: '2px',
    },
    logos:{
        flexDirection: 'row',   
    },
    line:{
        height: '2px',
        width: "80%",
        textAlign: 'center',
        justifyContent: "space-around",
        marginTop: '9px',
        marginBottom: '6px',
        marginLeft: '10%',
    },
    opinar:{
        color: 'grey', 
        fontStyle: 'italic',
    },
    negro:{
        color: 'red',
    },
    com:{
        flexDirection: 'row', 
        width: "100%",
        justifyContent: 'left',
        
    },
})

export default Post