import React from 'react';
import { Button, Image, View ,Picker, ScrollView, CameraRoll} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { MaterialIcons  } from '@expo/vector-icons';
import ImageSourcePicker from '../components/ImageSourcePicker'

const photoSourceItems={
  1 : {
    id:1,
    text:"камера"
  },
  2:
  {
      id:2,
    text:"галерея"
  },


};
export default class ImagePickerComponent extends React.Component {
  state = {
    image: null,
    //photos:[]
  };

  render() {
    let { image } = this.state;

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageSourcePicker
        pickerText={"Источник картинки"}
        items={photoSourceItems}
        selectedItemId={1}
        onSetValue={(itemId, itemIndex) => this._handleItemOnClick(itemId)}
      />
      
        {/* {image &&   <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      </View>
    );
  }

  _handleItemOnClick=(itemId)=>{
    if(photoSourceItems[itemId].id==1){
      this._launchCamera()
      }
      if(photoSourceItems[itemId].id==2){
        this._pickImage()
      }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.5
      //aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  _launchCamera = async () => {
    await this._askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.5,
      //aspect: [4, 3],
      
    });

    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
}