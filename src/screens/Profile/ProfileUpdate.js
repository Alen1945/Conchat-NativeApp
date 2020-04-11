import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Picker,
  Platform,
} from 'react-native';
import {Avatar, Icon, Input, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../components/CustomInputText';
import CustomAlert from '../../components/CustomAlert';
import {useSelector, useDispatch} from 'react-redux';
import {updateProfile} from '../../store/actions/userData';
import {startLoading, endLoading} from '../../store/actions/loading';
import ImagePicker from 'react-native-image-picker';
import {auth, storage, db} from '../../config/firebase';
function ProfileUpdate(props) {
  const [srcImageUpdate, setSrcImageUpdate] = React.useState('');
  const {dataProfile} = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const FormUpdateUser = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: dataProfile.displayName || '',
      email: dataProfile.email || '',
      bio: dataProfile.bio || '',
      photoURL: dataProfile.photoURL || '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string().nullable(),
      email: Yup.string().email().nullable(),
      bio: Yup.string().nullable(),
      photoURL: Yup.mixed().nullable(),
    }),
    onSubmit: async (values, form) => {
      dispatch(startLoading());
      try {
        const dataUpdateUser = {};
        const dataUpdatateProfile = {};
        let resultUpdateUser = false;
        let resultUpdateProfile = false;
        const fillAble = ['displayName', 'email', 'bio', 'photoURL'];
        fillAble
          .filter(
            (keyUpdate) =>
              values[keyUpdate] && values[keyUpdate] !== dataProfile[keyUpdate],
          )
          .forEach((keyUpdate) => {
            if (keyUpdate !== 'bio') {
              dataUpdateUser[keyUpdate] = values[keyUpdate];
            } else {
              dataUpdatateProfile[keyUpdate] = values[keyUpdate];
            }
          });
        if (dataUpdateUser.hasOwnProperty('photoURL')) {
          const ext = dataUpdateUser.photoURL.type.split('/')[1];
          if (!['jpg', 'png', 'jpeg'].includes(ext)) {
            throw new Error('File Must Be a Image');
          }
          const updatePhoto = await storage
            .ref(`userPhoto/${auth.currentUser.uid}.${ext}`)
            .putFile(dataUpdateUser.photoURL.uri);
          if (updatePhoto) {
            dataUpdateUser.photoURL = await storage
              .ref(updatePhoto.metadata.fullPath)
              .getDownloadURL();
          } else {
            throw new Error('Failed to Upload File');
          }
        }
        if (
          Object.keys(dataUpdateUser).length > 0 ||
          Object.keys(dataUpdatateProfile).length > 0
        ) {
          await auth.currentUser.updateProfile(dataUpdateUser);
          if (dataUpdateUser.email) {
            await auth.currentUser.updateEmail(dataUpdateUser.email);
          }
          if (Object.keys(dataUpdatateProfile).length > 0) {
            await dispatch(updateProfile(dataUpdatateProfile));
          } else {
            await dispatch(updateProfile());
          }
          CustomAlert(true, 'Update Profile Success');
        }
      } catch (err) {
        console.log(err);
      }
      dispatch(endLoading());
    },
  });
  const handleChangePicture = () => {
    const options = {
      noData: true,
      quality: 0.55,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setSrcImageUpdate(response.uri);
        FormUpdateUser.setFieldValue('photoURL', response);
      }
    });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#53C9BE',
          flexDirection: 'row',
          marginBottom: -150,
        }}>
        <TouchableOpacity
          style={{width: 50, marginTop: 25}}
          onPress={() => props.navigation.goBack()}>
          <Icons name="chevron-left" size={20} style={style.backIcon} />
        </TouchableOpacity>
        <Text style={style.title}>Change Profile</Text>
      </View>

      <View
        style={{
          flex: 2,
          backgroundColor: '#53C9BE',
          alignItems: 'center',
          marginTop: 110,
          marginBottom: 40,
        }}>
        <Avatar
          rounded
          source={
            (srcImageUpdate || dataProfile.photoURL) && {
              uri: srcImageUpdate || dataProfile.photoURL,
            }
          }
          size={130}
          title={(dataProfile.name && dataProfile.name.substring(0, 2)) || 'U'}
          containerStyle={style.avatar}
        />
        <TouchableOpacity
          style={{marginTop: -50, marginLeft: 80}}
          onPress={handleChangePicture}>
          <Icon
            reverse
            name="ios-camera"
            type="ionicon"
            color="grey"
            size={15}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 4, marginTop: 20}}>
        <ScrollView>
          <CustomTextInput
            form={FormUpdateUser}
            name="displayName"
            placeholder="name"
            inputContainerStyle={{...style.input}}
            inputStyle={style.inputText}
          />
          <CustomTextInput
            form={FormUpdateUser}
            name="bio"
            placeholder="info"
            inputContainerStyle={{...style.input}}
            inputStyle={style.inputText}
          />
          <CustomTextInput
            form={FormUpdateUser}
            name="email"
            placeholder="Email"
            inputContainerStyle={{...style.input}}
            inputStyle={style.inputText}
          />
          <View>
            <Button
              title="Edit"
              buttonStyle={style.update}
              onPress={() => FormUpdateUser.handleSubmit()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: 25,
    marginLeft: 30,
    marginBottom: 20,
  },
  backIcon: {
    color: 'white',
    marginLeft: 15,
    width: 20,
  },
  avatar: {
    marginTop: 20,
    borderWidth: 5,
    borderColor: '#f6f6f8',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#eaeaea',
    paddingRight: 20,
  },
  inputText: {
    fontSize: 13,
    marginLeft: 20,
    color: '#525252',
    textAlign: 'center',
  },
  picker: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#eaeaea',
    borderWidth: 0,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    width: '75%',
    height: 50,
    alignSelf: 'center',
  },
  inputForm: {
    color: 'grey',
    fontSize: 15,
  },
  form: {
    marginTop: 60,
    paddingHorizontal: 30,
    paddingRight: 40,
  },
  update: {
    marginTop: 20,
    marginBottom: 60,
    width: '75%',
    borderRadius: 10,
    backgroundColor: '#53C9BE',
    elevation: 4,
    alignSelf: 'center',
  },
});

export default ProfileUpdate;
