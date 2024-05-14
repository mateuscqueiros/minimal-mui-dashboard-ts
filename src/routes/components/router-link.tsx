import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

export type RouterLinkProps = {
  href: string;
  [key: string]: any;
};

const RouterLink = forwardRef(({ href, ...other }: RouterLinkProps, ref) => (
  <Link ref={ref} to={href} {...other} />
));

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;
