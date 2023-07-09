CREATE PROCEDURE GetCommentLikesCount
  @commentId INT,
  @likesCount INT OUTPUT
AS
BEGIN
  SELECT @likesCount = COUNT(*) FROM CommentsLikes WHERE comment_id = @commentId;
END


DECLARE @likesCount INT;
EXEC GetCommentLikesCount @commentId = 1, @likesCount = @likesCount OUTPUT;
SELECT @likesCount AS CommentLikesCount;
