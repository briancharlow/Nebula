CREATE PROCEDURE CreateUser
  @fullname VARCHAR(255),
  @email VARCHAR(255),
  @password VARCHAR(255),
  @phone_number INT,
  @status VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  BEGIN TRY
    -- Start a transaction
    BEGIN TRANSACTION;

    -- Insert the user into the Users table
    INSERT INTO Users (fullname, email, password, phone_number, status)
    VALUES (@fullname, @email, @password, @phone_number, @status);

    -- Commit the transaction
    COMMIT;

    -- Return success message
    SELECT 'User created successfully' AS Result;
  END TRY
  BEGIN CATCH
    -- Rollback the transaction if an error occurred
    IF @@TRANCOUNT > 0
      ROLLBACK;

    -- Return error message
    SELECT 'Error: ' + ERROR_MESSAGE() AS Result;
  END CATCH;
END;



EXEC CreateUser
  @fullname = 'brian kyalo',
  @email = 'briankyalo@gmail.com',
  @password = 'password123',
  @phone_number = 0734577890,
  @status = 'Active';

  select * from Users