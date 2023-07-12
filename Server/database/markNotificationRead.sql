CREATE PROCEDURE MarkNotificationAsRead
  @notificationId INT
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE Notifications
  SET is_read = 1
  WHERE id = @notificationId;
END;
