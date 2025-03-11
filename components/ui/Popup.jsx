import classNames from 'classnames';

const Popup = ({ isOpen = false, close, hasClose = true, children }) => {
    function closePopup() {
        if (close) {
            close();
        }
    }

    return (
        <div
            className={classNames('popup', {
                active: isOpen,
            })}
        >
            <div className="backward" onClick={closePopup}></div>
            <div className="popup-body">
                {hasClose && (
                    <button className="popup-close" onClick={closePopup}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_649_12518"
                                style={{ maskType: 'alpha' }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                            >
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_649_12518)">
                                <path
                                    d="M6.40024 19L5.00024 17.6L10.6002 12L5.00024 6.4L6.40024 5L12.0002 10.6L17.6002 5L19.0002 6.4L13.4002 12L19.0002 17.6L17.6002 19L12.0002 13.4L6.40024 19Z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                    </button>
                )}
                <div className="popup-content">{children}</div>
            </div>
        </div>
    );
};

export { Popup };
