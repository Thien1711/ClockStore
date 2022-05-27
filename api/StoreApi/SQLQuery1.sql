use CLOCKSTOREWEB
go

use master;
go

insert into KhachHangs
values('user1', '1234', N'Nguyễn Ngọc Thiện', '0364117408', 'thienabc926@gmail.com',N'Bình Định', N'N', '2000-05-08', 1);

insert into KhachHangs
values('user2', '1234', N'Nguyễn Ngọc Thiện', '0364117408', 'thienabc926@gmail.com',N'Bình Định', N'Nam', '2000-05-08', 1);

insert into KhachHangs
values('user3', '1234', N'Nguyễn Ngọc Thiện', '0364117408', 'thienabc926@gmail.com',N'Bình Định', N'Nam', '2000-05-08', 1);


select * from KhachHangs
select * from NhanViens
select * from Quyens
select * from HoaDons
select * from ChiTietHDs
select * from SanPhams
select * from ChiTietPNs
select * from PhieuNhaps


select * from SanPhams
select * from nccs
select * from KieuMays
select * from KieuDays

insert into Quyens 
values('thien', 'aa');

insert into NhanViens
values('user1', '1234', N'Nguyễn Ngọc Thiện', '0364117408',  N'Nam','2000-05-08', 1, 1);

insert into HoaDons
values('user3', null, '0364117408', N'Bình Phong', null, '2021-05-08', 200000, 1);

update HoaDons
set NVuser = null
where Id = 2