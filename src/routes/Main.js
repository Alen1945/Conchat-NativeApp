import React from 'react';
import {useSelector} from 'react-redux';
import PrivateNavigator from './PrivateNavigation';
import PublicNavigator from './PublicNavigation';
function MainNavigation(props) {
  const {isLogin} = useSelector((state) => state.userData);
  if (isLogin) {
    return <PrivateNavigator />;
  } else {
    return <PublicNavigator />;
  }
}
export default MainNavigation;
