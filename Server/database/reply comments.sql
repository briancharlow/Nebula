CREATE PROCEDURE ReplyToComment
  @commentId INT,
  @userId INT,
  @content VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert reply
  INSERT INTO Replies (user_id, comment_id, content, created_at)
  VALUES (@userId, @commentId, @content, GETDATE());

  -- Select the newly inserted reply
  SELECT * FROM Replies WHERE id = SCOPE_IDENTITY();
END;



-- Execute ReplyToComment procedure
EXEC ReplyToComment
  @commentId = 2,
  @userId = 3,
  @content = 'Thank you for your comment!'

  
  select * from Notifications