import React, { useState } from 'react';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const PhoneNumberLogin = () => {
  const auth = getAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber);
      setVerificationId(result.verificationId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Phone Number Login</h2>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button onClick={handleSendCode}>Send Code</button>
      </div>
      <div>
        <label>Verification Code:</label>
        <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
        <button onClick={handleVerifyCode}>Verify Code</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default PhoneNumberLogin;
