import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {startLoading, endLoading} from '../../store/actions/loading';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomInputText from '../../components/CustomInputText';
import firebase from '@react-native-firebase/app';
import {auth} from '../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';
import {userLogin} from '../../store/actions/userData';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);
function Login(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const FormrRegister = useFormik({
    initialValues: {no_telephone: '', no_prefix: '62'},
    validationSchema: Yup.object({
      no_prefix: Yup.string()
        .matches(/^[0-9]?()[0-9]$/, 'Invalid')
        .required('Required'),
      no_telephone: Yup.string()
        .matches(/^(\d[0-9]{8,16})$/, 'Invalid Phone Number')
        .required('Required No Telephone'),
    }),
    onSubmit: async (values, form) => {
      dispatch(startLoading());
      try {
        await authPhoneNumber(`+${values.no_prefix}${values.no_telephone}`);
      } catch (err) {
        console.log(err.message || err);
        CustomAlert(false, err.message || 'Something Error');
      }
      dispatch(endLoading());
    },
  });
  const authPhoneNumber = async (phoneNumber) => {
    try {
      const confirmResult = await auth.signInWithPhoneNumber(
        phoneNumber,
        false,
      );
      if (confirmResult) {
        if (confirmResult._verificationId) {
          navigation.navigate('Verify', {confirmResult, addName: false});
        } else {
          if (auth.currentUser) {
            if (auth.currentUser.displayName) {
              await dispatch(userLogin());
            } else {
              navigation.navigate('Verify', {confirmResult, addName: true});
            }
          } else {
            await authPhoneNumber(phoneNumber);
          }
        }
      } else {
        throw new Error('Something Error');
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#f1edee'}}>
      <View style={style.container}>
        <Text style={style.title}>Your Phone Number</Text>
      </View>
      <View style={style.viewForm}>
        <ScrollView>
          <View>
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 30,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <CustomInputText
                  form={FormrRegister}
                  name="no_prefix"
                  leftIcon={<Icon name="plus" />}
                  containerStyle={{width: 100, marginHorizontal: 0}}
                  inputContainerStyle={style.input}
                  inputStyle={style.inputText}
                />
                <CustomInputText
                  form={FormrRegister}
                  name="no_telephone"
                  placeholder="Phone Number ..."
                  containerStyle={style.inputContainer}
                  inputContainerStyle={style.input}
                  inputStyle={style.inputText}
                />
              </View>
              <View>
                <Button
                  title="Next"
                  buttonStyle={style.login}
                  onPress={FormrRegister.handleSubmit}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={style.quotes}> Or Login With</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              title="Facebook"
              icon={<Icon name="facebook-f" size={15} color="white" />}
              buttonStyle={style.anotherRegiser}
              titleStyle={style.textButton}
            />
            <Button
              title="Google+"
              icon={<Icon name="google-plus-g" size={15} color="white" />}
              buttonStyle={{
                ...style.anotherRegiser,
                backgroundColor: '#c63027',
              }}
              titleStyle={style.textButton}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4f4f4f',
    marginTop: 15,
  },
  viewForm: {
    flex: 9,
    paddingTop: 50,
    justifyContent: 'center',
  },
  anotherRegiser: {
    marginTop: 20,
    width: 150,
    height: 45,
    borderRadius: 18,
    backgroundColor: '#41568d',
    elevation: 4,
    marginHorizontal: 10,
  },
  login: {
    marginTop: 20,
    width: '100%',
    borderRadius: 18,
    backgroundColor: '#26a1c6',
    elevation: 4,
    marginBottom: 20,
  },
  textButton: {
    fontSize: 14,
    marginLeft: 15,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 0,
  },
  inputText: {
    fontSize: 15,
    paddingLeft: 10,
    color: '#525252',
  },
  quotes: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 14,
    color: '#4f4f4f',
  },
});
export default Login;
