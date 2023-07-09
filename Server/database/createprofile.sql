ALTER PROCEDURE CreateProfile
  @userId INT,
  @bio NVARCHAR(MAX),
  @username VARCHAR(255),
  @profilePicture VARCHAR(255),
  @status VARCHAR(50),
  @location VARCHAR(255),
  @profileId INT = '' OUTPUT 
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO Profiles (user_id, bio, username, profile_picture, status, location)
  VALUES (@userId, @bio, @username, @profilePicture, @status, @location);

  SET @profileId = SCOPE_IDENTITY();

  SELECT * FROM Profiles WHERE id = @profileId;
END;

DECLARE @userId INT = 1; -- Replace with the appropriate user ID
DECLARE @bio NVARCHAR = 'This is the user''s bio.';
DECLARE @username VARCHAR(255) = 'brian';
DECLARE @profilePicture VARCHAR(255) = 'https://example.com/profile.jpg';
DECLARE @status VARCHAR(50) = 'Active';
DECLARE @location VARCHAR(255) = 'New York';

DECLARE @profileId INT;
EXEC CreateProfile @userId, @bio, @username, @profilePicture, @status, @location;



select * from Profiles

