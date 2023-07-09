ALTER PROCEDURE GetPostComments
  @postID INT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT c.id AS comment_id, c.content AS comment_content, COUNT(cl.id) AS likes_count, COUNT(r.id) AS reply_count,
         p.id AS post_id, pr.username AS commenter_username, c.created_at
  FROM Comments c
  LEFT JOIN CommentsLikes cl ON c.id = cl.comment_id
  LEFT JOIN Replies r ON c.id = r.comment_id
  INNER JOIN Posts p ON c.post_id = p.id
  INNER JOIN Profiles pr ON c.user_id = pr.user_id
  WHERE c.post_id = @postID
  GROUP BY c.id, c.content, p.id, pr.username, c.created_at;
END;



select * from Comments
SELECT * FROM Users
SELECT * FROM Profiles

EXEC GetPostComments @postID = 1;
