import React from "react";
import { notification, Icon } from "antd";
import { getStyleNotification } from "../Locale";

export const createNotification = (notiContent, durationSet) => {
  notification.open({
    message: notiContent.title,
    description: notiContent.content,
    duration: durationSet,
    icon: <Icon type="check-circle" style={getStyleNotification()} />
  });
};
