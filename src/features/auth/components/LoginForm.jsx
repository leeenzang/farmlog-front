import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField';
import CheckBox from '../../../components/CheckBox';
import Button from '../../../components/Button';
import './LoginForm.css';
import { login } from '../../../api/users'; 

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
  
      localStorage.setItem('access_token', res.accessToken);
      localStorage.setItem('refresh_token', res.refreshToken);
      localStorage.setItem('user_id', res.userId);
      localStorage.setItem('nickname', res.nickname);
  
      navigate('/dashboard');  
    } catch (err) {
      alert('로그인 실패! 아이디나 비밀번호를 확인해주세요.');
      console.error(err);
    }
  };

  return (
    <div className="login-form">
      <h2>로그인</h2>
    
    <div className="input-group">
      <div className="form-group">
        <label>아이디</label>
        <InputField
          placeholder="아이디를 입력해주세요."
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
        />
      </div>

      <div className="form-group">
        <label>비밀번호</label>
        <InputField
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
      </div>
    </div>
      <div className="form-bottom">
        <CheckBox label="기억하기" />
        <a href="#" className="forgot-link">비밀번호를 잊으셨나요?</a>
      </div>

      <Button text="로그인하기" onClick={handleLogin} variant="login-green" />

      <hr />
      <a href="/signup" className="join-link">회원가입하기</a>
    </div>
  );
}

export default LoginForm;