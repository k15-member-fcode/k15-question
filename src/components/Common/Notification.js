//  Notification successfull changing language
export const createNotification = (notiLang) => {
    notification.open({
        message: notiLang.title,
        description: notiLang.content,
        icon: <Icon type="check-circle" style={getStyleNotification()} />
    });
};