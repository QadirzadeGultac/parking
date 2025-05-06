import React, { useState, useEffect } from 'react';
import UsersHeader from './Users_header.components';
import usersStyle from './Users.module.css';
import fetchWithToken from '../utils/fetchWithToken';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    selectedChoice: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithToken('/v0/auth/all-users', "POST", filters);
        console.log("istifadəçilər:", data);
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Xəta:", err.message);
      }
    };

    fetchData();
  }, [filters]);


  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setFilteredUsers((prev) => [...prev, newUser]);
  };

  return (
    <div className={usersStyle["users-main"]}>
      <UsersHeader
        setFilters={setFilters}
        setFilteredProducts={setFilteredUsers}
        handleAddProduct={handleAddUser}
        products={users}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>İstifadəçi adı</th>
            <th>Tam adı</th>
            <th>Telefon</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username || ''}</td>
                <td>{user.name || ''}</td>
                <td>{user.mobile || ''}</td>
                <td>{user.email || ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Məlumat yoxdur</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
