type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

const notifications: Notification[] = [];

export function showNotification(
  message: string,
  type: NotificationType = 'info',
  duration: number = 5000
): void {
  const notification: Notification = {
    id: Date.now().toString(),
    type,
    message,
    duration
  };
  
  notifications.push(notification);
  
  if (duration > 0) {
    setTimeout(() => {
      removeNotification(notification.id);
    }, duration);
  }
}

export function removeNotification(id: string): void {
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.splice(index, 1);
  }
}

export function clearAllNotifications(): void {
  notifications.length = 0;
}