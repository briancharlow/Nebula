ALTER PROCEDURE [dbo].[GetAllPosts]
AS
BEGIN
  SET NOCOUNT ON;

  SELECT P.id AS post_id, P.user_id AS post_user_id, P.content AS post_content, P.created_at AS post_created_at,
         PR.username AS post_username,
         COUNT(DISTINCT PL.id) AS post_likes_count,
         COUNT(DISTINCT C.id) AS post_comments_count,
         PM.media_url AS post_media_url,
         C.id AS comment_id, C.user_id AS comment_user_id, C.content AS comment_content, C.created_at AS comment_created_at,
         COUNT(DISTINCT CL.id) AS comment_likes_count,
         R.id AS reply_id, R.user_id AS reply_user_id, R.content AS reply_content, R.created_at AS reply_created_at,
         COUNT(DISTINCT RL.id) AS reply_likes_count
  FROM Posts P
  INNER JOIN Profiles PR ON P.user_id = PR.user_id
  LEFT JOIN PostLikes PL ON P.id = PL.post_id
  LEFT JOIN Comments C ON P.id = C.post_id
  LEFT JOIN CommentsLikes CL ON C.id = CL.comment_id
  LEFT JOIN Replies R ON C.id = R.comment_id
  LEFT JOIN RepliesLikes RL ON R.id = RL.reply_id
  LEFT JOIN PostMedia PM ON P.id = PM.post_id
  WHERE P.is_deleted = 0
  GROUP BY P.id, P.user_id, P.content, P.created_at, PR.username, PM.media_url,
           C.id, C.user_id, C.content, C.created_at,
           R.id, R.user_id, R.content, R.created_at;
END;




