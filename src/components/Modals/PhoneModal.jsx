import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
import CopyUrlButton from '../General/CopyUrlButton';

const PhoneModal = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent >
      <ModalHeader className={`text-tetiary`}>
        Phone Number
      </ModalHeader>
      <ModalCloseButton className="text-red-600" />
      <ModalBody>
        <div action="" >

            {/* <div>
                <h1 className='mb-2'><span className='font-semibold'>Bank:</span> Polaris Bank</h1>
                <h1 className='mb-2'><span className='font-semibold'>Name:</span> Bayeniass Books</h1>
            </div> */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="query"
              value={data}
              readOnly={true}
              className=" rounded px-4 py-2 w-full bg-gray-100"
            />
            <CopyUrlButton customDescription={"Copied Successfully"} url={data}/>
          </div>

         
          <p className="mt-4 text-xs text-gray-600"><span className="font-semibold">NOTE:</span> For your safety, always meet vendors in public places. Our platform is not liable for any issues arising from these transactions.</p>

         
        </div>
      </ModalBody>

      <ModalFooter></ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default PhoneModal