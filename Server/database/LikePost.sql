CREATE PROCEDURE LikePost
  @user_id INT,
  @post_id INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user has already liked the post
  IF EXISTS (SELECT 1 FROM PostLikes WHERE user_id = @user_id AND post_id = @post_id)
  BEGIN
    RAISERROR('You have already liked this post.', 16, 1);
    RETURN;
  END;

  -- Insert the post like
  INSERT INTO PostLikes (user_id, post_id, created_at)
  VALUES (@user_id, @post_id, GETDATE());

  -- Return success message
  SELECT 'Post liked successfully.' AS Message;
END;



EXEC LikePost 1, 2


select * from PostLikes
select * from Posts
select * from Notifications
