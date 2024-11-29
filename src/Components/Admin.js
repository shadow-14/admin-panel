import React, { useState, useEffect } from 'react';
import { db } from './../firebase/firebase.js';
import { collection, getDocs, query,where, updateDoc, addDoc } 
from 'firebase/firestore';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: '', coins: 0 });
  const [userId, setUserId] = useState('');
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleUpdate = async () => {
    try {
      // Create a query to find the document where userId matches the provided userId
      const q = query(collection(db, 'users'), where("id", "==", userId));
  
      // Execute the query to fetch matching documents
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Get the first document from the query result
        const userDoc = querySnapshot.docs[0];  // This will get the first document matching userId
  
        // Update the document with new coin values
        await updateDoc(userDoc.ref, {
          coins: coins,  // Update the coins field
        });
  
        // Update the users list in the state directly
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId ? { ...user, coins: coins } : user
          )
        );
  
        alert('User coins updated successfully!');
      } else {
        alert('No user found with the provided userId.');
      }
    } catch (error) {
      console.error('Error updating coins: ', error);
      alert('Failed to update coins');
    }
  };
  
  

  const handleAddUser = async () => {
    try {
      await addDoc(collection(db, 'users'), newUser);
      setUsers([...users, newUser]);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user: ', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900">Admin Dashboard</h1>

      {/* Update User Coins Section */}
      <div className="mb-12 p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Update User Coins</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Enter Coins"
            value={coins}
            onChange={(e) => setCoins(Number(e.target.value))}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Update Coins
          </button>
        </div>
      </div>

      {/* Add New User Section */}
      <div className="mb-12 p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Add New User</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter User ID"
            value={newUser.id}
            onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Enter Coins"
            value={newUser.coins}
            onChange={(e) => setNewUser({ ...newUser, coins: Number(e.target.value) })}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Users List Section */}
      <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Users List</h2>
        <ul className="divide-y divide-gray-200">
          {users.map(user => (
            <li key={user.id} className="py-4 flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">{user.id}</span>
              <span className="text-lg text-gray-600">{user.coins} coins</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
