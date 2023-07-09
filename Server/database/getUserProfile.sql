ALTER PROCEDURE GetUserProfile
  @userId INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve user profile details and follower count
  SELECT P.id, P.user_id, P.bio, P.username, P.profile_picture, P.status, P.location,
         (SELECT COUNT(*) FROM Followers WHERE following_id = P.user_id) AS followers_count,
         (SELECT COUNT(*) FROM Followers WHERE follower_id = P.user_id) AS following_count
  FROM Profiles P
  WHERE P.user_id = @userId;
END


