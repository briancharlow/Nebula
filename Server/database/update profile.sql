CREATE OR ALTER PROCEDURE UpdateProfile
  @userId INT,
  @bio NVARCHAR(MAX),
  @username VARCHAR(255),
  @profilePicture VARCHAR(255),
  @location VARCHAR(255),
  @password VARCHAR(255) -- New parameter for the user's password
AS
BEGIN
  SET NOCOUNT ON;

  -- Update the user's profile in the Profiles table
  UPDATE Profiles
  SET bio = @bio,
      username = @username,
      profile_picture = @profilePicture,
      location = @location
  WHERE user_id = @userId;

  -- Update the user's password in the Users table
  UPDATE Users
  SET password = @password
  WHERE id = @userId;

  -- Return the updated profile information along with the password
  SELECT P.*, U.password
  FROM Profiles P
  INNER JOIN Users U ON P.user_id = U.id
  WHERE P.user_id = @userId;
END;


