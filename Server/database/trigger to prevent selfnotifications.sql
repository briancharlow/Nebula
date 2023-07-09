CREATE TRIGGER PreventSelfNotifications
ON Notifications
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Delete notifications for interactions with user's own content
  DELETE n
  FROM Notifications n
  INNER JOIN inserted i ON n.id = i.id
  WHERE i.event_id IN (4, 5, 6)
    AND EXISTS (
      SELECT 1
      FROM Posts p
      INNER JOIN Users u ON p.user_id = u.id
      WHERE p.id = n.event_id
        AND u.id = n.receiver_id
    );

END;
