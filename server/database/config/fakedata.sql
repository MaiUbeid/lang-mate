INSERT INTO languages
  (name)
VALUES
  ('arabic'),
  ('english'),
  ('french'),
  ('spanish'),
  ('dutch'),
  ('japanese');

INSERT INTO interests
  (name)
VALUES
  ('music'),
  ('sports'),
  ('football'),
  ('reading'),
  ('novels'),
  ('games'),
  ('swimming');

INSERT INTO users
  (username, email, password, isActive, native_lang_id, learning_lang_id)
VALUES
   ('amoodaa', 'amoodaa@gmail.com', 'something', true,1,6),
   ('fadi', 'amoodaa2@gmail.com', 'something', true,1,5),
   ('yosef', 'amoodaa3@gmail.com', 'something', true,2,4),
   ('mai', 'amoodaa5@gmail.com', 'something', true,4,6);

INSERT INTO channels
  (name)
VALUES
  ('cha1'),
  ('cha2'),
  ('cha3'),
  ('cha4');

INSERT INTO user_interest
  (interest_id, user_id)
VALUES
  (1,1),
  (1,2),
  (2,1),
  (5,2),
  (3,4),
  (5,4);

INSERT INTO user_channel
  (channel_id, user_id)
VALUES
  (1,1),
  (1,2),
  (2,1),
  (2,3),
  (3,2),
  (3,4);

INSERT INTO messages
  (user_id, channel_id, content, sent_at)
VALUES
  (1, 1, 'hey', CURRENT_TIMESTAMP),
  (1, 2, 'hey2', CURRENT_TIMESTAMP),
  (1, 3, 'hey3', CURRENT_TIMESTAMP),
  (2, 1, 'hey4', CURRENT_TIMESTAMP),
  (1, 3, 'hey1', CURRENT_TIMESTAMP);
