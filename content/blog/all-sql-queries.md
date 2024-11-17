---
title: "Master all SQL Queries for interviews"
date: "28 July 2024"
category: "CP & Interviews"
tags: ['Sql']
coverImage: "/images/all_sql_queries/cover.webp"
about: "In this comprehensive guide, you'll master essential SQL queries to ace your database-related interviews. Covering everything from basic commands like showing databases and creating tables to more advanced operations such as join queries and data manipulation, this blog provides detailed examples and observations to enhance your understanding. Whether you're a beginner looking to learn the ropes or an experienced developer aiming to refine your skills, this resource is designed to equip you with the SQL proficiency needed for interview success. Dive in and start mastering SQL today!"
---

1. Query to show databases:

```
Input:

mysql>show databases;

Output:
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```


2. Query to create database.

```
mysql> create database demo;
Query OK, 1 row affected (0.02 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| demo               |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)

```

Observation: demo database has been added

3. Query to use a database.

```
mysql> use demo;
Database changed
```

4. Query to create a table.

```
mysql> create table student (name varchar(30), id int not null primary key, address varchar(50), marks int);
Query OK, 0 rows affected (0.04 sec)
```

5. Query to get information about a table

```
mysql> desc student;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(30) | YES  |     | NULL    |       |
| id      | int         | NO   | PRI | NULL    |       |
| address | varchar(50) | YES  |     | NULL    |       |
| marks   | int         | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
```

5. Query to insert a record in a table.

```
mysql> insert into student(marks,id,name,address) values (78,12,"Rishabh","Cleo County, Noida");
Query OK, 1 row affected (0.04 sec)

mysql> insert into student values ('Keshav', 69, 'faridabad, delhi',15);
Query OK, 1 row affected (0.05 sec)

mysql> insert into student values('Ram',45,'rishikesh',79), ('Ravi',17,'Delhi',90);
Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0
```

6. Query to print the table.

```
mysql> select * from student;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ravi    | 17 | Delhi              |    90 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | faridabad, delhi   |    15 |
+---------+----+--------------------+-------+
4 rows in set (0.00 sec)


mysql> select name from student;
+---------+
| name    |
+---------+
| Rishabh |
| Ravi    |
| Ram     |
| Keshav  |
+---------+
4 rows in set (0.00 sec)


mysql> select name, id from student;
+---------+----+
| name    | id |
+---------+----+
| Rishabh | 12 |
| Ravi    | 17 |
| Ram     | 45 |
| Keshav  | 69 |
+---------+----+
4 rows in set (0.01 sec)

mysql> select * from student where id=12;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
+---------+----+--------------------+-------+
1 row in set (0.01 sec)
```

7. Updating an entry:

```
mysql> update student set address='Dehradun' where id=69;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from student;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ravi    | 17 | Delhi              |    90 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | Dehradun           |    15 |
+---------+----+--------------------+-------+
4 rows in set (0.00 sec)
```

8. Adding a new column to a table

```
mysql> alter table student add phoneNo int;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> select * from student;
+---------+----+--------------------+-------+---------+
| name    | id | address            | marks | phoneNo |
+---------+----+--------------------+-------+---------+
| Rishabh | 12 | Cleo County, Noida |    78 |    NULL |
| Ravi    | 17 | Delhi              |    90 |    NULL |
| Ram     | 45 | rishikesh          |    79 |    NULL |
| Keshav  | 69 | Dehradun           |    15 |    NULL |
+---------+----+--------------------+-------+---------+
4 rows in set (0.00 sec)

mysql> update student set phoneNo=123344;
Query OK, 4 rows affected (0.02 sec)
Rows matched: 4  Changed: 4  Warnings: 0

mysql> select * from student;
+---------+----+--------------------+-------+---------+
| name    | id | address            | marks | phoneNo |
+---------+----+--------------------+-------+---------+
| Rishabh | 12 | Cleo County, Noida |    78 |  123344 |
| Ravi    | 17 | Delhi              |    90 |  123344 |
| Ram     | 45 | rishikesh          |    79 |  123344 |
| Keshav  | 69 | Dehradun           |    15 |  123344 |
+---------+----+--------------------+-------+---------+
4 rows in set (0.00 sec)

```

9. Changing a datatype of a table column

```
mysql> alter table student modify column name varchar(60);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc student;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(60) | YES  |     | NULL    |       |
| id      | int         | NO   | PRI | NULL    |       |
| address | varchar(50) | YES  |     | NULL    |       |
| marks   | int         | YES  |     | NULL    |       |
| phoneNo | int         | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
5 rows in set (0.00 sec)
```

10. Query to delete a column from a table.

```
mysql> alter table student drop column phoneNo;
Query OK, 0 rows affected (0.04 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc student;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(60) | YES  |     | NULL    |       |
| id      | int         | NO   | PRI | NULL    |       |
| address | varchar(50) | YES  |     | NULL    |       |
| marks   | int         | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
```

11. Deleting a record.

```
mysql> delete from student where name='Ravi';
Query OK, 1 row affected (0.01 sec)

mysql> select * from student;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | Dehradun           |    15 |
+---------+----+--------------------+-------+
3 rows in set (0.01 sec)
```

12. Query sum, avg, count, max, min functions

```
mysql> select sum(marks) from student;
+------------+
| sum(marks) |
+------------+
|        172 |
+------------+
1 row in set (0.00 sec)

mysql> select avg(marks) from student;
+------------+
| avg(marks) |
+------------+
|    57.3333 |
+------------+
1 row in set (0.01 sec)

mysql> select count(name) from student;
+-------------+
| count(name) |
+-------------+
|           3 |
+-------------+
1 row in set (0.00 sec)

mysql> select max(marks) from student;
+------------+
| max(marks) |
+------------+
|         79 |
+------------+
1 row in set (0.01 sec)

mysql> select min(marks) from student;
+------------+
| min(marks) |
+------------+
|         15 |
+------------+
1 row in set (0.00 sec)
```

13. Query to display in ascending or descending order.

```
mysql> select * from student order by id;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | Dehradun           |    15 |
+---------+----+--------------------+-------+
3 rows in set (0.01 sec)

mysql> select * from student order by id desc;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Keshav  | 69 | Dehradun           |    15 |
| Ram     | 45 | rishikesh          |    79 |
| Rishabh | 12 | Cleo County, Noida |    78 |
+---------+----+--------------------+-------+
3 rows in set (0.01 sec)
```

14. Like query.

```
mysql> select * from student where name like 'R%';
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ram     | 45 | rishikesh          |    79 |
+---------+----+--------------------+-------+
2 rows in set (0.01 sec)

mysql> select * from student where name like '%h';
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
+---------+----+--------------------+-------+
1 row in set (0.01 sec)

mysql> select * from student where name like '_i%';
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
+---------+----+--------------------+-------+
1 row in set (0.01 sec)

mysql> select * from student where name like '%b_';
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
+---------+----+--------------------+-------+
1 row in set (0.01 sec)
```


Creating a new table

```
mysql> create table employee(id int not null primary key, salary int, empcode int, name varchar(30));
Query OK, 0 rows affected (0.03 sec)

mysql> insert into employee values(12,20000,102,'aman'),(23,6000,104,'arun'),(78,7000,105,'ram'),(45,30000,202,'Shyam');
Query OK, 4 rows affected (0.01 sec)
Records: 4  Duplicates: 0  Warnings: 0

mysql> select * from employee;
+----+--------+---------+-------+
| id | salary | empcode | name  |
+----+--------+---------+-------+
| 12 |  20000 |     102 | aman  |
| 23 |   6000 |     104 | arun  |
| 45 |  30000 |     202 | Shyam |
| 78 |   7000 |     105 | ram   |
+----+--------+---------+-------+
4 rows in set (0.00 sec)

```

## Join queries

### Inner Join
```
mysql> select * from student;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | Dehradun           |    15 |
+---------+----+--------------------+-------+
3 rows in set (0.00 sec)

mysql> select * from employee;
+----+--------+---------+-------+
| id | salary | empcode | name  |
+----+--------+---------+-------+
| 12 |  20000 |     102 | aman  |
| 23 |   6000 |     104 | arun  |
| 45 |  30000 |     202 | Shyam |
| 78 |   7000 |     105 | ram   |
+----+--------+---------+-------+
4 rows in set (0.00 sec)

mysql> select * from student inner join employee on student.id=employee.id;
+---------+----+--------------------+-------+----+--------+---------+-------+
| name    | id | address            | marks | id | salary | empcode | name  |
+---------+----+--------------------+-------+----+--------+---------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 | 12 |  20000 |     102 | aman  |
| Ram     | 45 | rishikesh          |    79 | 45 |  30000 |     202 | Shyam |
+---------+----+--------------------+-------+----+--------+---------+-------+
2 rows in set (0.00 sec)
```

### Left join

```
mysql> select * from student;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | Dehradun           |    15 |
+---------+----+--------------------+-------+
3 rows in set (0.00 sec)

mysql> select * from employee;
+----+--------+---------+-------+
| id | salary | empcode | name  |
+----+--------+---------+-------+
| 12 |  20000 |     102 | aman  |
| 23 |   6000 |     104 | arun  |
| 45 |  30000 |     202 | Shyam |
| 78 |   7000 |     105 | ram   |
+----+--------+---------+-------+
4 rows in set (0.00 sec)

mysql> select * from student left join employee on student.id=employee.id;
+---------+----+--------------------+-------+------+--------+---------+-------+
| name    | id | address            | marks | id   | salary | empcode | name  |
+---------+----+--------------------+-------+------+--------+---------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |   12 |  20000 |     102 | aman  |
| Ram     | 45 | rishikesh          |    79 |   45 |  30000 |     202 | Shyam |
| Keshav  | 69 | Dehradun           |    15 | NULL |   NULL |    NULL | NULL  |
+---------+----+--------------------+-------+------+--------+---------+-------+
3 rows in set (0.00 sec)
```

### Right Join

```
mysql> select * from student;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | Dehradun           |    15 |
+---------+----+--------------------+-------+
3 rows in set (0.00 sec)

mysql> select * from employee;
+----+--------+---------+-------+
| id | salary | empcode | name  |
+----+--------+---------+-------+
| 12 |  20000 |     102 | aman  |
| 23 |   6000 |     104 | arun  |
| 45 |  30000 |     202 | Shyam |
| 78 |   7000 |     105 | ram   |
+----+--------+---------+-------+
4 rows in set (0.00 sec)

mysql> select * from student right join employee on stu
dent.id=employee.id;
+---------+------+--------------------+-------+----+--------+---------+-------+
| name    | id   | address            | marks | id | salary | empcode | name  |
+---------+------+--------------------+-------+----+--------+---------+-------+
| Rishabh |   12 | Cleo County, Noida |    78 | 12 |  20000 |     102 | aman  |
| NULL    | NULL | NULL               |  NULL | 23 |   6000 |     104 | arun  |
| Ram     |   45 | rishikesh          |    79 | 45 |  30000 |     202 | Shyam |
| NULL    | NULL | NULL               |  NULL | 78 |   7000 |     105 | ram   |
+---------+------+--------------------+-------+----+--------+---------+-------+
4 rows in set (0.01 sec)
```

### Cross Join

```
mysql> select * from student;
+---------+----+--------------------+-------+
| name    | id | address            | marks |
+---------+----+--------------------+-------+
| Rishabh | 12 | Cleo County, Noida |    78 |
| Ram     | 45 | rishikesh          |    79 |
| Keshav  | 69 | Dehradun           |    15 |
+---------+----+--------------------+-------+
3 rows in set (0.00 sec)

mysql> select * from employee;
+----+--------+---------+-------+
| id | salary | empcode | name  |
+----+--------+---------+-------+
| 12 |  20000 |     102 | aman  |
| 23 |   6000 |     104 | arun  |
| 45 |  30000 |     202 | Shyam |
| 78 |   7000 |     105 | ram   |
+----+--------+---------+-------+
4 rows in set (0.00 sec)

mysql> select * from student cross join employee;
+---------+----+--------------------+-------+----+--------+---------+-------+
| name    | id | address            | marks | id | salary | empcode | name  |
+---------+----+--------------------+-------+----+--------+---------+-------+
| Keshav  | 69 | Dehradun           |    15 | 12 |  20000 |     102 | aman  |
| Ram     | 45 | rishikesh          |    79 | 12 |  20000 |     102 | aman  |
| Rishabh | 12 | Cleo County, Noida |    78 | 12 |  20000 |     102 | aman  |
| Keshav  | 69 | Dehradun           |    15 | 23 |   6000 |     104 | arun  |
| Ram     | 45 | rishikesh          |    79 | 23 |   6000 |     104 | arun  |
| Rishabh | 12 | Cleo County, Noida |    78 | 23 |   6000 |     104 | arun  |
| Keshav  | 69 | Dehradun           |    15 | 45 |  30000 |     202 | Shyam |
| Ram     | 45 | rishikesh          |    79 | 45 |  30000 |     202 | Shyam |
| Rishabh | 12 | Cleo County, Noida |    78 | 45 |  30000 |     202 | Shyam |
| Keshav  | 69 | Dehradun           |    15 | 78 |   7000 |     105 | ram   |
| Ram     | 45 | rishikesh          |    79 | 78 |   7000 |     105 | ram   |
| Rishabh | 12 | Cleo County, Noida |    78 | 78 |   7000 |     105 | ram   |
+---------+----+--------------------+-------+----+--------+---------+-------+
12 rows in set (0.00 sec)

```