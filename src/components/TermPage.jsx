import CourseList from './CourseList';
import ScheduleModule from './ScheduleModal';
import Banner from './Banner';
import { useState } from 'react';

export default function TermPage({title, courses, selection, setSelection, selected, toggleSelected, conflicts, profile}) {
    const terms = ["Fall", "Winter", "Spring"];
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    
    const TermButton = ({term, selection, setSelection}) => (
        <div htmlFor={term} data-cy={term}>
            <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
                onChange={() => setSelection(term)} />
            <label className="btn btn-success mb-1 p-2" htmlFor={term}>
            { term }
            </label>
        </div>
    );
    
    const TermSelector = ({selection, setSelection}) => (
        <div className="btn-group">
        { 
            terms.map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
        }
        </div>
    );
  
    return (
      <div>
        <Banner title={title}/>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <TermSelector selection={selection} setSelection={setSelection} />
            <button className="btn btn-outline-dark" onClick={openModal}>View Schedule</button>    
        </div>
        <CourseList courses={courses} term={selection} selected={selected} toggleSelected={toggleSelected} conflicts={conflicts} profile={profile}/>
        <ScheduleModule courses={courses} selected={selected} open={open} close={closeModal} />
      </div>
    );

}