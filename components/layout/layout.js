import { Fragment } from 'react';

import Header from './header';

//import MainNavigation from './main-navigation';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />

      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
