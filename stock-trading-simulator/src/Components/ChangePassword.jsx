import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword === currentPassword) {
      setError('New Password cannot be the same as the current password');
      return;
    }

    setIsSubmitting(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError('User not authenticated.');
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccessMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Failed to update password. Please try again.');
      console.error('Error changing password:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='d-flex justify-content-center m-5'
    >
      <div className='container shadow m-5 rounded-5' style={{maxWidth: '90vh'}}>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 center'>
            <div className='d-flex flex-column justify-content-center align-items-center text-center m-4 p-2'>
              <h1>Change your Password</h1>
              {error && <p className='text-danger'>{error}</p>}
              {successMessage && <p className='text-success'>{successMessage}</p>}
              <form className='form' onSubmit={handleChangePassword}>
                <input type='password' name='currentPassword' value={currentPassword} placeholder='Current Password' className='form-control m-2' onChange={(e) => setCurrentPassword(e.target.value)} />
                <input type='password' name='newPassword' value={newPassword} placeholder='New Password' className='form-control m-2' onChange={(e) => setNewPassword(e.target.value)} />
                <input type='password' name='confirmPassword' value={confirmPassword} placeholder='Confirm New Password' className='form-control m-2' onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className='d-grid mt-3'>
                  <button type='submit' className='btn btn-dark rounded-5' disabled={isSubmitting}>Change Password</button>
                </div>
              </form>
              <p className='text-secondary mt-2'><Link to='/account' className='text-decoration-none text-secondary'>Go back to Account Settings</Link></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChangePassword;
