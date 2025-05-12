import { useState, useEffect } from 'react';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import './UserProfilePage.css';
import profileImg from '../../../assets/user-profile.png';

import { fetchUserInfo, updateUserInfo } from '../../../api/users';

function UserProfilePage() {
  const [form, setForm] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  // ✅ 사용자 정보 불러오기
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUserInfo();
        setForm((prev) => ({
          ...prev,
          username: user.username,
          nickname: user.nickname,
        }));
      } catch (err) {
        console.error('❌ 사용자 정보 불러오기 실패:', err);
        alert('로그인이 필요합니다.');
      }
    };
    loadUser();
  }, []);

  // ✅ 입력 핸들링
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ 수정 핸들링
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const payload = {
        nickname: form.nickname,
      };

      if (form.password) {
        payload.password = form.password;
      }

      await updateUserInfo(payload);
      alert('회원 정보가 성공적으로 수정되었습니다!');
      setForm((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
    } catch (err) {
      console.error('❌ 수정 실패:', err);
      alert('정보 수정에 실패했습니다.');
    }
  };

  return (
    <div className="user-page">
      <h2 className="user-title">회원 정보</h2>

      <div className="user-profile-img-wrapper">
        <img src={profileImg} alt="프로필" className="user-profile-img" />
      </div>

      <form className="user-form" onSubmit={handleSubmit}>
        <InputField
          label="아이디"
          name="username"
          value={form.username}
          onChange={handleChange}
          disabled
        />
        <InputField
          label="닉네임"
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
        />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="변경할 비밀번호 입력"
        />
        <InputField
          label="비밀번호 확인"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호 다시 입력"
        />
        <Button type="submit" text="수정하기" variant="plain" />
      </form>
    </div>
  );
}

export default UserProfilePage;