import { TreeMenuItem } from '@/types/Layout';

export const SideBarMenuData: TreeMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', link: '/' },
  {
    id: 'attendanceMarking',
    label: 'Attendance Marking',
    icon: 'attendanceMarking',
    children: [
      { id: 'classMarking', label: 'Class Marking', link: '/classmarking' },
      { id: 'detailedClassMarking', label: 'Detailed Class Marking', link: '/classmarking-detail' },
    ],
  },
  {
    id: 'messageBoxSMS',
    label: 'Message Box (SMS)',
    icon: 'messageBoxSMS',
    children: [
      { id: 'messageBoxSMSSub1', label: 'Option1' },
      { id: 'messageBoxSMSSub2', label: 'Option2' },
    ],
  },
];
