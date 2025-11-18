import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const categories = ['1大隊', '2大隊', '3大隊', '4大隊'];
  console.log('category seed...');
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { categoryName: cat },
      update: {},
      create: { categoryName: cat },
    });

    const subNumbers = ['1', '2', '3', '4'];
    for (const sub of subNumbers) {
      const subCategoryName = `${category.categoryName.slice(0, 1)}${sub}中隊`; // 例: 11中隊
      const subCategory = await prisma.subCategory.upsert({
        where: { subCategoryName },
        update: {},
        create: {
          subCategoryName,
          categoryId: category.categoryId,
        },
      });

      for (let i = 1; i <= 3; i++) {
        const minorCategoryName = `${category.categoryName.slice(0, 1)}${sub}${i}小隊`; // 例: 111小隊
        await prisma.minorCategory.upsert({
          where: { minorCategoryName },
          update: {},
          create: {
            minorCategoryName,
            subCategoryId: subCategory.subCategoryId,
          },
        });
      }
    }
  }

  console.log('department seed...');
  const departments = [
    { departmentId: 1, departmentName: '経済学部' },
    { departmentId: 2, departmentName: '法学部' },
    { departmentId: 3, departmentName: '文学部' },
    { departmentId: 4, departmentName: '理学部' },
    { departmentId: 5, departmentName: '工学部' },
    { departmentId: 6, departmentName: '農学部' },
    { departmentId: 7, departmentName: '医学部' },
  ];

  for (const department of departments) {
    await prisma.department.upsert({
      where: { departmentName: department.departmentName },
      update: {},
      create: department,
    });
  }

  console.log('status seed...');
  const statuses = [
    { statusId: 1, statusName: '休務' },
    { statusId: 2, statusName: '平日外出' },
    { statusId: 3, statusName: '校友会' },
    { statusId: 4, statusName: '病気休暇' },
    { statusId: 5, statusName: '特別休暇' },
    { statusId: 6, statusName: '年次休暇' },
    { statusId: 7, statusName: '海外派遣' },
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { statusName: status.statusName },
      update: {},
      create: status,
    });
  }

  const plainPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Seed finished!');
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
