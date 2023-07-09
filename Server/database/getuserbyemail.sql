ALTER PROCEDURE GetUserByEmail
  @userEmail VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  SELECT *
  FROM Users
  WHERE email = @userEmail;
END



DECLARE @userEmail VARCHAR(255) = 'briankyalo@gmail.com';

EXEC GetUserByEmail @userEmail
                  

