const notificationStyle = {
  background: "lightgrey",
  fontSize: 20,
  padding: 10,
  borderStyle: "solid",
  borderRadius: 5,
  marginBottom: 10,
  display: "flex",
  justifyContent: "space-between"
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

const Notification = ({ error, message, setMessage }) =>
  message ? (
    <div style={error ? errorStyle : successStyle}>
      {message} <button onClick={() => setMessage("")}>✖</button>
    </div>
  ) : (
    <></>
  );

export default Notification;
