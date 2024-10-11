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
  import { HiArrowRight } from 'react-icons/hi';
const OrderInstructionsModal = ({ isOpen, onClose, openChatModal }) => {
  const handleClick = () => {
    onClose();
    openChatModal();
  }
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"3xl"}>
        <ModalHeader>How to order physical products safely</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <p className='text-black font-semibold'>Here are some important tips for ordering phyiscal products on aoe market</p>
           <div className='px-8 text-gray-700'>
            

            <ul className=' list-disc'>
                <li>Always make payments on the AOE Market platform, <span className='text-red-700'>we will not be responsible for any loss of money paid to any vendor outside the platform</span></li>
                <li>Try to chat with the vendor before making payments</li>
                <li>You can request a refund if the vendor does not respond to your payment for 48h</li>
               
            </ul>
           </div>

           <div className='flex justify-end items-center mt-8'>
            <button className='text-white bg-secondary px-4 py-2 rounded-lg flex gap-2 hover:translate-y-1 transition-all duration-300' onClick={handleClick}>Continue <HiArrowRight color='white' size={20} className=""/></button>
           </div>
        </ModalBody>

        <ModalFooter>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default OrderInstructionsModal