CREATE PROCEDURE GetUserByID
  @UserID INT
AS
BEGIN
  SELECT *
  FROM Users
  WHERE id = @UserID;
END

EXEC GetUserByID @UserID = 1;
