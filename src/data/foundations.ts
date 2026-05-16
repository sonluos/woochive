export interface CourseEntry {
  semester: string;
  name: string;
  credits: number;
  grade?: string;
  inProgress?: boolean;
}

export interface FoundationsCoursesData {
  major: CourseEntry[];
  elective: CourseEntry[];
}

export const foundationsData: FoundationsCoursesData = {
  major: [
    // 3-1
    { semester: '3-1', name: '수치해석학및연습Ⅰ(영강)', credits: 3, inProgress: true },
    { semester: '3-1', name: '대수학과응용및연습Ⅰ', credits: 3, inProgress: true },
    { semester: '3-1', name: '위상수학및연습Ⅰ', credits: 3, inProgress: true },
    { semester: '3-1', name: '데이터과학', credits: 3, inProgress: true },
    { semester: '3-1', name: '실해석학', credits: 3, inProgress: true },
    // 2-2
    { semester: '2-2', name: '수리통계학및연습Ⅰ(영강)', credits: 3, grade: 'A+' },
    { semester: '2-2', name: '딥러닝개론및연습(영강)', credits: 3, grade: 'A+' },
    { semester: '2-2', name: '해석학및연습Ⅱ(영강)', credits: 3, grade: 'A+' },
    { semester: '2-2', name: '선형대수학및연습Ⅱ', credits: 3, grade: 'A+' },
    { semester: '2-2', name: '편미분방정식및연습', credits: 3, grade: 'A+' },
    // 2-1
    { semester: '2-1', name: '미분방정식및연습', credits: 3, grade: 'A+' },
    { semester: '2-1', name: '해석학및연습Ⅰ', credits: 3, grade: 'A' },
    { semester: '2-1', name: '선형대수학및연습Ⅰ', credits: 3, grade: 'A' },
    { semester: '2-1', name: '인공지능기초(영강)', credits: 3, grade: 'A+' },
    // 2-여름
    { semester: '2-여름', name: '확률과 통계', credits: 3, grade: 'S' },
    // 1-2
    { semester: '1-2', name: '전산프로그래밍언어및실습', credits: 3, grade: 'A+' },
    { semester: '1-2', name: '미적분학및연습Ⅱ', credits: 3, grade: 'A' },
    { semester: '1-2', name: '응용수리과학의이해', credits: 3, grade: 'A' },
    // 1-1
    { semester: '1-1', name: '미적분학및연습Ⅰ', credits: 3, grade: 'A+' },
    { semester: '1-1', name: '전산수학(영강)', credits: 3, grade: 'A+' },
  ],
  elective: [
    // 3-1
    { semester: '3-1', name: '음악과사회', credits: 2, inProgress: true },
    { semester: '3-1', name: '현대음악의이해', credits: 2, inProgress: true },
    // 2-2
    { semester: '2-2', name: '음악이론과악기의응용', credits: 2, grade: 'A+' },
    // 2-1
    { semester: '2-1', name: '음악의표현과감상', credits: 2, grade: 'A+' },
    { semester: '2-1', name: '클래식인문학과교향곡', credits: 3, grade: 'A+' },
    // 1-2
    { semester: '1-2', name: '한국전통예술의이해와감상', credits: 3, grade: 'A+' },
  ],
};
