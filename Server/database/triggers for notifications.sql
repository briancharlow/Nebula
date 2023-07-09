-- Trigger for PostLikes
CREATE TRIGGER AddToNotifications_PostLikes
ON PostLikes
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert post like notifications
  INSERT INTO Notifications (sender_id, receiver_id, event_id, is_read, created_at)
  SELECT i.user_id, p.user_id, 4, 0, GETDATE()
  FROM inserted i
  INNER JOIN Posts p ON i.post_id = p.id;

END;
GO

-- Trigger for CommentsLikes
CREATE TRIGGER AddToNotifications_CommentsLikes
ON CommentsLikes
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert comment like notifications
  INSERT INTO Notifications (sender_id, receiver_id, event_id, is_read, created_at)
  SELECT i.user_id, c.user_id, 5, 0, GETDATE()
  FROM inserted i
  INNER JOIN Comments c ON i.comment_id = c.id;

END;
GO

-- Trigger for RepliesLikes
CREATE TRIGGER AddToNotifications_RepliesLikes
ON RepliesLikes
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert reply like notifications
  INSERT INTO Notifications (sender_id, receiver_id, event_id, is_read, created_at)
  SELECT i.user_id, u.id, 6, 0, GETDATE()
  FROM inserted i
  INNER JOIN Replies r ON i.reply_id = r.id
  INNER JOIN Comments c ON r.comment_id = c.id
  INNER JOIN Users u ON c.user_id = u.id;

END;
GO

-- Trigger for Followers
CREATE TRIGGER AddToNotifications_Followers
ON Followers
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert follow notifications
  INSERT INTO Notifications (sender_id, receiver_id, event_id, is_read, created_at)
  SELECT i.follower_id, i.following_id, 7, 0, GETDATE()
  FROM inserted i;

END;
GO

-- Trigger for Comments
CREATE TRIGGER AddToNotifications_Comments
ON Comments
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert comment notifications
  INSERT INTO Notifications (sender_id, receiver_id, event_id, is_read, created_at)
  SELECT i.user_id, p.user_id, 8, 0, GETDATE()
  FROM inserted i
  INNER JOIN Posts p ON i.post_id = p.id;

END;
GO
