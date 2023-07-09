CREATE PROCEDURE CreatePost
  @userId INT,
  @content TEXT,
  @mediaUrl VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  BEGIN TRY
    -- Start a transaction
    BEGIN TRANSACTION;

    -- Insert the post into the Posts table
    INSERT INTO Posts (user_id, content)
    VALUES (@userId, @content);

    -- Get the ID of the newly created post
    DECLARE @postId INT = SCOPE_IDENTITY();

    -- Insert the media attachment into the PostMedia table
    INSERT INTO PostMedia (post_id, media_url)
    VALUES (@postId, @mediaUrl);

    -- Commit the transaction
    COMMIT;

    -- Return success message
    SELECT 'Post created successfully' AS Result;
  END TRY
  BEGIN CATCH
    -- Rollback the transaction if an error occurred
    IF @@TRANCOUNT > 0
      ROLLBACK;

    -- Return error message
    SELECT 'Error: ' + ERROR_MESSAGE() AS Result;
  END CATCH;
END;

EXEC CreatePost @userId = 1, @content = 'Check out this amazing photo!', @mediaUrl = 'https://example.com/photo.jpg';


select * from Posts