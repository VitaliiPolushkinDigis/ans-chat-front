import { FC } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface ConversationCreateBtnProps {
  showModal: () => void;
}

const ConversationCreateBtn: FC<ConversationCreateBtnProps> = ({ showModal }) => {
  return (
    <div onClick={showModal} style={{ cursor: 'pointer' }}>
      <AddCircleOutlineIcon color="info" />
    </div>
  );
};

export default ConversationCreateBtn;
