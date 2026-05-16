export interface CourseEntry {
  semester: string;
  code: string;
  name: string;
  category: string;
  credits: number;
  grade: string;
}

export interface FoundationsCoursesData {
  major: CourseEntry[];
  elective: CourseEntry[];
}

export const foundationsData: FoundationsCoursesData = {
  major: [
    { semester: '2023-1', code: 'DCSC16101', name: '미적분학및연습Ⅰ', category: '교양', credits: 3, grade: 'A+' },
    { semester: '2023-1', code: 'DCSC16500', name: '전산수학(영강)', category: '학문의기초', credits: 3, grade: 'A+' },
    { semester: '2023-2', code: 'DCCS10503', name: '전산프로그래밍언어및실습', category: '교양', credits: 3, grade: 'A+' },
    { semester: '2023-2', code: 'DCSC16201', name: '미적분학및연습Ⅱ', category: '교양', credits: 3, grade: 'A' },
    { semester: '2023-2', code: 'DCSC16600', name: '응용수리과학의이해', category: '학문의기초', credits: 3, grade: 'A' },
    { semester: '2025-1', code: 'DCSC20500', name: '미분방정식및연습', category: '전공선택', credits: 3, grade: 'A+' },
    { semester: '2025-1', code: 'DCSC21700', name: '해석학및연습Ⅰ', category: '전공선택', credits: 3, grade: 'A' },
    { semester: '2025-1', code: 'DCSC21900', name: '선형대수학및연습Ⅰ', category: '전공선택', credits: 3, grade: 'A' },
    { semester: '2025-1', code: 'DCSC22300', name: '인공지능기초(영강)', category: '전공선택', credits: 3, grade: 'A+' },
    { semester: '2025-여름', code: '', name: '확률과 통계', category: '일반선택', credits: 3, grade: 'S' },
    { semester: '2025-2', code: 'DCSC30700', name: '수리통계학및연습Ⅰ(영강)', category: '전공선택', credits: 3, grade: 'A+' },
    { semester: '2025-2', code: 'DCSC32300', name: '딥러닝개론및연습(영강)', category: '전공선택', credits: 3, grade: 'A+' },
    { semester: '2025-2', code: 'DCSC21800', name: '해석학및연습Ⅱ(영강)', category: '전공필수', credits: 3, grade: 'A+' },
    { semester: '2025-2', code: 'DCSC22000', name: '선형대수학및연습Ⅱ', category: '전공필수', credits: 3, grade: 'A+' },
    { semester: '2025-2', code: 'DCSC22200', name: '편미분방정식및연습', category: '전공필수', credits: 3, grade: 'A+' },
  ],
  elective: [
    { semester: '2023-2', code: 'GSLA01200', name: '한국전통예술의이해와감상', category: '교양', credits: 3, grade: 'A+' },
    { semester: '2025-1', code: 'SPGS30401', name: '음악의표현과감상', category: '교양', credits: 2, grade: 'A+' },
    { semester: '2025-1', code: 'SPGS33700', name: '클래식인문학과교향곡', category: '교양', credits: 3, grade: 'A+' },
    { semester: '2025-2', code: 'SPGS32600', name: '음악이론과악기의응용', category: '교양', credits: 2, grade: 'A+' },
  ],
};
