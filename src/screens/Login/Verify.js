import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {startLoading, endLoading} from '../../store/actions/loading';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CustomInputText from '../../components/CustomInputText';
import {auth} from '../../config/firebase';
import Header from '../../components/Header';
import {userLogin, updateProfile} from '../../store/actions/userData';
import CustomAlert from '../../components/CustomAlert';
function Verify(props) {
  const dispatch = useDispatch();
  const [isNewUser, setIsNewUser] = React.useState(false);
  const FormrVerify = useFormik({
    initialValues: {code_verify: ''},
    validationSchema: Yup.object({
      code_verify: Yup.string()
        .matches(/^([0-9]{6})$/, 'Invalid Code Verify')
        .required('Required Code Verify'),
    }),
    onSubmit: async (values, form) => {
      dispatch(startLoading());
      try {
        const confirmVerify = await props.route.params.confirmResult.confirm(
          values.code_verify,
        );
        if (confirmVerify) {
          console.log(confirmVerify);
          if (confirmVerify.displayName) {
            await dispatch(userLogin());
          } else {
            setIsNewUser(true);
          }
        } else {
          CustomAlert(false, 'Wrong Verify Code');
        }
      } catch (err) {
        console.log(err);
        console.log(err.message);
        CustomAlert(false, 'Wrong Verify Code');
      }
      dispatch(endLoading());
    },
  });
  const FormrUpdateName = useFormik({
    initialValues: {displayName: ''},
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(6, 'Name Must Have 6 character or more')
        .required('Required Code Verify'),
    }),
    onSubmit: async (values, form) => {
      dispatch(startLoading());
      try {
        await auth.currentUser.updateProfile(values);
        await dispatch(updateProfile());
        await dispatch(userLogin());
      } catch (err) {
        console.log(err);
        CustomAlert(false, err.message || 'Something Wrong');
      }
      dispatch(endLoading());
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: '#f1edee'}}>
      {!isNewUser && (
        <>
          <Header Title="Verify" />
          <View style={style.viewForm}>
            <ScrollView>
              <View>
                <View
                  style={{
                    paddingHorizontal: 30,
                    marginTop: 30,
                  }}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <CustomInputText
                      form={FormrVerify}
                      name="code_verify"
                      placeholder="Code Verify ..."
                      containerStyle={style.inputContainer}
                      inputContainerStyle={style.input}
                      inputStyle={style.inputText}
                    />
                  </View>
                  <View>
                    <Button
                      title="Verify"
                      buttonStyle={style.verify}
                      onPress={FormrVerify.handleSubmit}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
      {isNewUser && (
        <>
          <Header Title="Add Name" />
          <View style={style.viewForm}>
            <ScrollView>
              <View>
                <View
                  style={{
                    paddingHorizontal: 30,
                    marginTop: 30,
                  }}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <CustomInputText
                      form={FormrUpdateName}
                      name="displayName"
                      placeholder="Your Name..."
                      containerStyle={style.inputContainer}
                      inputContainerStyle={style.input}
                      inputStyle={style.inputText}
                    />
                  </View>
                  <View>
                    <Button
                      title="Save"
                      buttonStyle={style.verify}
                      onPress={FormrUpdateName.handleSubmit}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
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
  verify: {
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
});
export default Verify;
