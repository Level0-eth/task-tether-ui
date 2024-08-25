import Dropdown from '../ui/Dropdown/Dropdown';

import './sidebar.css';

const ListOptions = [
  { id: 'study', name: 'Study', selected: true },
  { id: 'work', name: 'Work', selected: false },
  { id: 'enjoy', name: 'Enjoy', selected: false },
];

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <p className='sm-heading'>Lists</p>
      <Dropdown values={ListOptions} />
    </div>
  );
};

export default Sidebar;
