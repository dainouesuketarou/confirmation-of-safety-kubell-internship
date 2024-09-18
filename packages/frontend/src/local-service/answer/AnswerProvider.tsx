import type { ReactElement } from 'react';
import { createContext, useState } from 'react';

// Answer の型定義
interface Answer {
  id: number;
  name: string;
  department: string;
  safe: boolean;
  canWork: boolean;
  needHelp: boolean;
}

// AnswerContextTypeの定義
interface AnswerContextType {
  safeOrDangerAnswer: Answer;
  setSafeOrDangerAnswer: (newAnswer: Answer) => void;
}

const safeOrDangerAnswer: Answer = {
  id: -1,
  name: 'pl01',
  department: '第一介護施設',
  safe: false,
  canWork: false,
  needHelp: false
}

// AnswerContextの作成とデフォルト値の設定
export const AnswerContext = createContext<AnswerContextType>({
  safeOrDangerAnswer: safeOrDangerAnswer,
  setSafeOrDangerAnswer: (x: Answer) => {
    safeOrDangerAnswer.safe = x.safe
    safeOrDangerAnswer.canWork = x.canWork
    safeOrDangerAnswer.needHelp = x.needHelp
  },
});

interface Props {
  children: ReactElement;
}

// AnswerProviderの定義
export const AnswerProvider = ({ children }: Props) => {
  const [safeOrDangerAnswer, setSafeOrDangerAnswer] = useState<Answer>({
    id: -1,
    name: 'pl01',
    department: '第一介護施設',
    safe: false,
    canWork: false,
    needHelp: false
  });

  return (
    <AnswerContext.Provider value={{ safeOrDangerAnswer, setSafeOrDangerAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
};
