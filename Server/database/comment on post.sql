CREATE PROCEDURE CommentOnPost
  @postId INT,
  @userId INT,
  @content TEXT
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert comment
  INSERT INTO Comments (post_id, user_id, content, created_at)
  VALUES (@postId, @userId, @content, GETDATE());

  -- Select the newly inserted comment
  SELECT * FROM Comments WHERE id = SCOPE_IDENTITY();
END;


-- Execute CommentOnPost procedure
EXEC CommentOnPost
  @postId = 1,
  @userId = 1,
  @content = 'Great post!'



  select * from Notifications