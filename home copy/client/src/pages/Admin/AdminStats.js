import { useEffect, useState } from 'react';
import { Loading, ChartsContainer, AdminStatsContainer } from '../../components';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AdminStats = () => {

  return (
    <>
      <AdminStatsContainer/>
    </>
  );
};

export default AdminStats;
