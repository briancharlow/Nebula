CREATE PROCEDURE UnfollowUser
  @followerID INT,
  @followingID INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Delete the follower record from Followers table
  DELETE FROM Followers
  WHERE follower_id = @followerID AND following_id = @followingID;

  -- Check if any rows were affected
  IF @@ROWCOUNT > 0
  BEGIN
    -- Return success message
    SELECT 'User unfollowed successfully' AS Result;
  END
  ELSE
  BEGIN
    -- Return error message
    SELECT 'Error: You are not following this user' AS Result;
  END;
END;


-- Example usage for UnfollowUser
EXEC UnfollowUser @followerID = 2, @followingID = 1;
select * from Followers