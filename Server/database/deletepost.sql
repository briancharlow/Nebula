CREATE PROCEDURE DeletePost
  @postId INT
AS
BEGIN
  SET NOCOUNT ON;
  
  BEGIN TRY
    -- Start a transaction
    BEGIN TRANSACTION;
    
    -- Soft delete the post by updating the is_deleted column
    UPDATE Posts
    SET is_deleted = 1
    WHERE id = @postId;
    
    -- Commit the transaction
    COMMIT;
    
    -- Return success message
    SELECT 'Post deleted successfully' AS Result;
  END TRY
  BEGIN CATCH
    -- Rollback the transaction if an error occurred
    IF @@TRANCOUNT > 0
      ROLLBACK;
    
    -- Return error message
    SELECT 'Error: ' + ERROR_MESSAGE() AS Result;
  END CATCH;
END;


EXEC DeletePost @postId = 2;

select * from Posts
