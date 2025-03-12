import classNames from 'classnames';

export const Field = ({
    label,
    id,
    note,
    error = false,
    className,
    Icon,
    iconPosition = 'left',
    ...props
}) => {
    return (
        <div className={classNames('field', className)}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className="field-body">
                {Icon && <Icon className={classNames('icon', `icon-${iconPosition}`)} />}
                <input
                    className={classNames({
                        [`icon-${iconPosition}`]: Icon,
                    })}
                    id={id}
                    type="text"
                    {...props}
                />
            </div>
            {note && <span className="note">{note}</span>}
            {error && <span className="error">This field is required to be filled in</span>}
        </div>
    );
};
