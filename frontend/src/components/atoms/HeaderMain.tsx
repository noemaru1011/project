import { Link } from 'react-router-dom';
import React from 'react';

type Props = {
  to: string;
  label: string;
};

export const HeaderMain: React.FC<Props> = ({ to, label }) => (
  <Link to={to} className="font-bold mb-2 sm:mb-0">
    {label}
  </Link>
);
