import { UserEntity } from '@modules/users/entities/user.entity';
import { ExpLevel, Gender, UserRole } from '@vnact/recruiter-shared-enum';
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
      role: UserRole.Member,
      level: ExpLevel.OnePlus,
    });

    await queryRunner.manager.insert(UserEntity, {
      email: 'lamsonkma@gmail.com',
      name: 'Nguyễn Lam Sơn',
      birthDay: moment('01/01/2000', 'DD/MM/YYYY').toDate(),
      gender: Gender.Male,
      highSchool: 'Trường THPT chuyên Hà Nội - Amsterdam',
      identityCardNumber: '123456789',
      uid: '632af65e0ebf8138eff3e1a1',
      role: UserRole.Recruiter,
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
      role: UserRole.Member,
      level: ExpLevel.NoExp,
    });

    await queryRunner.manager.insert(UserEntity, {
      email: 'son.lam@gmail.com',
      name: 'Nguyễn Lam Sơn',
      birthDay: moment('1/01/2000', 'DD/MM/YYYY').toDate(),
      gender:Gender.Male,
      highSchool: 'Trường Trung học phổ thông Thuận Thành số 3',
      identityCardNumber: '123456789',
      uid: '6348d2a9daceb469eb17bc02',
      role: UserRole.Member,
      level: ExpLevel.NoExp,
    });

    await queryRunner.manager.insert(UserEntity, {
      email: 'cu.son@gmail.com',
      name: 'Nguyễn Lam Sơn',
      birthDay: moment('1/01/2000', 'DD/MM/YYYY').toDate(),
      gender:Gender.Male,
      highSchool: 'Trường Trung học phổ thông Thuận Thành số 3',
      identityCardNumber: '123456789',
      uid: '6350af9ea9f0b44b069ed38a',
      role: UserRole.Member,
      level: ExpLevel.NoExp,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserEntity, {
      email: In([
        'daclip26@gmail.com',
        'cuong.nl5.kma@gmail.com',
        'lamsonkma@gmail.com',
        'son.lam@gmail.com',
        'cu.son@gmail.com'
      ]),
    });
  }
}
