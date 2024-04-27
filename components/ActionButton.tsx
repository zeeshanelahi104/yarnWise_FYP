import React, { ReactNode, MouseEventHandler } from 'react';

type ActionType = 'success' | 'default';

interface ActionButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ActionType;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick, type = 'default' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 border rounded ${type === 'success' ? 'bg-blue-400' : 'bg-red-600'} text-white`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
