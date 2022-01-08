
create database speediodb;

create table users(
    id serial primary key,
    username text not null,
    email text not null,
    password text not null
);

create table url(
    id serial primary key,
    user_id int,
    url_address text not null,
    title varchar(20) not null,
    visits int,
    foreign key(user_id) references users(id)
)