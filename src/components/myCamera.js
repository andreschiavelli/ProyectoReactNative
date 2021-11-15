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
                    permission: true
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
                        <View>
                            <TouchableOpacity onPress= {() => this.savePhoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress= {() => this.clear()}>
                                <Text>Rechazar</Text>
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
                    <TouchableOpacity style={styles.button} onPress= {() => this.takePicture()}>
                        <Text>Sacar Foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <Text>No tienes permiso para usar la camara</Text>
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
        flex: 7,
    
    },
    button:{
        flex: 1,
        justifyContent: 'centre',
    }
})

export default MyCamera;