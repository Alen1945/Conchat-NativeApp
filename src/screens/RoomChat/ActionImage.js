import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {auth, storage, firebaseFunction} from '../../config/firebase';
import ImagePicker from 'react-native-image-picker';
import {startLoading, endLoading} from '../../store/actions/loading';
import {useSelector, useDispatch} from 'react-redux';
export default function ActionsImage(props) {
  const dispatch = useDispatch();
  const [textMessage, setTextMessage] = React.useState('');
  const [imageMessage, setImage] = React.useState(false);
  const onSendMessage = async () => {
    dispatch(startLoading());
    try {
      if (imageMessage) {
        const ext = imageMessage.type.split('/')[1];
        if (!['jpg', 'png', 'jpeg'].includes(ext)) {
          throw new Error('File Must Be a Image');
        }
        const updatePhoto = await storage
          .ref(`chatMedia/${new Date().getTime()}.${ext}`)
          .putFile(imageMessage.uri);
        if (updatePhoto) {
          const imageMessageURI = await storage
            .ref(updatePhoto.metadata.fullPath)
            .getDownloadURL();
          console.log(imageMessageURI);
          const result = await firebaseFunction.httpsCallable('createMessage')({
            idRoom: props.route.params.idRoom,
            text: textMessage || '',
            image: imageMessageURI,
            createdAt: new Date().getTime(),
          });
          props.navigation.goBack();
        } else {
          throw new Error('Failed to Upload File');
        }
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(endLoading());
  };
  const handleAddPicture = (type) => {
    const options = {
      noData: true,
      quality: 0.55,
    };
    if (type === 'photo') {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          setImage({uri: response.uri, type: response.type});
        }
      });
    } else if (type === 'camera') {
      ImagePicker.launchCamera(options, (response) => {
        if (response.uri) {
          setImage({uri: response.uri, type: response.type});
        }
      });
    } else {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.uri) {
          setImage({uri: response.uri, type: response.type});
        }
      });
    }
  };
  React.useEffect(() => {
    console.log('alen');
    handleAddPicture(props.route.params.type);
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#444',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {imageMessage && (
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
            }}
            source={{uri: imageMessage.uri}}
          />
        )}
      </View>
      <View style={{height: 80, padding: 5}}>
        <TouchableOpacity
          onPress={() => handleAddPicture('')}
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: -35,
            right: 20,
          }}>
          <Icon name="replay" size={30} color="#26a1c6" />
        </TouchableOpacity>
        <Text>Tambah Keterangan</Text>
        <View style={{flexDirection: 'row'}}>
          <Input
            containerStyle={{
              backgroundColor: '#ddd',
              flex: 10,
              borderRadius: 10,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            value={textMessage}
            onChangeText={(text) => setTextMessage(text)}
          />
          <TouchableOpacity
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => onSendMessage()}>
            <Icon name="send" size={30} color="#26a1c6" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
