import { AnswerContext } from 'local-service/answer/AnswerProvider';
import React, { useContext, useEffect, useState } from 'react';

// const SafetyConfirmationService: React.FC = () => {
const SafetyConfirmationService: React.FC<{ setIsButtonClick: (value: boolean) => void }> = ({ setIsButtonClick }) => {
  // State management for user data and counts
  const { safeOrDangerAnswer }
    = useContext(AnswerContext);

  const [userData, setUserData] = useState([
    { id: 1, name: '高橋健太', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 2, name: '石井玲奈', department: '第二介護施設', safe: false, canWork: false, needHelp: false },
    { id: 3, name: '木村拓', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 4, name: '井上真央', department: '第二介護施設', safe: false, canWork: false, needHelp: false },
    { id: 5, name: '川崎大輔', department: '第一介護施設', safe: true, canWork: false, needHelp: false },
    { id: 6, name: '伊藤美咲', department: '第二介護施設', safe: true, canWork: true, needHelp: false },
    { id: 7, name: '鈴木健', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 8, name: '新垣結衣', department: '第三介護施設', safe: true, canWork: true, needHelp: true },
    { id: 9, name: '田中宏', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 10, name: '中村優', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 11, name: '渡辺直樹', department: '第三介護施設', safe: true, canWork: false, needHelp: true },
    { id: 12, name: '山本涼介', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 13, name: '清水舞', department: '第二介護施設', safe: false, canWork: false, needHelp: false },
    { id: 14, name: '松本潤', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 15, name: '小林和子', department: '第三介護施設', safe: true, canWork: false, needHelp: false },
    { id: 16, name: '森田光', department: '第一介護施設', safe: true, canWork: false, needHelp: false },
    { id: 17, name: '原田裕', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 18, name: '長谷川新', department: '第一介護施設', safe: true, canWork: false, needHelp: true },
    { id: 19, name: '青山太郎', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 20, name: '藤田恵', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 21, name: '斉藤真', department: '第三介護施設', safe: true, canWork: false, needHelp: false },
    { id: 22, name: '佐藤明美', department: '第二介護施設', safe: true, canWork: false, needHelp: true },
    { id: 23, name: '平野健', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 24, name: '加藤あや', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 25, name: '岡田翔', department: '第二介護施設', safe: false, canWork: false, needHelp: false },
    { id: 26, name: '佐藤太郎', department: '第一介護施設', safe: true, canWork: true, needHelp: false },
    { id: 27, name: '鈴木花子', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 28, name: '田中一郎', department: '第二介護施設', safe: true, canWork: false, needHelp: true },
    { id: 29, name: '山田次郎', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 30, name: '中村三郎', department: '第三介護施設', safe: true, canWork: true, needHelp: false },
    { id: 31, name: '高橋美咲', department: '第二介護施設', safe: true, canWork: false, needHelp: true },
    { id: 32, name: '渡辺春菜', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 33, name: '小林直樹', department: '第三介護施設', safe: true, canWork: false, needHelp: false },
    { id: 34, name: '加藤裕子', department: '第二介護施設', safe: true, canWork: true, needHelp: false },
    { id: 35, name: '伊藤健', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 36, name: '山口昇', department: '第三介護施設', safe: true, canWork: true, needHelp: false },
    { id: 37, name: '松本祐介', department: '第二介護施設', safe: false, canWork: false, needHelp: false },
    { id: 38, name: '杉田明美', department: '第一介護施設', safe: true, canWork: false, needHelp: false },
    { id: 39, name: '清水和夫', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 40, name: '斎藤佳子', department: '第二介護施設', safe: true, canWork: false, needHelp: false },
    { id: 41, name: '佐々木亮', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 42, name: '山本久美子', department: '第三介護施設', safe: true, canWork: true, needHelp: false },
    { id: 43, name: '藤田拓也', department: '第二介護施設', safe: false, canWork: false, needHelp: false },
    { id: 44, name: '西村里美', department: '第一介護施設', safe: true, canWork: true, needHelp: false },
    { id: 45, name: '青木正', department: '第三介護施設', safe: false, canWork: false, needHelp: false },
    { id: 46, name: '三浦純', department: '第二介護施設', safe: true, canWork: true, needHelp: false },
    { id: 47, name: '池田由美', department: '第一介護施設', safe: false, canWork: false, needHelp: false },
    { id: 48, name: '長谷川智子', department: '第三介護施設', safe: true, canWork: false, needHelp: false },
    { id: 49, name: '杉山勇', department: '第二介護施設', safe: false, canWork: false, needHelp: false },
    { id: 50, name: '岡本直美', department: '第一介護施設', safe: true, canWork: false, needHelp: false },
  ]);
  // 安否確認データが変更されたらuserDataに追加
  useEffect(() => {
    if (safeOrDangerAnswer && Object.keys(safeOrDangerAnswer).length > 0) {
      const newUser = {
        ...safeOrDangerAnswer,
      };
      
      setUserData(prevData => {
        
        if (prevData.find(user => user.id === newUser.id)){
          return prevData
        }
        
        return[...prevData, newUser]
      });
    }
  }, [safeOrDangerAnswer.needHelp]);
  
    const [safeCount, setSafeCount] = useState(0);
    const [actionRequiredCount, setActionRequiredCount] = useState(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [departmentStats, setDepartmentStats] = useState<{ [key: string]: { safe: number, actionRequired: number } }>({});
  
    useEffect(() => {
      const updateCounts = (data: typeof userData) => {
        const safe = data.filter(user => user.safe).length;
        const actionRequired = data.length - safe;
        setSafeCount(safe);
        setActionRequiredCount(actionRequired);
  
        const departmentCounts = data.reduce((acc, user) => {
          if (!acc[user.department]) {
            acc[user.department] = { safe: 0, actionRequired: 0 };
          }
          if (user.safe) {
            acc[user.department].safe += 1;
          } else {
            acc[user.department].actionRequired += 1;
          }
          return acc;
        }, {} as { [key: string]: { safe: number, actionRequired: number } });
  
        // 部署ごとにソートされた順序で保持
        const sortedDepartmentCounts = Object.keys(departmentCounts).sort().reduce((acc, key) => {
          acc[key] = departmentCounts[key];
          return acc;
        }, {} as { [key: string]: { safe: number, actionRequired: number } });
  
        setDepartmentStats(sortedDepartmentCounts);
      };
  
      updateCounts(userData);
    }, [userData]);
  
    const sortTable = (column: keyof typeof userData[0]) => {
      setUserData(prevData => {
        const sortedData = [...prevData].sort((a, b) => {
          let valA = a[column];
          let valB = b[column];
  
          if (typeof valA === 'boolean') {
            valA = valA ? 1 : 0;
            valB = valB ? 1 : 0;
          }
  
          if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
          if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        return sortedData;
      });
    };
  
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif', height: '100vh', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ flex: 1, padding: '40px', textAlign: 'center', backgroundColor: '#139360', color: 'white', marginRight: '10px', fontSize: '32px', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            無事
            <span id="safe-count" style={{ display: 'block', fontSize: '48px' }}>{safeCount}</span>
          </div>
          <div style={{ flex: 1, padding: '40px', textAlign: 'center', backgroundColor: '#cb4327', color: 'white', marginRight: '10px', fontSize: '32px', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            要対応
            <span id="action-required-count" style={{ display: 'block', fontSize: '48px' }}>{actionRequiredCount}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setIsButtonClick(false)} style={{ fontSize: '16px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#009688', color: 'white', border: 'none', cursor: 'pointer' }}>
              戻る
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {Object.keys(departmentStats).map(department => (
            <div
              key={department}
              style={{
                flex: 1,
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                color: 'black',
                marginRight: '10px',
                fontSize: '20px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                border: '3px solid gray',
              }}
            >
              <strong>{department}</strong>
              <div style={{ color: '#139360' }}>無事: {departmentStats[department].safe}</div>
              <div style={{ color: '#cb4327' }}>要対応: {departmentStats[department].actionRequired}</div>
            </div>
          ))}
        </div>
  
        <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <thead>
              <tr>
                <th colSpan={5} style={{ backgroundColor: '#d3d3d3', color: 'black', padding: '10px' }}>集計画面</th>
              </tr>
              <tr>
                <th style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#d3d3d3' }} onClick={() => sortTable('name')}>ユーザー名</th>
                <th style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#d3d3d3' }} onClick={() => sortTable('department')}>部署名</th>
                <th style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#d3d3d3' }} onClick={() => sortTable('safe')}>安否</th>
                <th style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#d3d3d3' }} onClick={() => sortTable('canWork')}>勤労可否</th>
                <th style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#d3d3d3' }} onClick={() => sortTable('needHelp')}>人手の必要性</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.department}</td>
                  <td style={{ padding: '10px', color: user.safe ? '#139360' : '#cb4327', fontWeight: 'bold' }}>{user.safe ? '無事' : '無事じゃない'}</td>
                  <td style={{ padding: '10px', color: user.canWork ? '#139360' : '#cb4327', fontWeight: 'bold' }}>{user.canWork ? '可能' : '不可能'}</td>
                  <td style={{ padding: '10px', color: user.needHelp ? '#cb4327' : '#139360', fontWeight: 'bold' }}>{user.needHelp ? '必要' : '不必要'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default SafetyConfirmationService;
  