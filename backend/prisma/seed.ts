import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

const lastNames = ['佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤'];
const firstNames = [
  '健太',
  '大輔',
  '直樹',
  '浩二',
  '修平',
  '結衣',
  '陽子',
  '美咲',
  '彩香',
  '真理子',
];

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
    console.log('subCategory seed...');
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

      console.log('minorCategory seed...');
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
    { departmentId: 1, departmentName: '人間文化学科' },
    { departmentId: 2, departmentName: '公共政策学科' },
    { departmentId: 3, departmentName: '国際関係学科' },
    { departmentId: 4, departmentName: '応用物理学科' },
    { departmentId: 5, departmentName: '応用化学科' },
    { departmentId: 6, departmentName: '地球海洋学科' },
    { departmentId: 7, departmentName: '電気電子工学科' },
    { departmentId: 8, departmentName: '通信工学科' },
    { departmentId: 9, departmentName: '情報工学科' },
    { departmentId: 10, departmentName: '機能材料工学科' },
    { departmentId: 11, departmentName: '機械工学科' },
    { departmentId: 12, departmentName: '機械システム工学科' },
    { departmentId: 13, departmentName: '航空宇宙工学科' },
    { departmentId: 14, departmentName: '建設環境工学科' },
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
    { statusId: 8, statusName: '停学' },
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { statusName: status.statusName },
      update: {},
      create: status,
    });
  }

  const studentPassword = '123456';
  const hashedStudentPassword = await bcrypt.hash(studentPassword, 10);

  console.log('cleaning existing data...');
  await prisma.history.deleteMany({});
  await prisma.studentPassword.deleteMany({});
  await prisma.student.deleteMany({});

  console.log('fetching minor categories...');
  const minorCategories = await prisma.minorCategory.findMany({
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
    },
  });

  const numbers: number[] = Array.from({ length: 14 }, (_, i) => i + 1);

  // Fisher–Yates shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const sizes = [4, 4, 4, 2];

  const departmentBatMap: Record<number, number[]> = {};

  let index = 0;
  sizes.forEach((size, i) => {
    departmentBatMap[i + 1] = numbers.slice(index, index + size);
    index += size;
  });

  const studentData: any[] = [];
  const passwordData: any[] = [];

  console.log('generating student data...');
  for (let grade = 1; grade <= 4; grade++) {
    for (let bat = 1; bat <= 4; bat++) {
      const deptIds = departmentBatMap[bat];
      const batMinorCats = minorCategories.filter(
        (mc) => mc.subCategory.category.categoryName === `${bat}大隊`,
      );

      for (const deptId of deptIds) {
        // 各学科30人程度
        for (let i = 0; i < 30; i++) {
          const nameIdx = (grade + bat + deptId + i) % lastNames.length;
          const firstIdx = (i * grade) % firstNames.length;

          const lastName = lastNames[nameIdx];
          const firstName = firstNames[firstIdx];
          const studentName = `${lastName} ${firstName}`;

          const email = `${crypto.randomUUID()}@example.com`;

          const minorCat = batMinorCats[i % batMinorCats.length];
          const studentId = crypto.randomUUID();

          studentData.push({
            studentId,
            studentName,
            email,
            grade,
            departmentId: deptId,
            minorCategoryId: minorCat.minorCategoryId,
          });

          passwordData.push({
            studentId,
            password: hashedStudentPassword,
          });
        }
      }
    }
  }

  console.log(`inserting ${studentData.length} students...`);
  await prisma.student.createMany({ data: studentData });
  await prisma.studentPassword.createMany({ data: passwordData });

  console.log('history seed...');

  const students = await prisma.student.findMany({
    select: { studentId: true },
  });

  const statusesAll = await prisma.status.findMany({
    select: { statusId: true },
  });

  const histories: any[] = [];

  const FIXED_START = new Date('2026-01-01T09:00:00+09:00');
  const FIXED_END = new Date('2026-01-10T15:00:00+09:00');

  // 学生リストをシャッフルして、ランダムに履歴を作成する（全学生の約30%に履歴を持たせる）
  const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
  const targetStudentCount = Math.floor(shuffledStudents.length * 0.3);

  for (let i = 0; i < targetStudentCount; i++) {
    const student = shuffledStudents[i];
    const status = statusesAll[Math.floor(Math.random() * statusesAll.length)];

    histories.push({
      studentId: student.studentId,
      statusId: status.statusId,
      startTime: FIXED_START,
      endTime: FIXED_END,
      validFlag: true,
      other: null,
    });
  }

  console.log(`inserting ${histories.length} histories...`);
  await prisma.history.createMany({ data: histories });

  console.log('admin seed...');
  const adminPassword = 'admin123';
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedAdminPassword,
    },
    create: {
      email: 'admin@example.com',
      password: hashedAdminPassword,
    },
  });

  console.log('✅ Seed finished!');
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
