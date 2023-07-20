CREATE PROCEDURE GetRepliesToCommentWithLikes
  @commentId INT
AS
BEGIN
  SELECT
    R.id AS reply_id,
    R.content AS reply_content,
    R.created_at AS reply_created_at,
    P.profile_picture AS reply_creator_profile_picture,
    P.username AS reply_creator_username,
    (SELECT COUNT(*) FROM RepliesLikes WHERE reply_id = R.id) AS reply_likes_count
  FROM Replies AS R
  INNER JOIN Users AS U ON R.user_id = U.id
  INNER JOIN Profiles AS P ON U.id = P.user_id
  WHERE R.comment_id = @commentId;
END;
