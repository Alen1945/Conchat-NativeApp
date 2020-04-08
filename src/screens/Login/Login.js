import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button} from 'native-base';
import {Form} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../components/Header';
function Login(props) {
  return (
    <View style={{flex: 1, backgroundColor: '#f1edee'}}>
      <View style={style.container}>
        <Text style={style.title}>Sign In</Text>
      </View>
      <View style={style.viewForm}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -60,
            }}>
            <Button iconLeft>
              <Icon name="facebook-f" size={15} color="red" />
              <Text>Facebook</Text>
            </Button>
            <Button iconRight>
              <Icon name="google-plus-g" size={15} color="red" />
              <Text>Google+</Text>
            </Button>
          </View>
          <View>
            <Text style={style.quotes}> or log in with your Phone Number</Text>
          </View>
          <View>
            <Form
              style={{
                paddingLeft: 50,
                paddingRight: 50,
                marginTop: 30,
                marginBottom: 50,
              }}>
              <TextInput
                placeholder="Telephone Number ..."
                containerStyle={style.inputContainer}
                inputContainerStyle={style.input}
                inputStyle={style.inputText}
              />

              <View>
                <Button buttonStyle={style.login}>
                  <Text>Sign In</Text>
                </Button>
              </View>
            </Form>
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
  anotherLogin: {
    marginTop: 60,
    width: 150,
    height: 45,
    borderRadius: 18,
    backgroundColor: '#41568d',
    elevation: 4,
    marginHorizontal: 10,
  },
  login: {
    marginTop: 50,
    width: '100%',
    borderRadius: 18,
    backgroundColor: '#53C9BE',
    elevation: 4,
  },
  textButton: {
    fontSize: 14,
    marginLeft: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: 280,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    paddingLeft: 10,
  },
  inputText: {
    fontSize: 15,
    paddingLeft: 20,
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
