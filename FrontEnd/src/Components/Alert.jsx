import '../CSS/Alert.css';

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert-overlay">
            <div className="alert">
                <h2>{message}</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Alert;