import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';

import Header from 'components/Header';

export default function Layout({ children, title = '404' }) {
  return (
    <Fragment>
      <Helmet title={title} titleTemplate="CamPigs - %s" />
      <Header />
      <Container>{children}</Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};
