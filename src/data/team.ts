export type Member = {
  id: string;
  name: string;
  role?: string;
  stream: string;
  year: string;
  bio?: string;
};

export const team: Member[] = [
  { id: 'mithun', name: 'Mithun Aradya', role: 'Team Leader · All-rounder', stream: 'B.Com IB & FS', year: '1st year' },
  { id: 'nizamudeen', name: 'Mohamed Nizamudeen J', role: 'All-rounder', stream: 'B.Com IB & FS', year: '2nd year' },
  { id: 'kishor', name: 'Kishor R', role: 'Motivator · Team Manager', stream: 'B.Tech CSE', year: '1st year' },
  { id: 'pesalayel', name: 'Pesalayel D', role: 'Legal Adviser', stream: 'B.Tech ECE', year: '1st year' },
  { id: 'kanishka', name: 'Kanishka S', role: 'Researcher', stream: 'B.Tech ECE', year: '1st year' },
  { id: 'sakthi', name: 'Sakthi Ajitha S', role: 'Tester · Debugger', stream: 'BCA AI', year: '1st year' },
];
