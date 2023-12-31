CREATE PROCEDURE UnlikePost
  @postID INT,
  @userID INT
AS
BEGIN

  -- Delete the like record from PostLikes table
  DELETE FROM PostLikes
  WHERE post_id = @postID AND user_id = @userID;

  -- Check if any rows were affected
  IF @@ROWCOUNT > 0
  BEGIN
    -- Return success message
    SELECT 'Post unliked successfully' AS Result;
  END
  ELSE
  BEGIN
    -- Return error message
    SELECT 'Error: You have not liked this post' AS Result;
  END;
END;


-- Example usage for UnlikePost
EXEC UnlikePost @postID = 1, @userID = 4005;


EXEC LikePost 4005, 1
select * from PostLikes
select * from Users
select * from Profiles
select * from Posts
select * from PostMedia


EXEC GetAllPosts