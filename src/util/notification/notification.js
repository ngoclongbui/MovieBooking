import { notification } from "antd";
export const notify = (type, description) => {
  let message = type.toUpperCase();
  notification[type]({
    message,
    description,
  });
};
