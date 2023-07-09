CREATE PROCEDURE GetPostLikesCount
  @post_id INT,
  @like_count INT OUTPUT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT @like_count = COUNT(*) 
  FROM PostLikes 
  WHERE post_id = @post_id;
  
  -- Return the like count
  SELECT @like_count AS like_count;
END;

DECLARE @like_count INT;

EXEC GetPostLikesCount @post_id = 1, @like_count = @like_count OUTPUT;

SELECT @like_count AS like_count;
