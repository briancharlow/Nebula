CREATE PROCEDURE FollowUser
  @followerId INT,
  @followingId INT,
  @successMessage VARCHAR(255) OUTPUT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user is already following the specified user
  IF EXISTS (
    SELECT 1
    FROM Followers
    WHERE follower_id = @followerId AND following_id = @followingId
  )
  BEGIN
    SET @successMessage = 'You are already following this user.';
  END
  ELSE
  BEGIN
    -- Insert the follow relationship into the Followers table
    INSERT INTO Followers (follower_id, following_id, created_at)
    VALUES (@followerId, @followingId, GETDATE());

    SET @successMessage = 'You are now following the user.';
  END;
END;


DECLARE @followerId INT = 3; -- Replace with the ID of the follower user
DECLARE @followingId INT = 2; -- Replace with the ID of the user being followed
DECLARE @successMessage VARCHAR(255);

EXEC FollowUser @followerId, @followingId, @successMessage OUTPUT;

SELECT @successMessage AS SuccessMessage;


select * from Notifications