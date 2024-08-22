import './sidebar.css';

const SIDEBAR_OPTIONS = [
  {
    id: 'sidebar__dashboard',
    name: 'Dashboard',
  },
  {
    id: 'sidebar__calender',
    name: 'Calender',
  },
  {
    id: 'sidebar__profile',
    name: 'Profile',
  },
  {
    id: 'sidebar__settings',
    name: 'Settings',
  },
];

const Sidebar = () => {
  return (
    <div className='sidebar'>
      {SIDEBAR_OPTIONS.map((option) => {
        return <button key={option.id}>{option.name}</button>;
      })}
    </div>
  );
};

export default Sidebar;
