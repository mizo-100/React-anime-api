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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    isModalOpen,
    isHidden: location.pathname === '/',
    handleNavigate,
    toggleMenu,
    toggleModal,
    closeMenu,
  };
}
