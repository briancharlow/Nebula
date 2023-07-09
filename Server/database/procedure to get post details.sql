ALTER PROCEDURE GetPostDetails
  @postID INT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT p.id AS post_id, p.content AS post_content, COUNT(pl.id) AS likes_count, COUNT(c.id) AS comments_count, pm.media_url
  FROM Posts p
  LEFT JOIN PostLikes pl ON p.id = pl.post_id
  LEFT JOIN PostMedia pm ON p.id = pm.post_id
  LEFT JOIN Comments c ON p.id = c.post_id
  WHERE p.id = @postID
  GROUP BY p.id, p.content, pm.media_url;
END;




EXEC GetPostDetails @postID = 2;

select * from PostMedia
 