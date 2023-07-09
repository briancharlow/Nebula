ALTER PROCEDURE GetPostsByFollowing
  @userId INT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT P.id, P.user_id, P.content, P.created_at,
         COUNT(DISTINCT PL.id) AS num_likes,
         COUNT(DISTINCT C.id) AS num_comments,
         PM.media_url
  FROM Posts P
  INNER JOIN Followers F ON P.user_id = F.following_id
  LEFT JOIN PostLikes PL ON P.id = PL.post_id
  LEFT JOIN Comments C ON P.id = C.post_id
  LEFT JOIN PostMedia PM ON P.id = PM.post_id
  WHERE F.follower_id = @userId
  GROUP BY P.id, P.user_id, P.content, P.created_at, PM.media_url;

END;

