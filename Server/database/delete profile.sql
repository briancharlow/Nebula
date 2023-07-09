CREATE PROCEDURE DeleteProfile
  @userID INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the user exists and their profile is active
  IF EXISTS (SELECT 1 FROM Users WHERE id = @userID AND is_deleted = 0)
  BEGIN
    -- Update the status column of the user's profile to "Inactive"
    UPDATE Profiles
    SET status = 'Inactive'
    WHERE user_id = @userID;

    -- Update the is_deleted column of the Users table to 1 (True)
    UPDATE Users
    SET is_deleted = 1,
	    status = 'Inactive'
    WHERE id = @userID;

    -- Return success message
    SELECT 'Profile deleted successfully' AS Result;
  END
  ELSE
  BEGIN
    -- Return error message if user not found or profile already deleted
    SELECT 'Error: User not found or profile already deleted' AS Result;
  END;
END;


EXEC DeleteProfile 1004


select * from Profiles
select * from Users