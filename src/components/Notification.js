const notificationStyle = {
  background: "lightgrey",
  fontSize: 20,
  padding: 10,
  borderStyle: "solid",
  borderRadius: 5,
  marginBottom: 10,
  display: "flex",
  justifyContent: "space-between",
};

const errorStyle = {
  ...notificationStyle,
  color: "red",
  borderColor: "red",
};

const successStyle = {
  ...notificationStyle,
  color: "green",
  borderColor: "green",
};

const Notification = ({ message, isError, close }) => {
  const closeTimer = setTimeout(close, 5000);

  const forceClose = () => clearTimeout(closeTimer) || close();

  return (
    <div style={isError ? errorStyle : successStyle}>
      {message} <button onClick={forceClose}>✖</button>
    </div>
  );
};

export default Notification;
