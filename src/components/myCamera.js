import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {bd, storage} from '../firebase/config';

class MyCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            permission: false, 
            photo: '', 
            showCamera: true,
        };
        this.camera 
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () =>{
                this.setState({
                    permission: true, 
                })
            })
            .catch( error => console.log(error))
    }

    takePicture(){
        this.camera.takePictureAsync()
            .then( (photo) =>{
                this.setState({
                    photo: photo.uri,
                    showCamera: false,
                })
            })
            .catch(error => console.log(error))
    }

    savePhoto(){
        fetch(this.state.photo)
            .then( res => res.blob())
            .then( image =>{
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>(
                        ref.getDownloadURL()
                            .then( url => {
                                this.props.onImageUpload(url);
                                this.setState({
                                    photo:'',
                                })
                            })
                            .catch(error => console.log(error))
                    ))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    clear(){
     this.setState({
         photo:'',
         showCamera:true,
     })
    }

    render() {
        return (
            <View style={styles.container}>
            {
                this.state.permission ?

                    this.state.showCamera === false ?
                    <React.Fragment>
                        <Image 
                            style={styles.cameraBody}
                            source={{uri:this.state.photo}}
                        /> 
                        <View style={styles.botones}>
                            <TouchableOpacity style={styles.buttonA} onPress= {() => this.savePhoto()}>
                                <Text>Usar Foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonR} onPress= {() => this.clear()}>
                                <Text>Repetir Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    :

                <View style={styles.container}>
                    <Camera 
                        style={styles.cameraBody}
                        type={Camera.Constants.Type.back}
                        ref={ reference => this.camera = reference}
                    />
                    <TouchableOpacity onPress= {() => this.takePicture()}>
                        <Image style={styles.foto} source={{uri: "data:image/png;base64,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"}}></Image>
                    </TouchableOpacity>
                </View>
                :
                <Text style={styles.permiso}>- No tienes permiso para usar la camara -</Text>
            }
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    cameraBody:{
        flex: 1,
        width: '80%',
        marginTop: '20px',
        marginLeft: '10%',
    },
    buttonA:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    buttonR:{
        backgroundColor:'red',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'red',
    },
    botones:{
        flexDirection: 'row', 
        alignSelf: 'center',
        textAlign: 'center',
        width: '30%',
        justifyContent: "space-around",
        marginTop: '6px',
        marginBottom: '6px'
    },
    foto:{
        height: '50px',
        width: '50px',
        alignSelf: 'center',
        marginTop: '6px',
        marginBottom: '6px'
    },
    textButton:{
        color: '#fff'
    },
    permiso:{
        color: 'grey', 
        fontStyle: 'italic',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: '50px',
    },
})

export default MyCamera;