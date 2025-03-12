'use client';
import ArrowUpFilled from '@icons/ArrowUpFilled';
import classNames from 'classnames';
import { useState } from 'react';

const defaultProps = {
    className: '',
    value: '',
    label: '',
    options: [],
    onChange: () => {},
    placeholder: '',
};

const Dropdown = ({
    className = defaultProps.className,
    value = defaultProps.value,
    label = defaultProps.label,
    options = defaultProps.options,
    onChange = defaultProps.onChange,
    placeholder = defaultProps.placeholder,
    index = null,
    ...props
}) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={classNames('dropdown', className)} {...props}>
            {label && <label>{label}</label>}

            <div
                className={classNames('select', {
                    active: isActive,
                })}
            >
                <div
                    className="toggle"
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                >
                    {value || !placeholder ? (
                        <div className="value">{index ? `${index}. ${value}` : value}</div>
                    ) : placeholder ? (
                        <div className="placeholder">{placeholder}</div>
                    ) : (
                        ''
                    )}
                    <ArrowUpFilled className="icon" />
                </div>

                <ul className="list">
                    {options.map(({ label, value, id }) => {
                        return (
                            <li
                                onClick={() => {
                                    setIsActive(false);
                                    onChange(value);
                                }}
                                className="option"
                                key={value}
                            >
                                {label ? label : `${id + 1}. ${value}`}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export { Dropdown };
