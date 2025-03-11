import classNames from 'classnames';

const defaultProps = {
    label: '',
    variant: 'primary',
    className: '',
    icon: null,
    iconPosition: 'right',
    animation: '',
    bodyClassName: '',
};

export const Button = ({
    label = defaultProps.label,
    className = defaultProps.className,
    variant = defaultProps.variant,
    icon = defaultProps.icon,
    iconPosition = defaultProps.iconPosition,
    animation = defaultProps.animation,
    bodyClassName = defaultProps.bodyClassName,
    children,
    ...props
}) => {
    const button = (
        <button className={classNames('button', variant, animation, className)} {...props}>
            {icon && iconPosition === 'left' && <span className="icon">{icon}</span>}

            {children}

            {icon && iconPosition === 'right' && <span className="icon">{icon}</span>}
        </button>
    );

    if (label) {
        return (
            <div className={classNames('button-body', bodyClassName)}>
                <label>{label}</label>

                {button}
            </div>
        );
    }

    return button;
};
