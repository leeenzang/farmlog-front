import { Link } from 'react-router-dom';
import './Button.css';

/**
 * 다목적 버튼 컴포넌트
 * 
 * @param {string} text - 버튼에 표시할 텍스트
 * @param {string} to - 이동 경로 (Link용)
 * @param {boolean} isLink - 이동 링크인지 여부
 * @param {function} onClick - 클릭 핸들러
 * @param {string} type - button 타입 ('button', 'submit', 'reset')
 * @param {string} variant - 스타일 클래스
 * @param {string} className - 추가 클래스
 */
function Button({
  text,
  children,
  to,
  isLink = false,
  onClick,
  type = 'button',
  variant = '',
  className = ''
}) {
  const classes = `btn ${variant} ${className}`.trim();

  // 1️⃣ 링크로 이동하는 버튼
  if (isLink && to) {
    return (
      <Link to={to} className={classes}>
        {children || text}
      </Link>
    );
  }

  // 2️⃣ 일반 버튼 or 폼 버튼
  return (
    <button
      onClick={onClick}
      type={type} // 'submit'이나 'button' 등 지정 가능
      className={classes}
    >
      {children || text}
    </button>
  );
}

export default Button;