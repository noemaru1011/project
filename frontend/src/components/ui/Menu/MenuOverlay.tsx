type Props = {
  onClick: () => void;
};

export const MenuOverlay = ({ onClick }: Props) => (
  <div
    className="fixed inset-0 backdrop-blur-sm  z-50"
    onClick={onClick}
    role="presentation"
    aria-hidden="true"
  ></div>
);
