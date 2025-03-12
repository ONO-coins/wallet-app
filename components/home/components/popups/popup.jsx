import ErrorPopup from './error-popup';
import SuccessPopup from './success-popup';
import { usePopup } from './popup-provider';

const Popup = () => {
    const { value, clearPopup } = usePopup();

    return value.type === 'error' ? (
        <ErrorPopup isOpen={value.text} value={value.text} close={clearPopup} />
    ) : (
        <SuccessPopup isOpen={value.text} value={value.text} close={clearPopup} />
    );
};

export default Popup;
