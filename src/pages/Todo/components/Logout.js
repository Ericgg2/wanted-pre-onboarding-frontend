import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ navigate }) => {
  const logOut = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃 합니다.');
      navigate('/');
      localStorage.removeItem('access_token');
    } else {
    }
  };

  return (
    <div>
      <button onClick={logOut}></button>
    </div>
  );
};

export default Logout;
