import Dialog from './Dialog';
import SignUpForm from './SignUpForm';

type Props = {
    open: boolean;
    onClose: () => void | undefined;
    emailFormOnClose?: boolean;
};

export default function SignUpDialog({ open, onClose, emailFormOnClose }: Props) {
    return (
        <Dialog open={open} onClose={onClose}>
            {emailFormOnClose ? <SignUpForm onClose={onClose} /> : <SignUpForm />}
        </Dialog>
    );
}
