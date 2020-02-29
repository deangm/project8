
CREATE TABLE book (
  id serial,
  author varchar(50) not null,
  book_name varchar(100) not null,
  date_published date not null,
  created_date date default now()
);
INSERT INTO book (author, book_name, date_published) VALUES
('jaxon', 'my secret journey', to_date('2020/01/15','YYYY/MM/DD')),
('Jake from SateFarm', 'Car insurance', to_date('2019/07/13','YYYY/MM/DD'));