import { ResearchProject, MusicWork, Publication, Bio } from '../types/portfolio';

export const bio: Bio = {
  name: 'Woochive',
  introduction: 'AI 연구자이자 음악가입니다. 수학, 신호처리, 그리고 창의적인 작업의 교차점에서 활동하고 있습니다.',
  email: 'contact@woochive.com',
  socialLinks: {
    github: 'https://github.com/woochive',
  }
};

export const projects: ResearchProject[] = [
  {
    id: 'ai-music-generation',
    title: 'AI 음악 생성 시스템',
    description: '딥러닝을 활용한 음악 생성 및 작곡 보조 시스템',
    date: '2024-01-15',
    tags: ['AI', 'Music', 'Deep Learning'],
    fullDescription: '트랜스포머 아키텍처를 기반으로 한 음악 생성 모델을 개발했습니다. 사용자의 입력을 받아 다양한 스타일의 음악을 생성할 수 있습니다.',
    images: [],
    technologies: ['Python', 'PyTorch', 'MIDI', 'Music21'],
    links: {
      github: 'https://github.com/woochive/ai-music-gen'
    }
  },
  {
    id: 'signal-processing-toolkit',
    title: '신호처리 툴킷',
    description: '실시간 오디오 신호 분석 및 처리 라이브러리',
    date: '2023-09-20',
    tags: ['Signal Processing', 'Audio', 'Mathematics'],
    fullDescription: '실시간 오디오 신호를 분석하고 처리하는 고성능 라이브러리입니다. FFT, 웨이블릿 변환 등 다양한 신호처리 기법을 제공합니다.',
    images: [],
    technologies: ['C++', 'Python', 'NumPy', 'FFTW'],
  },
  {
    id: 'neural-style-transfer',
    title: '뉴럴 스타일 트랜스퍼',
    description: 'CNN을 활용한 예술적 이미지 변환',
    date: '2023-06-12',
    tags: ['Computer Vision', 'Deep Learning', 'Art'],
    fullDescription: 'VGG 네트워크를 기반으로 한 스타일 트랜스퍼 시스템입니다. 콘텐츠 이미지와 스타일 이미지를 결합하여 새로운 예술 작품을 생성합니다.',
    images: [],
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'NumPy'],
    links: {
      github: 'https://github.com/woochive/neural-style'
    }
  },
  {
    id: 'quantum-algorithms',
    title: '양자 알고리즘 시뮬레이터',
    description: '양자 컴퓨팅 알고리즘 교육용 시뮬레이터',
    date: '2023-03-08',
    tags: ['Quantum Computing', 'Mathematics', 'Education'],
    fullDescription: 'Grover 알고리즘, Shor 알고리즘 등 주요 양자 알고리즘을 시각화하고 시뮬레이션할 수 있는 교육용 도구입니다.',
    images: [],
    technologies: ['Python', 'Qiskit', 'Matplotlib', 'Jupyter'],
  },
  {
    id: 'nlp-sentiment-analysis',
    title: '감성 분석 시스템',
    description: '한국어 텍스트 감성 분석 모델',
    date: '2022-11-20',
    tags: ['NLP', 'Deep Learning', 'Korean'],
    fullDescription: 'BERT 기반의 한국어 감성 분석 모델입니다. 영화 리뷰, 상품 리뷰 등 다양한 도메인에서 높은 정확도를 보입니다.',
    images: [],
    technologies: ['Python', 'Transformers', 'KoBERT', 'FastAPI'],
    links: {
      github: 'https://github.com/woochive/sentiment-kr'
    }
  }
];

export const musicWorks: MusicWork[] = [
  {
    id: 'digital-dreams',
    title: 'Digital Dreams',
    description: '전자음악과 클래식의 융합',
    date: '2024-03-10',
    tags: ['Electronic', 'Classical', 'Experimental'],
    instruments: ['Synthesizer', 'Piano', 'Strings'],
    fullDescription: '디지털 사운드와 어쿠스틱 악기의 조화를 탐구한 작품입니다. 알고리즘적 작곡 기법과 전통적인 음악 이론을 결합했습니다.',
  },
  {
    id: 'mathematical-variations',
    title: 'Mathematical Variations',
    description: '수학적 패턴을 음악으로 표현',
    date: '2023-11-05',
    tags: ['Algorithmic', 'Contemporary', 'Mathematics'],
    instruments: ['Piano', 'Computer'],
    fullDescription: '프랙탈 패턴과 수열을 음악적 구조로 변환한 실험적 작품입니다.',
  },
  {
    id: 'urban-soundscape',
    title: 'Urban Soundscape',
    description: '도시의 소리를 재해석한 앰비언트 작품',
    date: '2023-08-15',
    tags: ['Ambient', 'Field Recording', 'Electronic'],
    instruments: ['Field Recorder', 'Synthesizer', 'Sampler'],
    fullDescription: '서울의 다양한 장소에서 녹음한 소리를 전자음악과 결합한 사운드스케이프 작품입니다. 도시의 리듬과 멜로디를 발견하는 여정입니다.',
  },
  {
    id: 'string-quartet-no1',
    title: 'String Quartet No. 1',
    description: '현대적 해석의 현악 4중주',
    date: '2023-05-20',
    tags: ['Classical', 'Contemporary', 'Chamber Music'],
    instruments: ['Violin I', 'Violin II', 'Viola', 'Cello'],
    fullDescription: '전통적인 현악 4중주 형식에 현대적인 화성과 리듬을 접목한 작품입니다. 3악장으로 구성되어 있습니다.',
  },
  {
    id: 'generative-music-system',
    title: 'Generative Music System',
    description: '실시간 생성 음악 시스템',
    date: '2023-02-10',
    tags: ['Generative', 'Interactive', 'Algorithmic'],
    instruments: ['Computer', 'MIDI Controller'],
    fullDescription: '알고리즘과 확률론을 기반으로 실시간으로 음악을 생성하는 인터랙티브 시스템입니다. 매 연주마다 다른 결과를 만들어냅니다.',
  },
  {
    id: 'piano-etudes',
    title: 'Piano Etudes',
    description: '현대 피아노를 위한 연습곡',
    date: '2022-12-01',
    tags: ['Classical', 'Piano', 'Contemporary'],
    instruments: ['Piano'],
    fullDescription: '기술적 도전과 음악적 표현을 결합한 6개의 피아노 연습곡 모음입니다. 각 곡은 특정 기법에 초점을 맞춥니다.',
  }
];

export const publications: Publication[] = [
  {
    id: 'deep-learning-music',
    title: 'Deep Learning Approaches to Music Generation: A Survey',
    authors: ['Woochive', 'Co-Author'],
    venue: 'International Conference on Music Information Retrieval',
    date: '2024-02-01',
    abstract: '음악 생성을 위한 딥러닝 접근법에 대한 포괄적인 서베이 논문입니다. 최신 연구 동향과 향후 방향성을 제시합니다.',
    tags: ['Deep Learning', 'Music Generation', 'Survey'],
    links: {
      arxiv: 'https://arxiv.org/abs/2024.xxxxx'
    }
  }
];

publications.push(
  {
    id: 'signal-processing-wavelet',
    title: 'Wavelet-based Signal Processing for Audio Analysis',
    authors: ['Woochive', 'Jane Smith', 'John Doe'],
    venue: 'IEEE Transactions on Signal Processing',
    date: '2023-07-15',
    abstract: '웨이블릿 변환을 활용한 오디오 신호 분석 기법을 제안합니다. 기존 방법 대비 노이즈 환경에서 더 높은 정확도를 보입니다.',
    tags: ['Signal Processing', 'Wavelet', 'Audio'],
    links: {
      doi: 'https://doi.org/10.1109/TSP.2023.xxxxx'
    }
  },
  {
    id: 'quantum-ml',
    title: 'Quantum Machine Learning for Pattern Recognition',
    authors: ['Woochive', 'Alice Johnson'],
    venue: 'Quantum Information Processing',
    date: '2023-04-20',
    abstract: '양자 컴퓨팅을 활용한 패턴 인식 알고리즘을 제안합니다. 특정 문제에서 고전 알고리즘 대비 지수적 속도 향상을 달성했습니다.',
    tags: ['Quantum Computing', 'Machine Learning', 'Pattern Recognition'],
    links: {
      arxiv: 'https://arxiv.org/abs/2023.xxxxx'
    }
  }
);
