import type { ResearchData } from '../types/archive';

export const researchData: ResearchData = {
  publications: [
    {
      id: 'ipiu-2026',
      venue: 'IPIU 2026',
      type: 'Poster Presentation',
      status: 'Presented / In Preparation',
    },
  ],
  projects: [
    {
      id: 'scurt-mir-with-tda',
      title: 'MIR with TDA',
      description:
        '음악 데이터를 DSP와 TDA 관점에서 비교 분석하는 프로젝트. 음악의 시간적·구조적 특징을 위상수학적으로 해석하는 방향을 탐색했다.',
      tags: ['S-Curt', 'MIR', 'TDA'],
      year: '3-1',
      status: 'In Progress',
      pdfUrl: '/MIR%20with%20TDA.pdf',
    },
    {
      id: 'kwms-bone-suppression',
      title: 'Bone Suppression',
      description:
        '흉부 X-ray 영상에서 뼈 구조를 억제하는 의료영상처리 프로젝트. 이미지 생성 모델이 아닌 anisotropic diffusion 기반 영상처리 개념을 활용했다.',
      tags: ['KWMS 2026', 'Bone Suppression', 'Anisotropic Diffusion'],
      year: '3-1',
      status: 'In Progress',
      pdfUrl: '/KWMS%202026.pdf',
    },
    {
      id: 'real-analysis-diffusion',
      title: 'Diffusion',
      description:
        '이미지 생성 모델인 Diffusion을 학생들에게 쉽게 설명하기 위한 교육형 프로젝트. 노이즈 추가와 복원 과정을 직관적으로 이해시키는 데 초점을 두었다.',
      tags: ['Real Analysis', 'Diffusion Models', 'AI Education'],
      year: '3-1',
      status: 'In Progress',
      pdfUrl: '/%EC%8B%A4%ED%95%B4%EC%84%9D%ED%95%99.pdf',
    },
    {
      id: 'ipiu-diffusion-models',
      title: 'Diffusion Models',
      description:
        '이미지 생성 모델로서의 Diffusion Model을 다룬 프로젝트. Forward process와 denoising process를 중심으로 생성 과정을 이해했다.',
      tags: ['IPIU 2026', 'Diffusion Models', 'Image Generation'],
      year: '2-W',
      pdfUrl: '/IPIU%202026.pdf',
    },
    {
      id: 'scurt-mir-with-dsp',
      title: 'MIR with DSP',
      description:
        '기존 MIR 연구에 오디오 신호 분석을 결합한 프로젝트. Preview audio에서 리듬, 템포, 에너지 등 음악적 특징을 추출했다.',
      tags: ['S-Curt', 'MIR', 'DSP'],
      year: '2-2',
      pdfUrl: '/MIR%20with%20DSP.pdf',
    },
    {
      id: 'identifying-human-emotion',
      title: 'Identifying A Human Emotion',
      description:
        '딥러닝 모델을 활용해 인간의 감정 상태를 분류한 프로젝트. 입력 데이터로부터 감정 특징을 학습하고 분류 성능을 확인했다.',
      tags: ['Deep Learning', 'Emotion Recognition', 'Classification'],
      year: '2-2',
      pdfUrl: '/%EB%94%A5%EB%9F%AC%EB%8B%9D%EA%B0%9C%EB%A1%A0%20%EB%B0%8F%20%EC%97%B0%EC%8A%B5.pdf',
    },
    {
      id: 'scurt-mir',
      title: 'MIR',
      description:
        '힙합 음악 데이터를 중심으로 MIR 연구의 기본 구조를 잡은 프로젝트. 메타데이터 기반 분석과 음악 추천 시스템으로의 확장 가능성을 탐색했다.',
      tags: ['S-Curt', 'MIR', 'Music Recommendation'],
      year: '2-1',
      pdfUrl: '/MIR.pdf',
    },
    {
      id: 'sejong-inbody-data',
      title: 'Sejong Inbody Data Analysis',
      description:
        '세종시 인바디 데이터를 활용해 신체 지표의 패턴을 분석한 프로젝트. 인공지능 기초 수준에서 예측 및 분류 가능성을 탐색했다.',
      tags: ['Introduction To Artificial Intelligence', 'Data Analysis', 'Health Data'],
      year: '2-1',
      pdfUrl: '/%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5%EA%B8%B0%EC%B4%88.pdf',
    },
    {
      id: 'wildfire-helicopter-path',
      title: 'Wildfire Helicopter Path Optimization',
      description:
        '산불 진화 상황에서 헬기의 이동 경로를 수학적으로 모델링한 프로젝트. 최단 경로와 법선 방향 접근을 시도했지만, 최종 문제는 완전히 해결하지 못했다.',
      tags: ['Computational Mathematics', 'Optimization', 'Path Planning'],
      year: '1-1',
      pdfUrl: '/%EC%A0%84%EC%82%B0%EC%88%98%ED%95%99.pdf',
    },
  ],
};
