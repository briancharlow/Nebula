CREATE PROCEDURE UnlikeComment
  @commentID INT,
  @userID INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Delete the like record from CommentsLikes table
  DELETE FROM CommentsLikes
  WHERE comment_id = @commentID AND user_id = @userID;

  -- Check if any rows were affected
  IF @@ROWCOUNT > 0
  BEGIN
    -- Return success message
    SELECT 'Comment unliked successfully' AS Result;
  END
  ELSE
  BEGIN
    -- Return error message
    SELECT 'Error: You have not liked this comment' AS Result;
  END;
END;

EXEC UnlikeComment @commentID = 1, @userID = 2;
