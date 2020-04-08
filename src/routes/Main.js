import React from 'react';
import PrivateNavigator from './PrivateNavigation';
import PublicNavigator from './PublicNavigation';
function MainNavigation(props) {
  const [isLogin, setIsLogin] = React.useState(false);
  if (isLogin) {
    return <PrivateNavigator />;
  } else {
    return <PublicNavigator />;
  }
}
export default MainNavigation;
