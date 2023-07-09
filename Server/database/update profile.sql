ALTER PROCEDURE UpdateProfile
  @userId INT,
  @bio NVARCHAR(MAX),
  @username VARCHAR(255),
  @profilePicture VARCHAR(255),
  @location VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE Profiles
  SET bio = @bio,
      username = @username,
      profile_picture = @profilePicture,
      location = @location
  WHERE user_id = @userId;

  SELECT * FROM Profiles WHERE user_id = @userId;
END;

select * from Profiles
DECLARE @userId INT = 2; -- Provide the user ID to update
DECLARE @bio NVARCHAR(MAX) = 'New bio content';
DECLARE @username VARCHAR(255) = 'new_username';
DECLARE @profilePicture VARCHAR(255) = 'new_profile_picture.jpg';
DECLARE @location VARCHAR(255) = 'New York';

EXEC UpdateProfile
  @userId = @userId,
  @bio = @bio,
  @username = @username,
  @profilePicture = @profilePicture,
  @location = @location;



select * from Notifications