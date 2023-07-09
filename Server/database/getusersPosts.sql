ALTER PROCEDURE GetUserPosts
  @userId INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve user's posts with associated counts and media
  SELECT P.*,
         (SELECT COUNT(*) FROM Comments WHERE post_id = P.id) AS comments_count,
         (SELECT COUNT(*) FROM PostLikes WHERE post_id = P.id) AS likes_count,
         (SELECT COUNT(*) FROM Replies R INNER JOIN Comments C ON R.comment_id = C.id WHERE C.post_id = P.id) AS replies_count,
         PM.media_url
  FROM Posts P
  LEFT JOIN PostMedia PM ON P.id = PM.post_id
  WHERE P.user_id = @userId;
END



DECLARE @userId INT = 1; -- Replace 1 with the actual user ID

-- Get user's profile
EXEC GetUserProfile @userId;

-- Get user's posts
EXEC GetUserPosts @userId;
