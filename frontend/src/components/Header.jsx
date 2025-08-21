// components/Header.jsx
import "./Header.css";

const Header = () => {
    const today = new Date();
    return (
        <div className="Header">
            <h3>올해의 버킷 🔥</h3>
            <h1>{today.toDateString()}</h1>
        </div>
    );
};

export default Header;
