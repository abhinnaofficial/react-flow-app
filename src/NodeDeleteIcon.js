import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'; // Import the close circle icon from react-icons/ai

const NodeDeleteIcon = ({ onClick }) => {
    return (
        <div className="node-delete-icon" onClick={onClick}>
            <AiOutlineCloseCircle color="red" size={20} /> {/* Use the close circle icon with red color */}
        </div>
    );
};

export default NodeDeleteIcon;
