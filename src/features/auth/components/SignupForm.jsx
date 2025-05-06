import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import './LoginForm.css';
import { signup } from '../../../api/users';

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    nickname: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async () => {
    if (formData.password !== formData.password2) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }

    try {
      await signup(formData);
      alert('회원가입 성공!');
      navigate('/');
    } catch (err) {
      console.error('회원가입 실패 응답:', err.response?.data);
      alert('회원가입 실패! 콘솔 확인!');
    }
  };

  return (
    <div className="login-form">
      <h2>회원가입</h2>
    
    <div className="form-inputs">
      <div className="form-group">
        <label>아이디</label>
        <InputField
          name="username"
          placeholder="아이디를 입력해주세요"
          value={formData.username}
          onChange={handleChange}
          className="login-input"
        />
      </div>

      <div className="form-group">
        <label>닉네임</label>
        <InputField
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          value={formData.nickname}
          onChange={handleChange}
          className="login-input"
        />
      </div>

      <div className="form-group">
        <label>비밀번호</label>
        <InputField
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        />
      </div>

      <div className="form-group">
        <label>비밀번호 확인</label>
        <InputField
          name="password2"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          value={formData.password2}
          onChange={handleChange}
          className="login-input"
        />
      </div>
    </div>

      <Button text="회원가입 하기" onClick={handleSignup} variant="login-green"/>

      <hr />
      <a href="/login" className="join-link">이미 회원가입을 하셨나요?</a>
    </div>
  );
}

export default SignupForm;