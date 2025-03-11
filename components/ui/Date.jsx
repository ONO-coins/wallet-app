import classNames from "classnames"

import Calendar from "@icons/Calendar"

const Date = ({
  label,
  id,
  note,
  error = false,
  className,
  ...props }) => {
  return (
    <div className={classNames('field', 'date-field', className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className='field-body'>

        <Calendar className='iconCalendar' />

        <input className={classNames({

        })} id={id} type="text" {...props} />
      </div>
      {note && <span className="note">{note}</span>}
      {
        error && <span className="error">
          This field is required to be filled in
        </span>
      }
    </div>
  )
}

export { Date }