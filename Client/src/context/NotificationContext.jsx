import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse notifications from localStorage:', e);
      }
    }
  }, []);

  // Save to localStorage when notifications state changes
  const saveNotifications = (newNotifications) => {
    setNotifications(newNotifications);
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
  };

  // Add a new notification
  const addNotification = (title, description, type = 'info', iconName = 'cpu') => {
    const newNotif = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      title,
      description,
      type,
      iconName,
      createdAt: new Date().toISOString(),
      read: false
    };
    // Fetch latest notifications from localStorage to avoid closure stale state
    let currentNotifs = [];
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        currentNotifs = JSON.parse(stored);
      } catch (e) {
        currentNotifs = [];
      }
    }
    const updated = [newNotif, ...currentNotifs];
    saveNotifications(updated);
  };

  // Mark specific notification as read
  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  // Clear all notifications
  const clearAll = () => {
    saveNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
