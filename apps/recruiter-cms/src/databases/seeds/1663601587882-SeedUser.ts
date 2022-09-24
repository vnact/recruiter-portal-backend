import { UserEntity } from '@modules/users/entities/user.entity';
import { ExpLevel, Gender } from '@vnact/recruiter-shared-enum';
import * as moment from 'moment';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1663601587882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UserEntity, {
      email: 'cuong.nl5.kma@gmail.com',
      name: 'Trần Đức Cường',
      birthDay: moment('10/04/2000', 'DD/MM/YYYY').toDate(),
      gender: Gender.Male,
      highSchool: 'Trung học phổ thông Nghi Lộc 5',
      identityCardNumber: '123456789',
      uid: '632af61b0ebf8138eff3e19d',
      password: '$2b$10$Aa9KKFwB.hL49J0iOsa6.e3JX8PvmITT51mlCZYtbbBbAFBja3K4C',
      level: ExpLevel.OnePlus,
    });

    await queryRunner.manager.insert(UserEntity, {
      email: '632af65e0ebf8138eff3e1a3',
      name: 'Nguyễn Lam Sơn',
      birthDay: moment('01/01/2000', 'DD/MM/YYYY').toDate(),
      gender: Gender.Male,
      highSchool: 'Trường THPT chuyên Hà Nội - Amsterdam',
      identityCardNumber: '123456789',
      uid: '632af65e0ebf8138eff3e1a1',
      password: '$2b$10$Aa9KKFwB.hL49J0iOsa6.e3JX8PvmITT51mlCZYtbbBbAFBja3K4C',
      level: ExpLevel.LessThanOne,
    });

    await queryRunner.manager.insert(UserEntity, {
      email: 'daclip26@gmail.com',
      name: 'Đỗ Tuấn Anh',
      birthDay: moment('30/04/2003', 'DD/MM/YYYY').toDate(),
      gender: Gender.Male,
      highSchool: 'Trường Trung học phổ thông chuyên Phan Bội Châu, Nghệ An',
      identityCardNumber: '123456789',
      uid: '632af6d40ebf8138eff3e1b1',
      password: '$2b$10$Aa9KKFwB.hL49J0iOsa6.e3JX8PvmITT51mlCZYtbbBbAFBja3K4C',
      level: ExpLevel.NoExp,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserEntity, {
      email: In([
        'daclip26@gmail.com',
        'cuong.nl5.kma@gmail.com',
        'lamsonkma@gmail.com',
      ]),
    });
  }
}
