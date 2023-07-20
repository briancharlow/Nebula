CREATE TABLE Users (
  id INT PRIMARY KEY,
  fullname VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  phone_number INT,
  status VARCHAR(255),
  created_at DATETIME
);

CREATE TABLE Profiles (
  id INT PRIMARY KEY,
  user_id INT,
  bio TEXT,
  username VARCHAR(255) UNIQUE,
  profile_picture VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Posts (
  id INT PRIMARY KEY,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE PostMedia (
  id INT PRIMARY KEY,
  post_id INT,
  media_url VARCHAR(255),
  FOREIGN KEY (post_id) REFERENCES Posts(id)
);

CREATE TABLE Comments (
  id INT PRIMARY KEY,
  post_id INT,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Replies (
  id INT PRIMARY KEY,
  user_id INT,
  comment_id INT,
  content VARCHAR(255),
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (comment_id) REFERENCES Comments(id)
);

CREATE TABLE PostLikes (
  id INT PRIMARY KEY,
  user_id INT,
  post_id INT,
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (post_id) REFERENCES Posts(id)
);

CREATE TABLE CommentsLikes (
  id INT PRIMARY KEY,
  comment_id INT,
  user_id INT,
  created_at INT,
  FOREIGN KEY (comment_id) REFERENCES Comments(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE RepliesLikes (
  id INT PRIMARY KEY,
  reply_id INT,
  user_id INT,
  created_at TIMESTAMP,
  FOREIGN KEY (reply_id) REFERENCES Replies(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Events (
  id INT PRIMARY KEY,
  type TEXT,
  message TEXT
);

CREATE TABLE Followers (
  id INT PRIMARY KEY,
  follower_id INT,
  following_id INT,
  created_at TIMESTAMP,
  FOREIGN KEY (follower_id) REFERENCES Users(id),
  FOREIGN KEY (following_id) REFERENCES Users(id)
);

CREATE TABLE Notifications (
  id INT PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  event_id INT,
  is_read BIT,
  created_at TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES Users(id),
  FOREIGN KEY (receiver_id) REFERENCES Users(id),
  FOREIGN KEY (event_id) REFERENCES Events(id)
);
