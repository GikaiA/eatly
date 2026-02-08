import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get currently logged-in user
      
      if (user) {
        try {
          // Fetch user document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Save user data to state
          } else {
            console.log('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  
  if (!userData) return <p>No user data available</p>;

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
}

export default Profile;