import React, { useState } from 'react';
import Modal from 'react-modal';
import DBtable from './DBtable/DBtable';

const DBcard = ({ table }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };

    return (
      <div>
        <div
          className="bg-white flex justify-center items-center h-full cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
          onClick={openModal}
        >
          {table}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Table Modal"
          className="fixed inset-0 flex justify-center items-center"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur"
        >
          <div className="relative bg-white w-11/12 h-5/6 p-8 rounded-lg shadow-lg border-2 border-black overflow-y-scroll">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black bg-transparent border-none text-2xl font-semibold cursor-pointer"
            >
              &times;
            </button>
            {/* <h2 className="text-2xl mb-4">Table: {table}</h2>
            <p className="mb-4">
              This is a large modal. You can put more content here.
            </p> */}
            <div>
                <h2 className="text-2xl mb-4">Table: {table}</h2>
                <DBtable tableName={table} />
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  };

export default DBcard;
