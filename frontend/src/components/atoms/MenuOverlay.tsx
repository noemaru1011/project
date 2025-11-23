import React from 'react';

type Props = {
  onClick: () => void;
};

export const MenuOverlay: React.FC<Props> = ({ onClick }) => (
  <div className="fixed inset-0 backdrop-blur-sm" onClick={onClick}></div>
);
