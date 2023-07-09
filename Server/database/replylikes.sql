CREATE PROCEDURE LikeReply
  @user_id INT,
  @reply_id INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user has already liked the reply
  IF EXISTS (SELECT 1 FROM RepliesLikes WHERE user_id = @user_id AND reply_id = @reply_id)
  BEGIN
    RAISERROR('You have already liked this reply.', 16, 1);
    RETURN;
  END;

  -- Insert the reply like
  INSERT INTO RepliesLikes (user_id, reply_id, created_at)
  VALUES (@user_id, @reply_id, GETDATE());

  -- Return success message
  SELECT 'Reply liked successfully.' AS Message;
END;


EXEC LikeReply 1, 2


select * from RepliesLikes
select * from Replies
select * from Notifications