import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setIsModalOpen(false);
    navigate(path);
  };

  return {
    isOpen,
    setIsOpen,
    isModalOpen,
    setIsModalOpen,
    isHidden: location.pathname === '/',
    handleNavigate,
  };
};
