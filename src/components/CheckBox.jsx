// components/CheckBox.jsx
function CheckBox({ label }) {
    return (
        <label className="checkbox-wrap">
            <input type="checkbox" />
            {label}
        </label>
    );
}

export default CheckBox;