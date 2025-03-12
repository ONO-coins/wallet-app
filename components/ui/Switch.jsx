const Switch = ({ id,
  onChange,
  value
}) => {
  return <label className="switch" htmlFor={id}>
    <input value={value} onChange={onChange} type="checkbox" id={id} />
    <div className="slider round">

    </div>
  </label>
}

export { Switch }