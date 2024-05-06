import React, { useState } from 'react';
import { getAuth, updateEmail, sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChangeEmail = () => {
    const auth = getAuth();
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);

    const handleChangeEmail = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser;

            // Send verification email to new email address
            await updateEmail(user, newEmail);
            await sendEmailVerification(user);

            // Update email address

            // Set success flags
            setEmailChangeSuccess(true);
            setVerificationEmailSent(true);
            setError('');
        } catch (error) {
            setError(error.message);
            console.error('Error changing email:', error);
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
            <div className='container shadow m-5 rounded-5' style={{ maxWidth: '90vh' }}>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-8 col-sm-10 center'>
                        <div className='d-flex flex-column justify-content-center align-items-center text-center m-4 p-2'>
                            <h1>Change Your Email</h1>
                            {error && <p className='text-danger'>{error}</p>}
                            {emailChangeSuccess && (
                                <p className='text-success'>Your email has been changed successfully.</p>
                            )}
                            {verificationEmailSent ? (
                                <p className='text-success'>An email has been sent to {newEmail} for verification.</p>
                            ) : (
                                <form className='form' onSubmit={handleChangeEmail}>
                                    <input
                                        type='email'
                                        name='newEmail'
                                        value={newEmail}
                                        placeholder='New Email'
                                        className='form-control m-2'
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    <div className='d-grid mt-3'>
                                        <button type='submit' className='btn btn-dark rounded-5'>Change Email</button>
                                    </div>
                                </form>
                            )}
                            <p className='text-secondary mt-2'>
                                <Link to='/account' className='text-decoration-none text-secondary'>Go back to Account Settings</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ChangeEmail;
