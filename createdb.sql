create table if not exists guild
(
    id     varchar(20)            not null,
    prefix varchar(3) default '.' not null,
    constraint guild_id_uindex
        unique (id)
);

alter table guild
    add primary key (id);

create table if not exists user
(
    id      varchar(20) not null,
    balance int         not null,
    constraint user_id_uindex
        unique (id)
);

alter table user
    add primary key (id);


