CREATE PROCEDURE LikeComment
  @user_id INT,
  @comment_id INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user has already liked the comment
  IF EXISTS (SELECT 1 FROM CommentsLikes WHERE user_id = @user_id AND comment_id = @comment_id)
  BEGIN
    RAISERROR('You have already liked this comment.', 16, 1);
    RETURN;
  END;

  -- Insert the comment like
  INSERT INTO CommentsLikes (user_id, comment_id, created_at)
  VALUES (@user_id, @comment_id, GETDATE());

  -- Return success message
  SELECT 'Comment liked successfully.' AS Message;
END;



EXEC LikeComment 2, 1


select * from CommentsLikes
select * from Comments
select * from Notifications