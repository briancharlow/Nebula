CREATE PROCEDURE UnlikeReply
  @replyID INT,
  @userID INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Delete the like record from RepliesLikes table
  DELETE FROM RepliesLikes
  WHERE reply_id = @replyID AND user_id = @userID;

  -- Check if any rows were affected
  IF @@ROWCOUNT > 0
  BEGIN
    -- Return success message
    SELECT 'Reply unliked successfully' AS Result;
  END
  ELSE
  BEGIN
    -- Return error message
    SELECT 'Error: You have not liked this reply' AS Result;
  END;
END;


EXEC UnlikeReply @replyID = 1, @userID = 2;
