import { Nav } from 'reactstrap';
import React from 'react';
import { hot } from 'react-hot-loader';
import GitHub from '../github/GitHub';
import config from '../../../../config';
import navItem from './navItem';

const NavbarMenu = () => (
  <div className="d-none d-lg-inline-block ml-auto text-center">
    <Nav className="d-flex align-content-center align-items-center" navbar>
      <GitHub className="mb-sm-2" />
      {navItem('GitHub', config.package.repository, null, true)}
    </Nav>
  </div>
);

export default hot(module)(NavbarMenu);
