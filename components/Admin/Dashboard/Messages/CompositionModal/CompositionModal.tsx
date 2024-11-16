import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    content: any;
}

const CompositionModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, content }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center mt-8 p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="p-6 rounded-md w-full">
                {content}
            </div>
        </Modal>
    );
};

export default CompositionModal;
