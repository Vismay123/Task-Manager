import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;

        const q = query(
          collection(db, "notifications"),
          where("to", "==", userEmail),
          orderBy("createdAt", "desc")
        );

        unsubscribe = onSnapshot(q, (snapshot) => {
          const fetched = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotifications(fetched);
          setLoading(false);
        });
      } else {
        setNotifications([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribe();
    };
  }, []);

  return (
    <div className="notifications-container">
      <h3>Notifications</h3>
      {loading ? (
        <p className="no-notifications">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="no-notifications">No notifications yet.</p>
      ) : (
        notifications.map((notif) => (
          <div key={notif.id} className="notification-item">
            <p>{notif.message}</p>
            <small>
              {notif.createdAt?.seconds
                ? new Date(notif.createdAt.seconds * 1000).toLocaleString()
                : "Just now"}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
