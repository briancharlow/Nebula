CREATE PROCEDURE GetPostCommentsWithCounts
  @postId INT
AS
BEGIN
  SELECT
    C.id AS comment_id,
    C.content AS comment_content,
    C.created_at AS comment_created_at,
    P.profile_picture AS comment_creator_profile_picture,
    P.username AS comment_creator_username,
    (SELECT COUNT(*) FROM CommentsLikes WHERE comment_id = C.id) AS comment_likes_count,
    (SELECT COUNT(*) FROM Replies WHERE comment_id = C.id) AS reply_count
  FROM Comments AS C
  INNER JOIN Users AS U ON C.user_id = U.id
  INNER JOIN Profiles AS P ON U.id = P.user_id
  WHERE C.post_id = @postId;
END;


EXEC GetPostCommentsWithCounts 2012
select * from Comments