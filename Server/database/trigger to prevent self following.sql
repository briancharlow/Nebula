-- Trigger to prevent self-following
ALTER TRIGGER PreventSelfFollowing
ON Followers
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check for self-following
  IF EXISTS (
    SELECT 1
    FROM inserted
    WHERE follower_id = following_id
  )
  BEGIN
    PRINT 'You cannot follow yourself.';
    ROLLBACK TRANSACTION;
    RETURN;
  END;
END;
GO
