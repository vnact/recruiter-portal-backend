import { CompanyEntity } from '@modules/companies/entities/company.entity';
import { IndustryEntity } from '@modules/companies/entities/industry.entity';
import { CompanySize } from 'src/constants/enum';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

const companies: Array<
  Partial<CompanyEntity> & Record<'industryName', string>
> = [
  {
    name: 'Google',
    industryName: 'Information Technology',
    address: 'Toà nhà HESCO, 135A Trần Phú, P. Văn Quán, Hà Đông, Hà Nội',
    gpsLng: 105.7877964,
    gpsLat: 20.9798101,
    phone: '0911175581',
    email: 'google@actvn.edu.vn',
    taxNumber: '0127509424',
    provinceId: 1,
    size: CompanySize.TenThoudsandPlus,
  },
  {
    name: 'Amazon',
    address: '4 Đ. Quang Trung, P. Yết Kiêu, Hà Đông, Hà Nội, Việt Nam',
    industryName: 'E-commerce',
    gpsLng: 105.7877964,
    gpsLat: 20.9798101,
    phone: '0911175581',
    email: 'amazon@actvn.edu.vn',
    taxNumber: '0128509424',
    provinceId: 1,
    size: CompanySize.OneThoudsandPlus,
  },
  {
    name: 'FLC Group',
    industryName: 'Information Technology',
    address: '36 Phạm Hùng, Mỹ Đình, Từ Liêm, Hà Nội, Việt Nam',
    gpsLng: 105.7742844,
    gpsLat: 21.02996,
    phone: '0911175581',
    email: 'flc@actvn.edu.vn',
    taxNumber: '0128509224',
    provinceId: 1,
    size: CompanySize.TwentyFivePlus,
  },
  {
    name: 'Tiki',
    industryName: 'E-commerce',
    address: '252 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam',
    gpsLng: 105.781911,
    gpsLat: 21.045028,
    phone: '0911175581',
    email: 'tiki@actvn.edu.vn',
    taxNumber: '0128509321',
    provinceId: 1,
    size: CompanySize.FiveHundredPlus,
  },
];

export class SeedCompany1664245943933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const company of companies) {
      const industry = await queryRunner.manager.findOneBy(IndustryEntity, {
        name: company.industryName,
      });
      const companyData = queryRunner.manager.create(CompanyEntity, {
        ...company,
        industry,
      });
      await queryRunner.manager.save(companyData);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const companyNames = companies.map((e) => e.name);
    await queryRunner.manager.delete(CompanyEntity, {
      name: In(companyNames),
    });
  }
}
