CREATE PROCEDURE AddReplyToComment
  @commentId INT,
  @userId INT,
  @content VARCHAR(255)
AS
BEGIN
  DECLARE @replyId INT;

  -- Check if the comment exists
  IF NOT EXISTS (SELECT 1 FROM Comments WHERE id = @commentId)
  BEGIN
    RAISERROR('The specified comment does not exist.', 16, 1);
    RETURN;
  END;

  -- Check if the user exists
  IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @userId)
  BEGIN
    RAISERROR('The specified user does not exist.', 16, 1);
    RETURN;
  END;

  -- Insert the reply into the Replies table
  INSERT INTO Replies (user_id, comment_id, content, created_at)
  VALUES (@userId, @commentId, @content, CURRENT_TIMESTAMP);

  -- Get the ID of the newly inserted reply
  SET @replyId = SCOPE_IDENTITY();

  -- Return the ID of the newly inserted reply
  SELECT @replyId AS reply_id;
END;

EXEC AddReplyToComment 3014, 4005, 'i love this content'