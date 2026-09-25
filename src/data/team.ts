export type Member = {
  id: string;
  name: string;
  role?: string;
  stream: string;
  year: string;
  bio?: string;
};

export const team: Member[] = [
  { id: 'mithun', name: 'Mithun Aradya', role: 'Team Leader', stream: 'B.Com IB & FS', year: '1st year' },
  { id: 'nizamudeen', name: 'Mohamed Nizamudeen J', stream: 'B.Com IB & FS', year: '2nd year' },
  { id: 'kishor', name: 'Kishor R', stream: 'B.Tech CSE', year: '1st year' },
  { id: 'pesalayel', name: 'Pesalayel D', stream: 'B.Tech ECE', year: '1st year' },
  { id: 'kanishka', name: 'Kanishka S', stream: 'B.Tech ECE', year: '1st year' },
  { id: 'sakthi', name: 'Sakthi Ajitha S', stream: 'BCA AI', year: '1st year' },
];
