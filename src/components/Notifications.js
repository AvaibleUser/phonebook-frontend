import Notification from "./Notification";

const Notifications = ({ messages, setMessages }) =>
  messages.map(({ message, isError, key }, i) => {
    const close = () => {
      setMessages((messages_) =>
        messages_.filter((message_) => message_.message !== message)
      );
    };

    return (
      <Notification
        key={key}
        isError={isError}
        message={message}
        close={close}
      />
    );
  });

export default Notifications;
