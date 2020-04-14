import React from 'react';
import {useSelector} from 'react-redux';
import PrivateNavigator from './PrivateNavigation';
import PublicNavigator from './PublicNavigation';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import {Toast} from 'native-base';
function MainNavigation(props) {
  const {isLogin} = useSelector((state) => state.userData);
  React.useEffect(() => {
    SplashScreen.hide();
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        Toast.show({
          text: 'No Internet Connection',
          buttonText: 'Ok',
          duration: 15000,
          position: 'bottom',
          type: 'warning',
        });
      }
    });
  }, []);
  if (isLogin) {
    return <PrivateNavigator />;
  } else {
    return <PublicNavigator />;
  }
}
export default MainNavigation;
