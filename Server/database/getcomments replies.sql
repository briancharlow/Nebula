ALTER PROCEDURE GetCommentReplies
  @commentID INT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT r.id AS reply_id, r.content AS reply_content, COUNT(rl.id) AS likes_count,
         c.id AS comment_id, pr.username AS replier_username, r.created_at
  FROM Replies r
  LEFT JOIN RepliesLikes rl ON r.id = rl.reply_id
  INNER JOIN Comments c ON r.comment_id = c.id
  INNER JOIN Profiles pr ON r.user_id = pr.user_id
  WHERE r.comment_id = @commentID
  GROUP BY r.id, r.content, c.id, pr.username, r.created_at;
END;


SELECT * FROM Comments
SELECT * FROM Replies
EXEC GetCommentReplies @commentID = 1;
EXEC GetPostDetails @postID = 1;
EXEC GetPostComments @postID = 1;

