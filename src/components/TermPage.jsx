import CourseList from './CourseList';

export default function TermPage({courses, selection, setSelection, selected, toggleSelected}) {
    const terms = ["Fall", "Winter", "Spring"];
    
    const TermButton = ({term, selection, setSelection}) => (
        <div>
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
        <TermSelector selection={selection} setSelection={setSelection} />
        <CourseList courses={courses} term={selection} selected={selected} toggleSelected={toggleSelected}/>
      </div>
    );

}