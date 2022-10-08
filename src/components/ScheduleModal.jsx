import Schedule from './Schedule';
import './ScheduleModal.css';

const ScheduleModule = ({ courses, selected, open, close }) => (
  <div
    className={`modal ${open ? 'modal-show' : ''}`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">My Schedule</h5>
          <button type="button" className="btn-close" aria-label="Close"
            onClick={close}
          />
        </div>
        <div className="modal-body">
          <Schedule courses={courses} selected={selected} />
        </div>
      </div>
    </div>
  </div>
);

export default ScheduleModule;