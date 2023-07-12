ALTER PROCEDURE GetNotification
  @notificationId INT
AS
BEGIN
 

  SELECT N.id, P1.username AS user_username, P1.profile_picture AS user_profile_picture,
         P2.username AS sender_username, P2.profile_picture AS sender_profile_picture,
         E.message
  FROM Notifications N
  INNER JOIN Users U ON N.receiver_id = U.id
  INNER JOIN Profiles P1 ON U.id = P1.user_id
  INNER JOIN Users S ON N.sender_id = S.id
  INNER JOIN Profiles P2 ON S.id = P2.user_id
  INNER JOIN Events E ON N.event_id = E.id
  WHERE N.id = @notificationId;
END;


EXEC GetNotification 2012


SELECT * FROM Notifications